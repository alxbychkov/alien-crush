<script setup>
import './assets/styles/main.css'

</script>

<template>
  <main class="main">
    <router-view />
  </main>
</template>

<style>
#app {
  min-height: 100vh;
  position: relative;
}

.main {
  min-height: 100vh;
  background: linear-gradient(216deg, #170B54 -15.84%, #170B51 -11.36%, #170A4E -6.89%, #160A4C -2.41%, #160A49 2.06%, #160947 6.53%, #160945 11.01%, #160942 15.48%, #160940 19.96%, #15093F 24.43%, #15083D 28.91%, #15083B 33.38%, #15083A 37.86%, #150839 42.33%, #150839 46.8%, #150838 51.28%, #150838 55.75%);
  color: #ffffff;
  padding: 120px 20px 92px;
  position: relative;
  overflow: hidden;
}
.main::before {
  content: '';
  display: block;
  width: 100%;
  height: 420px;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 112.86%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.main::after {
  content: '';
  display: block;
  width: 100%;
  height: 500px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 89.29%);
  filter: blur(40px);
  position: absolute;
  bottom: 0;
  left: 0;
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
