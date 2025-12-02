<script setup>
import AutoCashout from './AutoCashout.vue'
import BetPanel from './BetPanel.vue'
</script>

<template>
  <div class="control-panel-wrapper">
    <div class="control-panel">
      <AutoCashout />
      <BetPanel />
    </div>
    <div class="splash">
      <img src="@/assets/splash.webp" alt="splash" />
    </div>
  </div>
</template>

<style scoped>
.control-panel-wrapper {
  position: relative;
  z-index: 2;
}
.control-panel {
  border-radius: 30px;
  background: rgba(137, 137, 137, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(75px);
  position: relative;
  z-index: 2;
}
.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: -146px;
}
/* .control-panel::before {
  content: '';
  display: block;
  background-image: url(@/assets/splash.webp);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
} */
</style>
