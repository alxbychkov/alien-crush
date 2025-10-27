<template>
  <div class="players-count">
    <div class="players-icon"></div>
    <span class="players-value">12,000 users</span>
  </div>
</template>

<style scoped>
/* Счётчик игроков */
.players-count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.players-icon {
  width: 35px;
  height: 35px;
  background-image: url(@/assets/players_icon.webp);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.players-value {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.5px;
  color: #ffffff;
}
</style>
