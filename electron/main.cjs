const { app, BrowserWindow, ipcMain, dialog, shell, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')
const {
  synthesizeEdgeTTS,
  synthesizeVoiceStudioTTS,
  checkVoiceStudioStatus,
  synthesizeOpenAITTS,
} = require('./ttsEngine.cjs')

// Default recording directory: ~/iTalk-Recordings
let recordingsDir = path.join(os.homedir(), 'iTalk-Recordings')
if (!fs.existsSync(recordingsDir)) {
  try {
    fs.mkdirSync(recordingsDir, { recursive: true })
  } catch (err) {
    console.error('Failed to create default recordings directory:', err)
  }
}

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1024,
    minHeight: 700,
    title: 'iTalk - Luyện Nghe Nói & Shadowing Ngoại Ngữ',
    backgroundColor: '#020617', // slate-950
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Open external links in user's default browser instead of electron window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// IPC Handlers
ipcMain.handle('is-electron', () => true)

ipcMain.handle('set-theme', (event, theme) => {
  if (theme === 'system') {
    nativeTheme.themeSource = 'system'
  } else if (theme === 'light') {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('get-recordings-dir', () => {
  return recordingsDir
})

ipcMain.handle('select-recording-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Chọn thư mục lưu trữ video & âm thanh luyện tập',
    defaultPath: recordingsDir,
    properties: ['openDirectory', 'createDirectory'],
  })
  if (!result.canceled && result.filePaths.length > 0) {
    recordingsDir = result.filePaths[0]
    return recordingsDir
  }
  return null
})

ipcMain.handle('select-audio-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Chọn file video hoặc file nghe gốc (MP4, WebM, MP3, WAV, M4A, MKV)',
    properties: ['openFile'],
    filters: [
      { name: 'Media Files (Video & Audio)', extensions: ['mp4', 'webm', 'mkv', 'mov', 'mp3', 'wav', 'm4a', 'aac', 'ogg', 'flac'] },
      { name: 'Video Files', extensions: ['mp4', 'webm', 'mkv', 'mov'] },
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'flac'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0]
    const fileName = path.basename(filePath)
    const fileBuffer = await fs.promises.readFile(filePath)
    const ext = path.extname(filePath).slice(1).toLowerCase()
    const mimeMap = {
      mp4: 'video/mp4',
      webm: 'video/webm',
      mkv: 'video/x-matroska',
      mov: 'video/quicktime',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      m4a: 'audio/mp4',
      aac: 'audio/aac',
      ogg: 'audio/ogg',
      flac: 'audio/flac'
    }
    const mime = mimeMap[ext] || (['mp4', 'webm', 'mkv', 'mov'].includes(ext) ? 'video/mp4' : 'audio/mpeg')
    const base64 = fileBuffer.toString('base64')
    const dataUrl = `data:${mime};base64,${base64}`

    return {
      filePath,
      fileName,
      dataUrl,
      size: fileBuffer.length
    }
  }
  return null
})

ipcMain.handle('select-text-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Chọn file phụ đề / bài đọc (.lrc, .srt, .txt, .json)',
    properties: ['openFile'],
    filters: [
      { name: 'Subtitles & Text', extensions: ['lrc', 'srt', 'txt', 'json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0]
    const content = await fs.promises.readFile(filePath, 'utf-8')
    return {
      filePath,
      fileName: path.basename(filePath),
      content
    }
  }
  return null
})

ipcMain.handle('save-recording', async (event, { fileName, buffer, mimeType }) => {
  try {
    if (!fs.existsSync(recordingsDir)) {
      fs.mkdirSync(recordingsDir, { recursive: true })
    }

    const cleanFileName = fileName.replace(/[^a-zA-Z0-9_\-\.]/g, '_')
    const filePath = path.join(recordingsDir, cleanFileName)

    const fileBuffer = Buffer.from(buffer)
    await fs.promises.writeFile(filePath, fileBuffer)

    return {
      success: true,
      filePath,
      fileName: cleanFileName,
      size: fileBuffer.length,
      recordingsDir,
    }
  } catch (err) {
    console.error('Error saving recording:', err)
    return {
      success: false,
      error: err.message || 'Lỗi khi lưu tệp',
    }
  }
})

ipcMain.handle('open-recording-folder', async (event, customPath) => {
  const targetPath = customPath || recordingsDir
  try {
    await shell.openPath(targetPath)
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('open-recording-file', async (event, filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      return { success: false, error: 'Tệp không tồn tại trên máy' }
    }
    await shell.openPath(filePath)
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('read-recording-file', async (event, filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      return { success: false, error: 'Tệp không tồn tại trên máy' }
    }
    const fileBuffer = await fs.promises.readFile(filePath)
    const ext = path.extname(filePath).slice(1).toLowerCase()
    const mimeMap = {
      webm: 'video/webm',
      mp4: 'video/mp4',
      wav: 'audio/wav',
      mp3: 'audio/mpeg',
      ogg: 'audio/ogg',
    }
    const mime = mimeMap[ext] || (ext === 'wav' ? 'audio/wav' : 'video/webm')
    const base64 = fileBuffer.toString('base64')
    const dataUrl = `data:${mime};base64,${base64}`
    return { success: true, dataUrl, mime }
  } catch (err) {
    console.error('Failed to read recording file:', err)
    return { success: false, error: err.message }
  }
})

ipcMain.handle('list-local-recordings', async () => {
  try {
    if (!fs.existsSync(recordingsDir)) return []
    const files = await fs.promises.readdir(recordingsDir, { withFileTypes: true })
    const recordings = []

    for (const f of files) {
      if (f.isFile() && (f.name.endsWith('.webm') || f.name.endsWith('.mp4') || f.name.endsWith('.wav'))) {
        const fullPath = path.join(recordingsDir, f.name)
        const stats = await fs.promises.stat(fullPath)
        recordings.push({
          name: f.name,
          path: fullPath,
          size: stats.size,
          createdAt: stats.mtime.toISOString(),
          type: f.name.endsWith('.wav') ? 'audio' : 'video',
        })
      }
    }

    // Sort newest first
    recordings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return recordings
  } catch (err) {
    console.error('Failed to list recordings:', err)
    return []
  }
})

// High-Quality Multi-Engine TTS IPC Handlers
ipcMain.handle('synthesize-edge-speech', async (event, params) => {
  try {
    return await synthesizeEdgeTTS(params)
  } catch (err) {
    console.error('Edge TTS error:', err)
    return { success: false, error: err.message || 'Edge TTS failed' }
  }
})

ipcMain.handle('synthesize-voicestudio-speech', async (event, params) => {
  try {
    return await synthesizeVoiceStudioTTS(params)
  } catch (err) {
    console.error('VoiceStudio TTS error:', err)
    return { success: false, error: err.message || 'VoiceStudio TTS failed' }
  }
})

ipcMain.handle('synthesize-openai-speech', async (event, params) => {
  try {
    return await synthesizeOpenAITTS(params)
  } catch (err) {
    console.error('OpenAI TTS error:', err)
    return { success: false, error: err.message || 'OpenAI TTS failed' }
  }
})

ipcMain.handle('check-voicestudio-status', async (event, endpoint) => {
  return await checkVoiceStudioStatus(endpoint)
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
