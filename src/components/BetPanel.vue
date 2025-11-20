<script setup>
import { computed } from 'vue'
import QuickBets from './bet-panel/QuickBets.vue'

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
      return 'YOU MADE YOUR BET'
    case 'crashed':
      return 'CANCEL YOUR BET'
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
    <QuickBets :game-state="gameState" @add-to-bet="addToBet" />

    <!-- Кастомная ставка -->
    <div class="custom-bet">
      <div class="bet-input-wrapper">
        <label class="custom-bet-label">Custom Bid</label>
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
      <span class="nucl-icon" v-if="gameState === 'idle'"></span>
      <span class="made-bet" v-if="gameState === 'flying'"></span>
      <span class="cancel-bet" v-if="gameState === 'crashed'"></span>
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

/* Кастомная ставка */
.custom-bet {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(75px);
  border-radius: 10px;
  padding: 12px;
}

.custom-bet-label {
  display: block;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  opacity: 0.3;
}

.bet-input-wrapper {
  position: relative;
}

.bet-input {
  font-family: 'Rubik', sans-serif;
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 12px;
  text-align: center;
  outline: none;
  transition: border-color 0.2s ease;
  font-weight: 500;
  font-size: 50.9469px;
  line-height: 100%;
  letter-spacing: -0.04em;
  color: #ffffff;
  opacity: 0.2;
  background: transparent;
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
  height: 60px;
  padding: 18px;
  border: none;
  border-radius: 12.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Rubik', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  text-align: center;
  color: #ffffff;
}

.action-btn.idle {
  background: linear-gradient(135deg, #fbbf24 0%, #3b82f6 100%);
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
  background: #2f6eff;
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
  border: 1px solid #ffffff;
  background: transparent;
  cursor: not-allowed;
}

.action-btn.disabled {
  background: rgba(255, 255, 255, 0.1);
  color: #666;
  cursor: not-allowed;
  box-shadow: none;
  border: 1px solid #ffffff;
}

.action-btn-icon {
  /* font-size: 20px; */
  /* animation: bounce 0.5s ease-in-out infinite; */
}

.nucl-icon {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-image: url(@/assets/nucl_icon_raw.webp);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 5px;
}

.made-bet {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB0SURBVHgB7dDRCYAwDEXRhxM4gqM4ghs4giO0mziCI8YEFDXYipj4lQOhP6WXFAgh1BBRzzPytPDCj2c6pNK9Bh9IhI8ET2oTMeOt7c+HPyK77BK5CV1iZpHTg0nHzCOVmH3kIWYbKcQWeOLAJJvwdAghaCvjtgYKMZJMyAAAAABJRU5ErkJggg==);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.cancel-bet {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACWSURBVHgB7dJhDYAgEIbhL4IRjGIEGxhBG0gDIxjFCEQxwgkbboiHugM3N3k3fnn6yAAolf4bETVmtQ9mOrMqJCB7KjKjvJkRkgLohAWIHHIfGzmMQWakxmBLduQCy494WLgTjdwxZ3I4s7cQnR2jyO2iyG2UIjWHeM9DbIAk82Jl1sohEWyCNLer7mamtz9iZ1EqfaYNui2B+9UNI/AAAAAASUVORK5CYII=);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
