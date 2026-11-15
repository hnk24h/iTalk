import { spawn, spawnSync } from 'node:child_process'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const isWin = process.platform === 'win32'

const electronBin = isWin
  ? path.join(rootDir, 'node_modules', '.bin', 'electron.cmd')
  : path.join(rootDir, 'node_modules', '.bin', 'electron')

const viteBin = isWin
  ? path.join(rootDir, 'node_modules', '.bin', 'vite.cmd')
  : path.join(rootDir, 'node_modules', '.bin', 'vite')

// 1. Check if Electron binary has required shared libraries on Linux
function checkElectronViability() {
  if (isWin) {
    // Windows supports Electron natively
    return { canRun: true }
  }

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

async function waitForServer(url, timeoutMs = 25000) {
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
  console.log('\x1b[36m%s\x1b[0m', `⚡ Đang khởi động iTalk trên nền tảng [${process.platform}]...`)

  // Check Electron compatibility on this system
  const viability = checkElectronViability()

  if (!viability.canRun) {
    console.log('\n\x1b[33m%s\x1b[0m', '⚠️  THÔNG BÁO MÔI TRƯỜNG LINUX / WSL:')
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Không thể mở cửa sổ Electron Desktop bên trong Linux do thiếu thư viện đồ họa GUI:`
    )
    console.log('\x1b[90m%s\x1b[0m', `Chi tiết: ${viability.error}\n`)
    console.log('\x1b[32m%s\x1b[0m', '👉 GIẢI PHÁP 1 (Chạy ngay trên trình duyệt Windows/Linux):')
    console.log('   Khởi chạy trực tiếp bản Web mượt mà bằng lệnh:')
    console.log('\x1b[36m%s\x1b[0m', '   npm run dev\n')
    console.log('\x1b[32m%s\x1b[0m', '👉 GIẢI PHÁP 2 (Mở cửa sổ Electron trực tiếp trên Windows):')
    console.log('   Mở PowerShell trên Windows và truy cập đường dẫn mạng WSL:')
    console.log('\x1b[36m%s\x1b[0m', '   cd \\\\wsl.localhost\\Ubuntu\\home\\hoank\\workspace\\iTalk')
    console.log('\x1b[36m%s\x1b[0m', '   npm run electron:dev\n')
    console.log('\x1b[35m%s\x1b[0m', '🔄 Tự động chuyển hướng sang chế độ Web App (Vite Dev Server)...\n')

    // Start Vite dev server directly
    const viteProcess = spawn(viteBin, ['--host'], {
      cwd: rootDir,
      stdio: 'inherit',
      shell: isWin,
    })

    viteProcess.on('close', (code) => {
      process.exit(code || 0)
    })
    return
  }

  // If Electron is supported, run both Vite and Electron smoothly
  console.log('\x1b[32m%s\x1b[0m', '✓ Electron sẵn sàng. Đang khởi chạy Vite dev server...')

  const vite = spawn(viteBin, [], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: isWin,
  })

  const ready = await waitForServer('http://127.0.0.1:5173')
  if (!ready) {
    console.error('Không thể kết nối đến Vite dev server sau 25 giây.')
    vite.kill()
    process.exit(1)
  }

  console.log('\x1b[32m%s\x1b[0m', '✓ Vite đã sẵn sàng. Đang mở cửa sổ Electron Desktop...')

  const electronProcess = spawn(
    electronBin,
    ['electron/main.cjs', isWin ? '' : '--no-sandbox'].filter(Boolean),
    {
      cwd: rootDir,
      stdio: 'inherit',
      shell: isWin,
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
