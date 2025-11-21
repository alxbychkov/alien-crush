<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="view-head">
    <h1 v-if="title" class="view-title">{{ title }}</h1>
    <p v-if="description" class="view-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.view-head {
  text-align: start;
  padding: 20px 0 30px;
  position: relative;
}
.view-title {
  font-family: 'MikroSuper', sans-serif;
  font-weight: 800;
  font-size: 32px;
  line-height: 100%;
  text-transform: uppercase;
  margin-bottom: 7px;
}
.view-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.4);
}
</style>
