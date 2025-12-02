import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import mockBackend from '@/services/mockBackend'
import telegramService from '@/services/telegram'

export const useGameStore = defineStore('game', () => {
  // State
  const balance = ref(1000.0)
  const betAmount = ref(0.15)
  const autoCashoutEnabled = ref(true)
  const autoCashoutValue = ref(2.0)
  const gameState = ref<'idle' | 'betting' | 'flying' | 'crashed'>('idle')
  const currentMultiplier = ref(1.0)
  const crashPoint = ref<number | null>(null)
  const history = ref([])
  const stats = ref([])

  // Getters
  const canPlaceBet = computed(() => {
    return gameState.value === 'idle' && balance.value >= betAmount.value
  })

  const potentialWin = computed(() => {
    return betAmount.value * currentMultiplier.value
  })

  const getStats = computed(() => {
    return stats.value.length > 1 ? stats.value.slice(0, -1) : []
  })

  // Actions
  const setBetAmount = (amount: number) => {
    betAmount.value = Math.max(0.01, Math.min(amount, balance.value))
  }

  const quickBet = (multiplier: number) => {
    setBetAmount(betAmount.value * multiplier)
  }

  const toggleAutoCashout = () => {
    autoCashoutEnabled.value = !autoCashoutEnabled.value
    telegramService.vibrate('light')
  }

  const setAutoCashoutValue = (value: number) => {
    autoCashoutValue.value = Math.max(1.01, Math.min(value, 100))
  }

  const startRound = async () => {
    if (!canPlaceBet.value) return

    telegramService.vibrate('medium')

    // Снимаем ставку с баланса
    balance.value -= betAmount.value

    // Стартуем раунд
    gameState.value = 'betting'
    const round = await mockBackend.startRound(betAmount.value, autoCashoutValue.value)

    crashPoint.value = round.crashPoint
    gameState.value = 'flying'
    currentMultiplier.value = 1.0

    // Запускаем анимацию множителя
    animateMultiplier()

    updateStats(crashPoint.value)
  }

  // Анимация роста множителя с постоянной скоростью
  const animateMultiplier = () => {
    const startTime = Date.now()
    
    // Используем логарифмическую шкалу для плавного роста
    // Скорость роста: примерно 0.1x в секунду на начальных этапах
    const baseSpeed = 0.55 // Базовая скорость роста множителя в секунду
    
    let animationFrameId: number

    const animate = () => {
      if (gameState.value !== 'flying') {
        cancelAnimationFrame(animationFrameId)
        return
      }

      const elapsed = (Date.now() - startTime) / 1000 // в секундах
      
      // Формула: используем экспоненциальный рост для более естественной анимации
      // Множитель = 1 + (baseSpeed * elapsed)^1.1
      // Это дает постоянную визуальную скорость роста
      const newMultiplier = 1 + Math.pow(baseSpeed * elapsed, 1.08)
      
      currentMultiplier.value = Math.min(newMultiplier, crashPoint.value!)

      // Проверка авто-кэшаута
      if (autoCashoutEnabled.value && currentMultiplier.value >= autoCashoutValue.value) {
        cancelAnimationFrame(animationFrameId)
        cashout()
        return
      }

      // Краш
      if (currentMultiplier.value >= crashPoint.value!) {
        cancelAnimationFrame(animationFrameId)
        crash()
        return
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  const cashout = async () => {
    if (gameState.value !== 'flying') return

    telegramService.vibrate('heavy')

    const result = await mockBackend.cashout(currentMultiplier.value)

    if (result.success) {
      balance.value += result.winAmount
      gameState.value = 'idle'
      loadHistory()
    }
  }

  const crash = async () => {
    telegramService.vibrate('heavy')

    await mockBackend.crash()
    gameState.value = 'crashed'

    // Показываем краш 1 секунду, потом сброс
    setTimeout(() => {
      gameState.value = 'idle'
      currentMultiplier.value = 1.0
    }, 1500)

    loadHistory()
  }

  const updateStats = (multiplier: number) => {
    stats.value.push(multiplier)
  }

  const loadHistory = () => {
    history.value = mockBackend.getHistory()
  }

  return {
    // State
    balance,
    betAmount,
    autoCashoutEnabled,
    autoCashoutValue,
    gameState,
    currentMultiplier,
    crashPoint,
    history,
    stats,

    // Getters
    canPlaceBet,
    potentialWin,
    getStats,

    // Actions
    setBetAmount,
    quickBet,
    toggleAutoCashout,
    setAutoCashoutValue,
    startRound,
    cashout,
    crash,
    updateStats,
    loadHistory,
  }
})