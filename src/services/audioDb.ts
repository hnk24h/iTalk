// IndexedDB persistence for original audio files & recorded media (MP3, WAV, WebM, MP4)

const DB_NAME = 'italk_audio_db'
const DB_VERSION = 2
const STORE_NAME = 'audio_files'
const RECORDINGS_STORE = 'recordings_blobs'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB không được hỗ trợ'))
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(RECORDINGS_STORE)) {
        db.createObjectStore(RECORDINGS_STORE, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function storeAudioBlob(id: string, blob: Blob, fileName: string): Promise<string> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)

    const record = {
      id,
      blob,
      fileName,
      mimeType: blob.type,
      updatedAt: Date.now(),
    }

    const req = store.put(record)
    req.onsuccess = () => resolve(id)
    req.onerror = () => reject(req.error)
  })
}

export async function getAudioBlob(id: string): Promise<{ blob: Blob; fileName: string } | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const req = store.get(id)

    req.onsuccess = () => {
      const res = req.result
      if (res && res.blob) {
        resolve({ blob: res.blob, fileName: res.fileName })
      } else {
        resolve(null)
      }
    }
    req.onerror = () => reject(req.error)
  })
}

export async function deleteAudioBlob(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const req = store.delete(id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

/* ==========================================================================
   RECORDINGS BLOB PERSISTENCE (Audio & Video Practice Recordings)
   ========================================================================== */

export async function storeRecordingBlob(id: string, blob: Blob): Promise<string> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(RECORDINGS_STORE, 'readwrite')
      const store = tx.objectStore(RECORDINGS_STORE)

      const record = {
        id,
        blob,
        mimeType: blob.type,
        updatedAt: Date.now(),
      }

      const req = store.put(record)
      req.onsuccess = () => resolve(id)
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn('Failed to store recording blob in IndexedDB:', err)
    return id
  }
}

export async function getRecordingBlob(id: string): Promise<Blob | null> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(RECORDINGS_STORE, 'readonly')
      const store = tx.objectStore(RECORDINGS_STORE)
      const req = store.get(id)

      req.onsuccess = () => {
        const res = req.result
        if (res && res.blob) {
          resolve(res.blob)
        } else {
          resolve(null)
        }
      }
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn('Failed to read recording blob from IndexedDB:', err)
    return null
  }
}

export async function deleteRecordingBlob(id: string): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(RECORDINGS_STORE, 'readwrite')
      const store = tx.objectStore(RECORDINGS_STORE)
      const req = store.delete(id)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch {}
}
