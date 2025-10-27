<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  gameState: {
    type: String,
    default: 'idle',
  },
})

const showConfetti = ref(false)
const particles = ref([])
let animationId = null

// Показываем конфетти при кэшауте
watch(
  () => props.gameState,
  (newState, oldState) => {
    if (oldState === 'flying' && newState === 'idle') {
      showConfetti.value = true
      setTimeout(() => {
        showConfetti.value = false
      }, 3000)
    }
  },
)

// Создание частицы
const createParticle = (type) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 2,
    vy: Math.random() * -3 - 1,
    life: 1,
    maxLife: Math.random() * 3 + 2,
    size: Math.random() * 4 + 2,
    color:
      type === 'fire'
        ? ['#fbbf24', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 3)]
        : ['#a78bfa', '#fbbf24', '#22c55e', '#3b82f6', '#f472b6'][Math.floor(Math.random() * 5)],
    type,
  }
}

// Анимация частиц
const animate = () => {
  if (props.gameState === 'flying') {
    // Добавляем огонь
    if (Math.random() < 0.3) {
      particles.value.push(createParticle('fire'))
    }
  }

  if (showConfetti.value) {
    // Добавляем конфетти
    if (Math.random() < 0.5) {
      particles.value.push(createParticle('confetti'))
    }
  }

  // Обновляем частицы
  particles.value = particles.value.filter((particle) => {
    particle.x += particle.vx
    particle.y += particle.vy
    particle.life -= 0.02
    particle.vy += 0.1 // гравитация

    return particle.life > 0 && particle.y < window.innerHeight + 50
  })

  // Ограничиваем количество частиц
  if (particles.value.length > 100) {
    particles.value = particles.value.slice(-50)
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="particle-effects">
    <!-- Фоновые звёзды -->
    <div class="stars">
      <div
        v-for="star in 50"
        :key="star"
        class="star"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
        }"
      ></div>
    </div>

    <!-- Частицы -->
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :class="particle.type"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        backgroundColor: particle.color,
        width: particle.size + 'px',
        height: particle.size + 'px',
        opacity: particle.life,
      }"
    ></div>
  </div>
</template>

<style scoped>
.particle-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* Фоновые звёзды */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #a78bfa;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Частицы */
.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.particle.fire {
  box-shadow: 0 0 10px currentColor;
  animation: fire-flicker 0.5s ease-in-out infinite;
}

.particle.confetti {
  border-radius: 2px;
  animation: confetti-fall 2s ease-out;
}

@keyframes fire-flicker {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(100px) rotate(360deg);
  }
}
</style>
