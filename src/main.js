import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import telegramService from './services/telegram'

// Инициализируем Telegram перед созданием приложения
telegramService.initialize()

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
