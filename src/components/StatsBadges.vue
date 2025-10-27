<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

function getBadgeColor(multiplier) {
  // Разные цвета для разных множителей (из макета)
  const colors = {
    3.12: 'green',
    1.06: 'red',
    '1.00': 'red',
    1.57: 'red',
    4.35: 'green',
    2.11: 'green',
  }
  return colors[multiplier] || 'purple'
}
</script>

<template>
  <div class="stats-badges">
    <div v-for="(count, multiplier) in stats" :key="multiplier" class="badge">
      <span class="badge-icon" :class="getBadgeColor(multiplier)"></span>
      <span class="badge-multiplier">{{ multiplier }}</span>
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
  width: 60px;
  height: 25px;
  background: rgba(184, 140, 255, 0.18);
  border-radius: 20px;
}
.badge-icon {
  display: block;
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
