<script setup>
defineProps({
  enabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Number,
    default: 2.0,
  },
})

const emit = defineEmits(['toggle', 'change'])

function handleChange(event) {
  emit('change', parseFloat(event.target.value))
}
</script>

<template>
  <div class="auto-cashout">
    <div class="auto-cashout-header">
      <div class="toggle-wrapper" @click="$emit('toggle')">
        <div class="toggle" :class="{ active: enabled }">
          <div class="toggle-slider"></div>
        </div>
        <div class="toggle-label">
          <span class="toggle-title">Auto Cashout</span>
          <span class="toggle-subtitle">Saving the battery</span>
        </div>
      </div>

      <div class="cashout-value" :class="{ active: enabled }">{{ value.toFixed(2) }}X</div>
    </div>

    <!-- Слайдер для настройки значения (показывается, если включен) -->
    <div v-if="enabled" class="slider-container">
      <input
        type="range"
        class="slider"
        :value="value"
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
  margin-bottom: 20px;
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
  width: 48px;
  height: 28px;
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
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.toggle.active .toggle-slider {
  transform: translateX(20px);
}

.toggle-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toggle-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.toggle-subtitle {
  font-size: 11px;
  color: #888;
}

/* Значение кэшаута */
.cashout-value {
  font-size: 24px;
  font-weight: 700;
  color: #666;
  transition: all 0.3s ease;
}

.cashout-value.active {
  color: #fbbf24;
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}

/* Слайдер */
.slider-container {
  margin-top: 16px;
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
