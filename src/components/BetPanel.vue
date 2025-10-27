<script setup>
import { computed } from 'vue'

const props = defineProps({
  betAmount: {
    type: Number,
    required: true,
  },
  gameState: {
    type: String,
    default: 'idle',
  },
  canBet: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:bet', 'start', 'cashout'])

const displayBet = computed(() => {
  return props.betAmount.toFixed(2)
})

const btnText = computed(() => {
  switch (props.gameState) {
    case 'idle':
      return `Bet ${displayBet.value} nucl`
    case 'betting':
      return 'Starting...'
    case 'flying':
      return 'Cashout!'
    case 'crashed':
      return 'Crashed!'
    default:
      return 'Place Bet'
  }
})

const btnClass = computed(() => {
  return {
    idle: props.gameState === 'idle',
    flying: props.gameState === 'flying',
    crashed: props.gameState === 'crashed',
    disabled: !props.canBet && props.gameState === 'idle',
  }
})

function handleInput(event) {
  const value = parseFloat(event.target.value) || 0
  emit('update:bet', value)
}

function addToBet(amount) {
  emit('update:bet', props.betAmount + amount)
}

function handleAction() {
  if (props.gameState === 'idle') {
    emit('start')
  } else if (props.gameState === 'flying') {
    emit('cashout')
  }
}
</script>

<template>
  <div class="bet-panel">
    <!-- Быстрые ставки -->
    <div class="quick-bets">
      <button class="quick-bet-btn" @click="addToBet(0.1)" :disabled="gameState !== 'idle'">
        0.1 nucl
      </button>
      <button class="quick-bet-btn" @click="addToBet(0.25)" :disabled="gameState !== 'idle'">
        0.25 nucl
      </button>
      <button class="quick-bet-btn" @click="addToBet(0.5)" :disabled="gameState !== 'idle'">
        0.5 nucl
      </button>
    </div>

    <!-- Кастомная ставка -->
    <div class="custom-bet">
      <label class="custom-bet-label">Custom Bid</label>
      <div class="bet-input-wrapper">
        <input
          type="number"
          class="bet-input"
          :value="displayBet"
          @input="handleInput"
          :disabled="gameState !== 'idle'"
          step="0.01"
          min="0.01"
        />
      </div>
    </div>

    <button
      class="action-btn"
      :class="btnClass"
      @click="handleAction"
      :disabled="!canBet && gameState === 'idle'"
    >
      <span class="action-btn-icon" v-if="gameState === 'flying'">🔥</span>
      {{ btnText }}
    </button>
  </div>
</template>

<style scoped>
.bet-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

/* Быстрые ставки */
.quick-bets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.quick-bet-btn {
  padding: 12px;
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 12px;
  color: #a78bfa;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-bet-btn:hover:not(:disabled) {
  background: rgba(167, 139, 250, 0.25);
  transform: translateY(-2px);
}

.quick-bet-btn:active:not(:disabled) {
  transform: translateY(0);
}

.quick-bet-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Кастомная ставка */
.custom-bet {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-bet-label {
  font-size: 13px;
  color: #888;
}

.bet-input-wrapper {
  position: relative;
}

.bet-input {
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  outline: none;
  transition: border-color 0.2s ease;
}

.bet-input:focus {
  border-color: rgba(167, 139, 250, 0.5);
}

.bet-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Главная кнопка */
.action-btn {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-btn.idle {
  background: linear-gradient(135deg, #fbbf24 0%, #3b82f6 100%);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.4);
}

.action-btn.idle:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(251, 191, 36, 0.6);
}

.action-btn.idle:active:not(:disabled) {
  transform: translateY(0);
}

.action-btn.flying {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: #ffffff;
  animation: pulse-green 1s ease-in-out infinite;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
}

@keyframes pulse-green {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 12px 32px rgba(34, 197, 94, 0.6);
  }
}

.action-btn.crashed {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #ffffff;
  cursor: not-allowed;
}

.action-btn.disabled {
  background: rgba(255, 255, 255, 0.1);
  color: #666;
  cursor: not-allowed;
  box-shadow: none;
}

.action-btn-icon {
  font-size: 20px;
  animation: bounce 0.5s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* Адаптив */
@media (max-width: 375px) {
  .quick-bets {
    gap: 8px;
  }

  .quick-bet-btn {
    padding: 10px;
    font-size: 13px;
  }

  .bet-input {
    font-size: 20px;
  }

  .action-btn {
    font-size: 16px;
    padding: 16px;
  }
}
</style>
