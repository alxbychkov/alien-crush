<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const emit = defineEmits<{
  (e: 'action', amount: number): void
}>()

const isDisableble = computed(() => gameStore.gameState !== 'idle')

const quickHandler = (value: number) => {
  emit('action', value)
}
</script>
<template>
  <div class="quick-bets">
    <button class="quick-bet-btn" @click="quickHandler(0.1)" :disabled="isDisableble">
      <span class="nucl"></span> <span>0.1 nucl</span>
    </button>
    <button class="quick-bet-btn" @click="quickHandler(0.25)" :disabled="isDisableble">
      <span class="nucl"></span> <span>0.25 nucl</span>
    </button>
    <button class="quick-bet-btn" @click="quickHandler(0.5)" :disabled="isDisableble">
      <span class="nucl"></span> <span>0.5 nucl</span>
    </button>
  </div>
</template>
<style scoped>
.quick-bets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.quick-bet-btn {
  font-family: 'Rubik', sans-serif;
  width: 100px;
  padding: 12px 2px;
  background: rgba(167, 139, 250, 0.15);
  background-image: url(@/assets/quick-bet_bg.webp);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 15.1464px;
  letter-spacing: -0.04em;
  color: #ffffff;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.nucl {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/nucl_icon_raw.webp);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
}

.quick-bet-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
