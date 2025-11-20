<script setup>
import { useGameStore } from '@/stores/game'
import AutoCashout from './AutoCashout.vue'
import BetPanel from './BetPanel.vue'

const gameStore = useGameStore()
</script>

<template>
  <div class="control-panel">
    <AutoCashout
      :enabled="gameStore.autoCashoutEnabled"
      :value="gameStore.autoCashoutValue"
      @toggle="gameStore.toggleAutoCashout"
      @change="gameStore.setAutoCashoutValue"
    />

    <BetPanel
      :bet-amount="gameStore.betAmount"
      :game-state="gameStore.gameState"
      :can-bet="gameStore.canPlaceBet"
      @update:bet="gameStore.setBetAmount"
      @start="gameStore.startRound"
      @cashout="gameStore.cashout"
    />
  </div>
</template>

<style scoped>
.control-panel {
  border-radius: 30px;
  background: rgba(137, 137, 137, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(75px);
  position: relative;
  z-index: 2;
}
.control-panel::before {
  content: '';
  display: block;
  background-image: url(@/assets/splash.webp);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
