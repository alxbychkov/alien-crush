<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

function getBadgeColor(multiplier) {
  return +multiplier > 2 ? 'green' : 'red'
}
</script>

<template>
  <div class="stats-badges">
    <div v-for="(count, multiplier) in gameStore.getStats" :key="multiplier" class="badge">
      <span class="badge-icon" :class="getBadgeColor(count)"></span>
      <span class="badge-multiplier">{{ count }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-badges {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
}
.stats-badges::-webkit-scrollbar {
  display: none;
}
.badge {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  width: 100%;
  max-width: max-content;
  height: 25px;
  background: rgba(184, 140, 255, 0.18);
  border-radius: 20px;
}
.badge-icon {
  display: block;
  min-width: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.badge-icon.green {
  background: #24f300;
  box-shadow: 0px 0px 4px #23b011;
}
.badge-icon.red {
  background: #f30004;
  box-shadow: 0px 0px 4px #b01112;
}
.badge-multiplier {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
}
</style>
