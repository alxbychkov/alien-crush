<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useGameStore } from '@/stores/gameStore'
import Alien from './icons/Alien.vue'

const gameStore = useGameStore()

const alien = ref(null)
const alienWrapper = ref(null)
let flightTimeline = null

// Анимация при старте игры
watch(
  () => gameStore.gameState,
  (newState, oldState) => {
    if (newState === 'flying' && oldState === 'idle') {
      animateFlight()
    } else if (newState === 'crashed') {
      animateCrash()
    } else if (newState === 'idle') {
      resetAnimation()
    }
  },
)

function animateFlight() {
  // Убиваем предыдущие анимации
  if (flightTimeline) flightTimeline.kill()

  flightTimeline = gsap.timeline()

  // Пульсация пришельца
  flightTimeline.to(alien.value, {
    scale: 1.1,
    duration: 0.5,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut',
  })

  // Покачивание вверх-вниз
  flightTimeline.to(
    alien.value,
    {
      y: -15,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    },
    0,
  )

  // Легкое вращение влево-вправо
  flightTimeline.to(
    alien.value,
    {
      rotation: 8,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    },
    0,
  )

  // Небольшое движение по горизонтали
  flightTimeline.to(
    alien.value,
    {
      x: 10,
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    },
    0,
  )

  // 5. Анимация комет
  gsap.to('.comet', {
    x: -300,
    opacity: 0,
    duration: 1.5,
    stagger: {
      each: 0.3,
      repeat: -1,
      repeatDelay: 0.5,
    },
    ease: 'power2.in',
  })

  // 7. Свечение усиливается
  // gsap.to('.glow-bottom', {
  //   opacity: 1,
  //   scale: 1.2,
  //   duration: 1,
  //   yoyo: true,
  //   repeat: -1,
  //   ease: 'sine.inOut',
  // })
}

function animateCrash() {
  // Останавливаем все анимации
  if (flightTimeline) flightTimeline.kill()
  // Остановка всех анимаций
  gsap.killTweensOf('.comet')
  // gsap.killTweensOf('.glow-bottom')

  // Эффект взрыва
  const crashTimeline = gsap.timeline()

  // Эффект взрыва
  crashTimeline
    .to(alien.value, {
      scale: 1.3,
      duration: 0.1,
      ease: 'power2.out',
    })
    .to(alien.value, {
      x: -5,
      duration: 0.05,
      yoyo: true,
      repeat: 3,
    })
    .to(alien.value, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })

  // 4. Кометы разлетаются
  crashTimeline.to(
    '.comet',
    {
      scale: 0.5,
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -200 : 200),
      y: (i) => -100 - i * 20,
      rotation: 360,
      duration: 0.5,
      ease: 'power2.out',
    },
    '<',
  )

  // 5. Свечение исчезает
  // crashTimeline.to(
  //   '.glow-bottom',
  //   {
  //     scale: 2,
  //     opacity: 0,
  //     duration: 0.3,
  //   },
  //   '<',
  // )
}

function resetAnimation() {
  if (flightTimeline) flightTimeline.kill()
  gsap.killTweensOf(alien.value)
  gsap.killTweensOf('.comet')
  // gsap.killTweensOf('.glow-bottom')

  gsap.to(alien.value, {
    scale: 1,
    opacity: 1,
    duration: 0.3,
  })

  gsap.to('.comet', {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    rotation: 0,
    duration: 0.5,
  })

  // gsap.to('.glow-bottom', {
  //   scale: 1,
  //   opacity: 0.6,
  //   duration: 0.5,
  // })
}

onMounted(() => {
  // Начальная idle анимация (легкое покачивание)
  gsap.to(alien.value, {
    y: -10,
    duration: 2.5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  })
})

onUnmounted(() => {
  if (flightTimeline) flightTimeline.kill()
})
</script>

<template>
  <div class="alien-container">
    <div class="alien-wrapper" ref="alienWrapper">
      <div class="comets">
        <img src="@/assets/ray.webp" class="comet comet-1" alt="" />
        <img src="@/assets/ray.webp" class="comet comet-2" alt="" />
        <img src="@/assets/ray.webp" class="comet comet-3" alt="" />
        <img src="@/assets/ray.webp" class="comet comet-4" alt="" />
      </div>

      <!-- Пришелец -->
      <div
        class="alien"
        ref="alien"
        :class="{
          flying: gameStore.gameState === 'flying',
          crashed: gameStore.gameState === 'crashed',
        }"
      >
        <img src="@/assets/alien.webp" alt="alien" width="75" />
      </div>

      <div class="capet">
        <img src="@/assets/capet.webp" />
      </div>

      <!-- Неоновое свечение снизу -->
      <div class="glow-bottom"></div>
    </div>
  </div>
</template>

<style scoped>
.alien-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Пришелец с лучами */
.alien-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.capet {
  /* display: none; */
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  z-index: 2;
  mix-blend-mode: plus-lighter;
}

.capet img {
  width: 100%;
}

.alien {
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
}

.alien.flying {
  filter: drop-shadow(0 0 20px rgba(167, 139, 250, 0.6));
}

.alien.crashed {
  filter: drop-shadow(0 0 30px rgba(239, 68, 68, 0.8));
}

/* Кометы */
.comets {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.comet {
  position: absolute;
  width: 80px;
  height: auto;
  opacity: 0.7;
  filter: blur(1px) brightness(1.2);
  mix-blend-mode: screen;
}

.comet-1 {
  top: 10%;
  left: -40px;
  /* transform: rotate(-15deg); */
}

.comet-2 {
  top: 30%;
  left: -70px;
  width: 60px;
  /* transform: rotate(-10deg); */
}

.comet-3 {
  top: 15%;
  right: -40px;
  transform: rotate(0deg) scaleX(-1);
}

.comet-4 {
  top: 35%;
  right: -70px;
  width: 60px;
  transform: rotate(0deg) scaleX(-1);
}

/* Свечение снизу */
.glow-bottom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 40px;
  background: radial-gradient(ellipse, rgba(167, 139, 250, 0.4), transparent);
  filter: blur(20px);
}
</style>
