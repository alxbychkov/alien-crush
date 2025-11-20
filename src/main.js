import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import telegramService from './services/telegram'
import router from './router'

// Инициализируем Telegram перед созданием приложения
telegramService.initialize()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
