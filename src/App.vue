<script setup>
import './assets/styles/main.css'
import GameScreen from './components/GameScreen.vue'
</script>

<template>
  <GameScreen />
</template>

<style>
#app {
  min-height: 100vh;
  position: relative;
}

/* Убираем стандартные стили для input number */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

/* Убираем outline на touch устройствах */
button:focus,
input:focus {
  outline: none;
}

/* Плавная прокрутка */
html {
  scroll-behavior: smooth;
}

/* Запрет выделения текста (для игры) */
#app {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Разрешаем выделение для input */
input {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
</style>
