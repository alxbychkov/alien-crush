<script setup>
import { onMounted, ref } from 'vue';
import './assets/styles/main.css'
import LoadingScreen from '@/components/common/LoadingScreenComponent.vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 3500)
})

</script>

<template>
  <LoadingScreen v-if="isLoading"/>

  <main class="main">
    <router-view />
  </main>
</template>

