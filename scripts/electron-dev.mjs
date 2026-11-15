import { spawn, spawnSync } from 'node:child_process'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// 1. Check if Electron binary has required shared libraries on Linux
function checkElectronViability() {
  const electronBin = path.join(rootDir, 'node_modules', '.bin', 'electron')
  const testRun = spawnSync(electronBin, ['-v'], { encoding: 'utf-8' })

  if (testRun.status !== 0) {
    const errorMsg = testRun.stderr || testRun.stdout || ''
    return {
      canRun: false,
      error: errorMsg.trim(),
    }
  }
  return { canRun: true }
}

async function waitForServer(url, timeoutMs = 20000) {
  const startTime = Date.now()
  while (Date.now() - startTime < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          resolve(true)
        })
        req.on('error', reject)
        req.setTimeout(1000, () => {
          req.destroy()
          reject(new Error('timeout'))
        })
      })
      return true
    } catch {
      await new Promise((r) => setTimeout(r, 400))
    }
  }
  return false
}

async function main() {
  console.log('\x1b[36m%s\x1b[0m', '⚡ Đang khởi động iTalk...')

  // Check Electron compatibility on this system
  const viability = checkElectronViability()

  if (!viability.canRun) {
    console.log('\n\x1b[33m%s\x1b[0m', '⚠️  THÔNG BÁO MÔI TRƯỜNG LINUX / WSL:')
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Không thể mở cửa sổ Electron Desktop do hệ thống Linux thiếu thư viện đồ họa GUI:`
    )
    console.log('\x1b[90m%s\x1b[0m', `Chi tiết: ${viability.error}\n`)
    console.log('\x1b[32m%s\x1b[0m', '👉 GIẢI PHÁP 1 (Chạy ngay không cần cài đặt):')
    console.log('   Khởi chạy trực tiếp bản Web mượt mà bằng lệnh:')
    console.log('\x1b[36m%s\x1b[0m', '   npm run dev\n')
    console.log('\x1b[32m%s\x1b[0m', '👉 GIẢI PHÁP 2 (Cài thư viện đồ họa cho Linux để chạy cửa sổ Desktop Electron):')
    console.log('   Nếu có quyền sudo trên máy, hãy chạy lệnh sau để cài thư viện Chromium:')
    console.log(
      '\x1b[36m%s\x1b[0m',
      '   sudo apt-get update && sudo apt-get install -y libnss3 libnspr4 libasound2t64 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2\n'
    )
    console.log('\x1b[35m%s\x1b[0m', '🔄 Tự động chuyển hướng sang chế độ Web App (Vite Dev Server)...\n')

    // Start Vite dev server directly
    const viteBin = path.join(rootDir, 'node_modules', '.bin', 'vite')
    const viteProcess = spawn(viteBin, ['--host'], {
      cwd: rootDir,
      stdio: 'inherit',
    })

    viteProcess.on('close', (code) => {
      process.exit(code || 0)
    })
    return
  }

  // If Electron is supported, run both Vite and Electron smoothly
  console.log('\x1b[32m%s\x1b[0m', '✓ Electron sẵn sàng. Đang khởi chạy Vite dev server...')

  const viteBin = path.join(rootDir, 'node_modules', '.bin', 'vite')
  const vite = spawn(viteBin, [], {
    cwd: rootDir,
    stdio: 'inherit',
  })

  const ready = await waitForServer('http://127.0.0.1:5173')
  if (!ready) {
    console.error('Không thể kết nối đến Vite dev server sau 20 giây.')
    vite.kill()
    process.exit(1)
  }

  console.log('\x1b[32m%s\x1b[0m', '✓ Vite đã sẵn sàng. Đang mở cửa sổ Electron Desktop...')

  const electronBin = path.join(rootDir, 'node_modules', '.bin', 'electron')
  const electronProcess = spawn(
    electronBin,
    ['electron/main.cjs', '--no-sandbox'],
    {
      cwd: rootDir,
      stdio: 'inherit',
    }
  )

  electronProcess.on('close', (code) => {
    vite.kill()
    process.exit(code || 0)
  })

  process.on('SIGINT', () => {
    electronProcess.kill()
    vite.kill()
    process.exit(0)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
