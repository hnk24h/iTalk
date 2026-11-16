const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  getRecordingsDir: () => ipcRenderer.invoke('get-recordings-dir'),
  selectRecordingFolder: () => ipcRenderer.invoke('select-recording-folder'),
  selectAudioFile: () => ipcRenderer.invoke('select-audio-file'),
  selectTextFile: () => ipcRenderer.invoke('select-text-file'),
  saveRecording: (data) => ipcRenderer.invoke('save-recording', data),
  openRecordingFolder: (customPath) => ipcRenderer.invoke('open-recording-folder', customPath),
  listLocalRecordings: () => ipcRenderer.invoke('list-local-recordings'),
  synthesizeEdgeSpeech: (params) => ipcRenderer.invoke('synthesize-edge-speech', params),
  synthesizeVoiceStudioSpeech: (params) => ipcRenderer.invoke('synthesize-voicestudio-speech', params),
  synthesizeOpenAISpeech: (params) => ipcRenderer.invoke('synthesize-openai-speech', params),
  checkVoiceStudioStatus: (endpoint) => ipcRenderer.invoke('check-voicestudio-status', endpoint),
  setTheme: (theme) => ipcRenderer.invoke('set-theme', theme),
})
