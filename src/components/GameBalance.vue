<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const displayMultiplier = computed(() => {
  return gameStore.currentMultiplier.toFixed(2) + 'X'
})

const formatBalance = (value) => {
  return value.toFixed(2)
}
</script>

<template>
  <div class="balance-info">
    <span class="balance-label">total available:</span>
    <span class="balance-value">{{ formatBalance(gameStore.balance) }}</span>
  </div>
  <div
    class="multiplier"
    :class="{
      active: gameStore.gameState === 'flying',
      crashed: gameStore.gameState === 'crashed',
    }"
  >
    <div class="multiplier-icon"></div>
    <span class="multiplier-value">{{ displayMultiplier }}</span>
  </div>
</template>

<style scoped>
.balance-info {
  text-align: center;
  margin-bottom: 10px;
  color: #ffffff;
}

.balance-label {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;
}

.balance-value {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.multiplier {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  padding-left: 60px;
}

.multiplier-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50px;
  width: 60px;
  height: 60px;
  background-image: url(@/assets/nucl_icon.webp);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.multiplier-value {
  font-family: 'MikroSuper', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 62.4836px;
  line-height: 80%;
  text-transform: uppercase;
  color: #ffffff;
}
.multiplier.active .multiplier-value {
  color: #a78bfa;
  text-shadow: 0 0 30px rgba(167, 139, 250, 0.8);
  animation: pulse 0.5s ease-in-out infinite;
}
.multiplier.crashed .multiplier-value {
  color: #ef4444;
  text-shadow: 0 0 30px rgba(239, 68, 68, 0.8);
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
