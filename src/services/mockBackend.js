import { generateCrashPoint, formatMultiplier } from '@/utils/crashPoint'

class MockBackend {
  constructor() {
    this.currentRound = null
    this.history = []
    this.points = []
  }

  // Симуляция старта раунда
  async startRound(betAmount, autoCashout) {
    return new Promise((resolve) => {
      const crashPoint = formatMultiplier(generateCrashPoint())

      this.currentRound = {
        id: Date.now(),
        betAmount,
        autoCashout,
        crashPoint,
        startTime: Date.now(),
      }

      console.log(`🎮 Round started. Crash point: ${crashPoint}x`)
      
      resolve(this.currentRound)
    })
  }

  // Симуляция кэшаута
  async cashout(currentMultiplier) {
    return new Promise((resolve) => {
      if (!this.currentRound) {
        resolve({ success: false, error: 'No active round' })
        return
      }

      const winAmount = this.currentRound.betAmount * currentMultiplier

      this.history.unshift({
        ...this.currentRound,
        cashoutAt: currentMultiplier,
        winAmount,
        result: 'win',
      })

      this.currentRound = null
      resolve({ success: true, winAmount })
    })
  }

  // Симуляция краха (не успел забрать)
  async crash() {
    return new Promise((resolve) => {
      if (!this.currentRound) {
        resolve({ success: false })
        return
      }

      this.history.unshift({
        ...this.currentRound,
        cashoutAt: this.currentRound.crashPoint,
        winAmount: 0,
        result: 'loss',
      })

      this.currentRound = null
      resolve({ success: true })
    })
  }

  getCurrentRound() {
    return this.currentRound
  }

  getHistory(limit = 10) {
    return this.history.slice(0, limit)
  }
}

export default new MockBackend()
