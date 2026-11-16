export type AppTheme = 'dark' | 'light' | 'system'

const THEME_STORAGE_KEY = 'italk_theme_mode'

export function getStoredTheme(): AppTheme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme
    if (saved && (saved === 'dark' || saved === 'light' || saved === 'system')) {
      return saved
    }
  } catch {}
  return 'dark'
}

export function getResolvedTheme(theme: AppTheme): 'dark' | 'light' {
  if (theme === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  }
  return theme
}

export function applyTheme(theme: AppTheme): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {}

  const resolved = getResolvedTheme(theme)
  const root = document.documentElement

  if (resolved === 'light') {
    root.classList.remove('dark')
    root.classList.add('light')
  } else {
    root.classList.remove('light')
    root.classList.add('dark')
  }

  // Update meta theme-color for mobile/browser tab bar
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', resolved === 'light' ? '#f8fafc' : '#020617')
  }

  // Notify Electron native titlebar/theme if available
  if (window.electronAPI && (window.electronAPI as any).setTheme) {
    try {
      (window.electronAPI as any).setTheme(theme)
    } catch {}
  }
}

export function initTheme(): void {
  const current = getStoredTheme()
  applyTheme(current)

  // Listen for system theme change when user chooses 'system'
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = () => {
      const stored = getStoredTheme()
      if (stored === 'system') {
        applyTheme('system')
      }
    }
    try {
      mediaQuery.addEventListener('change', handleChange)
    } catch {
      mediaQuery.addListener(handleChange)
    }
  }
}
