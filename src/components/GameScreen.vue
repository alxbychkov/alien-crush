<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import StatsBadges from './StatsBadges.vue'
import AlienAnimation from './AlienAnimation.vue'
import GameBalance from './GameBalance.vue'
import ParticleEffects from './ParticleEffects.vue'
import ControlPanel from './ControlPanel.vue'
import PlayersCount from './PlayersCount.vue'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.loadHistory()
})
</script>

<template>
  <div class="game-screen">
    <StatsBadges :stats="gameStore.stats" />

    <div class="game-area">
      <GameBalance :multiplier="gameStore.currentMultiplier" :game-state="gameStore.gameState" />
      <AlienAnimation :game-state="gameStore.gameState" />
    </div>

    <ControlPanel />

    <PlayersCount />

    <ParticleEffects :game-state="gameStore.gameState" />
  </div>
</template>

<style scoped>
.game-screen {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: #ffffff;
  padding: 20px;
  padding-bottom: 92px;
  position: relative;
  overflow: hidden;
}

.game-screen::after {
  content: '';
  display: block;
  width: 100%;
  height: 500px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 89.29%);
  filter: blur(40px);
  position: absolute;
  bottom: 0;
  left: 0;
}

/* Игровая область */
.game-area {
  position: relative;
  margin: 40px 0 0;
}
</style>
