<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const handleChange = (event) => {
  gameStore.setAutoCashoutValue(parseFloat(event.target.value))
}
</script>

<template>
  <div class="auto-cashout">
    <div class="auto-cashout-header">
      <div class="toggle-wrapper" @click="gameStore.toggleAutoCashout">
        <div class="toggle" :class="{ active: gameStore.autoCashoutEnabled }">
          <div class="toggle-slider"></div>
        </div>
        <div class="toggle-label">
          <span class="toggle-title">Auto Cashout</span>
          <span class="toggle-subtitle"></span>
        </div>
      </div>

      <div class="cashout-value" :class="{ active: gameStore.autoCashoutEnabled }">
        {{ gameStore.autoCashoutValue.toFixed(2) }}X
      </div>
    </div>

    <!-- Слайдер для настройки значения (показывается, если включен) -->
    <div class="slider-container">
      <input
        type="range"
        class="slider"
        :value="gameStore.autoCashoutValue"
        min="1.01"
        max="10"
        step="0.01"
        @input="handleChange"
      />
      <div class="slider-labels">
        <span>1.01x</span>
        <span>10.00x</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auto-cashout {
  padding: 25px 30px;
  background: rgba(190, 146, 255, 0.1);
  border-radius: 28px 28px 0px 0px;
}

.auto-cashout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Toggle */
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.toggle {
  width: 42px;
  height: 26px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  position: relative;
  transition: background 0.3s ease;
}

.toggle.active {
  background: linear-gradient(90deg, #a78bfa 0%, #8b5cf6 100%);
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffffff 24.31%, rgba(255, 255, 255, 0.62) 100%);
  box-shadow: -2.08537px 0px 8.34146px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
}

.toggle.active .toggle-slider {
  transform: translateX(14px);
}

.toggle-label {
  display: flex;
  flex-direction: column;
}

.toggle-title {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}

.toggle-subtitle {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.4);
}

/* Значение кэшаута */
.cashout-value {
  transition: all 0.3s ease;
  font-family: 'MikroSuper', sans-serif;
  font-weight: 800;
  font-size: 31.2418px;
  line-height: 80%;
  text-transform: uppercase;
  background: linear-gradient(180deg, #ffc700 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0px 0px 10px rgba(252, 227, 6, 0.7);
}

.cashout-value.active {
}

/* Слайдер */
.slider-container {
  margin-top: 16px;
  display: none;
}

.slider {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}
</style>
