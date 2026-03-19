import { init, backButton, hapticFeedback, themeParams, viewport } from '@tma.js/sdk-vue'

class TelegramService {
  constructor() {
    this.tg = null
    this.user = null
  }

  async initialize() {
    try {
      // Инициализация SDK
      this.tg = init()

      // Получаем данные пользователя
      const initData = this.tg.initDataUnsafe
      this.user = initData?.user || {
        id: 12345, // Fallback для теста в браузере
        first_name: 'Test User',
      }

      // Настраиваем viewport (полный экран)
      await toggleFullscreen()

      // Применяем тему Telegram
      this.applyTheme()

      console.log('Telegram SDK initialized:', this.user)
    } catch (error) {
      console.warn('Telegram SDK not available, running in browser mode')
    }
  }

  async toggleFullscreen() {
    if (viewport.mount.isAvailable()) {
      await viewport.mount();
    }

    if (viewport.requestFullscreen.isAvailable()) {
      try {
        await viewport.requestFullscreen();
        console.log("App is now in true fullscreen!");
      } catch (err) {
        console.error("Fullscreen request failed", err);
      }
    } else {
      viewport.expand();
    }
  }

  applyTheme() {
    const theme = themeParams.get()
    document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bgColor || '#1a1a2e')
    document.documentElement.style.setProperty(
      '--tg-theme-text-color',
      theme.textColor || '#ffffff',
    )
  }

  // Вибрация при событиях
  vibrate(type = 'light') {
    try {
      hapticFeedback.impactOccurred(type) // 'light', 'medium', 'heavy'
    } catch (error) {
      // Fallback для браузера
      if (navigator.vibrate) {
        navigator.vibrate(type === 'heavy' ? 50 : 20)
      }
    }
  }

  // Показать кнопку "Назад"
  showBackButton(onClick) {
    backButton.show()
    backButton.onClick(onClick)
  }

  getUser() {
    return this.user
  }
}

export default new TelegramService()
