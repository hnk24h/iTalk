const crypto = require('crypto')

function escapeXml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * High-quality Microsoft Natural Neural TTS via Edge ReadAloud WebSocket
 * Crystal-clear pronunciation, zero external pip/python dependencies, 100% free
 */
function synthesizeEdgeTTS({ text, voice = 'ja-JP-NanamiNeural', rate = 1.0, pitch = 0 }) {
  return new Promise((resolve, reject) => {
    try {
      const connectionId = crypto.randomUUID().replace(/-/g, '')
      const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EA654081830022870D0733F1&ConnectionId=${connectionId}`

      const ws = new WebSocket(url, {
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
          Origin: 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
        },
      })

      const audioChunks = []
      const requestId = crypto.randomUUID().replace(/-/g, '')

      const ratePercent = Math.round((rate - 1.0) * 100)
      const rateStr = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`
      const pitchStr = pitch >= 0 ? `+${pitch}Hz` : `${pitch}Hz`
      const lang = voice.split('-').slice(0, 2).join('-') || 'ja-JP'

      const timeout = setTimeout(() => {
        try {
          ws.close()
        } catch {}
        if (audioChunks.length > 0) {
          const combined = Buffer.concat(audioChunks)
          resolve({ success: true, audioDataUrl: `data:audio/mp3;base64,${combined.toString('base64')}` })
        } else {
          reject(new Error('Edge TTS request timed out'))
        }
      }, 15000)

      ws.onopen = () => {
        const configMsg =
          `Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n` +
          JSON.stringify({
            context: {
              synthesis: {
                audio: {
                  metadataoptions: { sentenceBoundaryEnabled: 'false', wordBoundaryEnabled: 'false' },
                  outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
                },
              },
            },
          })
        ws.send(configMsg)

        const timestamp = new Date().toISOString()
        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'><voice name='${voice}'><prosody pitch='${pitchStr}' rate='${rateStr}' volume='+0%'>${escapeXml(
          text
        )}</prosody></voice></speak>`
        const ssmlMsg = `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${timestamp}\r\nPath:ssml\r\n\r\n${ssml}`
        ws.send(ssmlMsg)
      }

      ws.onmessage = async (event) => {
        if (typeof event.data === 'string') {
          if (event.data.includes('Path:turn.end')) {
            clearTimeout(timeout)
            try {
              ws.close()
            } catch {}
            const combined = Buffer.concat(audioChunks)
            resolve({ success: true, audioDataUrl: `data:audio/mp3;base64,${combined.toString('base64')}` })
          }
        } else {
          let buf
          if (event.data instanceof ArrayBuffer) {
            buf = Buffer.from(event.data)
          } else if (event.data && typeof event.data.arrayBuffer === 'function') {
            buf = Buffer.from(await event.data.arrayBuffer())
          } else {
            buf = Buffer.from(event.data)
          }

          if (buf.length >= 2) {
            const headerLen = buf.readUInt16BE(0)
            const header = buf.subarray(2, 2 + headerLen).toString('utf-8')
            if (header.includes('Path:audio')) {
              const audioData = buf.subarray(2 + headerLen)
              if (audioData.length > 0) {
                audioChunks.push(audioData)
              }
            }
          }
        }
      }

      ws.onerror = (err) => {
        clearTimeout(timeout)
        if (audioChunks.length > 0) {
          const combined = Buffer.concat(audioChunks)
          resolve({ success: true, audioDataUrl: `data:audio/mp3;base64,${combined.toString('base64')}` })
        } else {
          reject(err || new Error('WebSocket connection error'))
        }
      }

      ws.onclose = () => {
        clearTimeout(timeout)
        if (audioChunks.length > 0) {
          const combined = Buffer.concat(audioChunks)
          resolve({ success: true, audioDataUrl: `data:audio/mp3;base64,${combined.toString('base64')}` })
        }
      }
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Local AI VoiceStudio Engine (CosyVoice / IndexTTS / Supertonic)
 * Connects via VoiceStudio's OpenAI-compatible router (default port 3900)
 */
async function synthesizeVoiceStudioTTS({
  endpoint = 'http://127.0.0.1:3900',
  text,
  voice = 'ja_female',
  model = 'cosyvoice',
  speed = 1.0,
}) {
  const cleanEndpoint = endpoint.replace(/\/+$/, '')
  const url = `${cleanEndpoint}/v1/audio/speech`

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'cosyvoice',
        input: text,
        voice: voice || 'ja_female',
        response_format: 'mp3',
        speed: speed,
      }),
      signal: controller.signal,
    })

    clearTimeout(timer)

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      throw new Error(`VoiceStudio API error (${response.status}): ${errorText || response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return {
      success: true,
      audioDataUrl: `data:audio/mp3;base64,${buffer.toString('base64')}`,
    }
  } catch (err) {
    clearTimeout(timer)
    throw err
  }
}

/**
 * Ping VoiceStudio health status
 */
async function checkVoiceStudioStatus(endpoint = 'http://127.0.0.1:3900') {
  try {
    const cleanEndpoint = endpoint.replace(/\/+$/, '')
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 3000)

    const res = await fetch(`${cleanEndpoint}/health`, { signal: controller.signal })
      .catch(async () => {
        return await fetch(`${cleanEndpoint}/v1/models`, { signal: controller.signal }).catch(() => null)
      })

    clearTimeout(timer)

    if (res && (res.status === 200 || res.status === 404)) {
      return { online: true, endpoint: cleanEndpoint }
    }
    return { online: false, endpoint: cleanEndpoint }
  } catch (err) {
    return { online: false, endpoint, error: err.message }
  }
}

/**
 * Generic OpenAI TTS API (Cloud or custom server)
 */
async function synthesizeOpenAITTS({
  endpoint = 'https://api.openai.com/v1',
  apiKey,
  text,
  voice = 'alloy',
  model = 'tts-1',
  speed = 1.0,
}) {
  const cleanEndpoint = endpoint.replace(/\/+$/, '')
  const url = `${cleanEndpoint}/audio/speech`

  const headers = {
    'Content-Type': 'application/json',
  }
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: model || 'tts-1',
        input: text,
        voice: voice || 'nova',
        response_format: 'mp3',
        speed: speed,
      }),
      signal: controller.signal,
    })

    clearTimeout(timer)

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      throw new Error(`OpenAI API error (${response.status}): ${errorText || response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return {
      success: true,
      audioDataUrl: `data:audio/mp3;base64,${buffer.toString('base64')}`,
    }
  } catch (err) {
    clearTimeout(timer)
    throw err
  }
}

module.exports = {
  synthesizeEdgeTTS,
  synthesizeVoiceStudioTTS,
  checkVoiceStudioStatus,
  synthesizeOpenAITTS,
}
