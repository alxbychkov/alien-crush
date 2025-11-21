<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="section">
    <h2 class="section-title">{{ title }}</h2>
    <div class="section-body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 20px 0 30px;
  position: relative;
  z-index: 1;
}
.section-title {
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #ffffff;
  margin-bottom: 25px;
}
.section-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
