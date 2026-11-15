const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')

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
    title: 'Chọn file nghe gốc (MP3, WAV, M4A, OGG, WebM)',
    properties: ['openFile'],
    filters: [
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'webm', 'flac'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0]
    const fileName = path.basename(filePath)
    const fileBuffer = await fs.promises.readFile(filePath)
    const ext = path.extname(filePath).slice(1).toLowerCase()
    const mimeMap = {
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      m4a: 'audio/mp4',
      aac: 'audio/aac',
      ogg: 'audio/ogg',
      webm: 'audio/webm',
      flac: 'audio/flac'
    }
    const mime = mimeMap[ext] || 'audio/mpeg'
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
