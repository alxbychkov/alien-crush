// Алгоритм Provably Fair (упрощённый)
export function generateCrashPoint() {
  // Генерируем случайное число от 1.00x до 10.00x
  // В реальном бэке: используем криптографически стойкий RNG + хэш

  const random = Math.random()

  // Распределение: чаще низкие множители (как в реальных crash-играх)
  // 50% шанс краха до 2x
  // 30% шанс от 2x до 5x
  // 15% шанс от 5x до 10x
  // 5% шанс выше 10x

  if (random < 0.5) {
    return 1 + Math.random() * 1 // 1.00 - 2.00
  } else if (random < 0.8) {
    return 2 + Math.random() * 3 // 2.00 - 5.00
  } else if (random < 0.95) {
    return 5 + Math.random() * 5 // 5.00 - 10.00
  } else {
    return 10 + Math.random() * 40 // 10.00 - 50.00
  }
}

// Округление до 2 знаков
export function formatMultiplier(value) {
  return Math.floor(value * 100) / 100
}
