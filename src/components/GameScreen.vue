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
  <StatsBadges />

  <div class="game-area">
    <GameBalance :multiplier="gameStore.currentMultiplier" :game-state="gameStore.gameState" />
    <AlienAnimation :game-state="gameStore.gameState" />
  </div>

  <ControlPanel />

  <PlayersCount />

  <ParticleEffects :game-state="gameStore.gameState" />
</template>

<style scoped>
/* Игровая область */
.game-area {
  position: relative;
  margin: 40px 0 0;
}
</style>
