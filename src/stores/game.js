import { defineStore } from 'pinia'
import mockBackend from '@/services/mockBackend'
import telegramService from '@/services/telegram'

export const useGameStore = defineStore('game', {
  state: () => ({
    // Баланс пользователя (виртуальный)
    balance: 1000.0, // Стартовый баланс в NUCL

    // Текущая ставка
    betAmount: 0.15,

    // Авто-кэшаут
    autoCashoutEnabled: true,
    autoCashoutValue: 2.0,

    // Состояние игры
    gameState: 'idle', // 'idle', 'betting', 'flying', 'crashed'
    currentMultiplier: 1.0,
    crashPoint: null,

    // История
    history: [],

    // Статистика (для верхних бейджей)
    stats: [],
  }),

  getters: {
    canPlaceBet: (state) => {
      return state.gameState === 'idle' && state.balance >= state.betAmount
    },

    potentialWin: (state) => {
      return state.betAmount * state.currentMultiplier
    },

    getStats: (state) => {
      return state.stats.length > 1 ? state.stats.slice(0, -1) : []
    },
  },

  actions: {
    // Установка ставки
    setBetAmount(amount) {
      this.betAmount = Math.max(0.01, Math.min(amount, this.balance))
    },

    // Быстрые ставки
    quickBet(multiplier) {
      this.setBetAmount(this.betAmount * multiplier)
    },

    // Переключение авто-кэшаута
    toggleAutoCashout() {
      this.autoCashoutEnabled = !this.autoCashoutEnabled
      telegramService.vibrate('light')
    },

    setAutoCashoutValue(value) {
      this.autoCashoutValue = Math.max(1.01, Math.min(value, 100))
    },

    // Старт раунда
    async startRound() {
      if (!this.canPlaceBet) return

      telegramService.vibrate('medium')

      // Снимаем ставку с баланса
      this.balance -= this.betAmount

      // Стартуем раунд
      this.gameState = 'betting'
      const round = await mockBackend.startRound(this.betAmount, this.autoCashoutValue)

      this.crashPoint = round.crashPoint
      this.gameState = 'flying'
      this.currentMultiplier = 1.0

      // Запускаем анимацию множителя
      this.animateMultiplier()

      this.updateStats(this.crashPoint)
    },

    // Анимация роста множителя
    animateMultiplier() {
      const startTime = Date.now()
      const duration = this.crashPoint * 1000 // 1 секунда на 1x

      const animate = () => {
        if (this.gameState !== 'flying') return

        const elapsed = Date.now() - startTime
        const progress = elapsed / duration

        this.currentMultiplier = 1 + progress * (this.crashPoint - 1)

        // Проверка авто-кэшаута
        if (this.autoCashoutEnabled && this.currentMultiplier >= this.autoCashoutValue) {
          this.cashout()
          return
        }

        // Краш
        if (this.currentMultiplier >= this.crashPoint) {
          this.crash()
          return
        }

        requestAnimationFrame(animate)
      }

      animate()
    },

    // Ручной кэшаут
    async cashout() {
      if (this.gameState !== 'flying') return

      telegramService.vibrate('heavy')

      const result = await mockBackend.cashout(this.currentMultiplier)

      if (result.success) {
        this.balance += result.winAmount
        this.gameState = 'idle'
        // this.updateStats(this.currentMultiplier)
        this.loadHistory()
      }
    },

    // Краш
    async crash() {
      telegramService.vibrate('heavy')

      await mockBackend.crash()
      this.gameState = 'crashed'

      // Показываем краш 1 секунду, потом сброс
      setTimeout(() => {
        this.gameState = 'idle'
        this.currentMultiplier = 1.0
      }, 1500)

      // this.updateStats(this.crashPoint)
      this.loadHistory()
    },

    // Обновление статистики
    _updateStats(multiplier) {
      // Округляем до ближайшего значения из бейджей
      const rounded = Math.round(multiplier * 100) / 100
      const closest = Object.keys(this.stats).reduce((prev, curr) => {
        return Math.abs(curr - rounded) < Math.abs(prev - rounded) ? curr : prev
      })
      this.stats[closest]++
    },

    // Обновление статистики
    updateStats(multiplier) {
      this.stats.push(multiplier)
    },

    // Загрузка истории
    loadHistory() {
      this.history = mockBackend.getHistory()
    },
  },
})
