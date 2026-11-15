const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  getRecordingsDir: () => ipcRenderer.invoke('get-recordings-dir'),
  selectRecordingFolder: () => ipcRenderer.invoke('select-recording-folder'),
  saveRecording: (data) => ipcRenderer.invoke('save-recording', data),
  openRecordingFolder: (customPath) => ipcRenderer.invoke('open-recording-folder', customPath),
  listLocalRecordings: () => ipcRenderer.invoke('list-local-recordings'),
})
