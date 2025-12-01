<script setup lang="ts">
import ViewHead from '@/components/common/ViewHead.vue'
import Card from '@/components/account/Card.vue'
import Balance from '@/components/account/Balance.vue'

defineProps<{ currency: 'NUCL' | 'TON' }>()
</script>

<template>
  <ViewHead title="WITHDRAW " description="Easily withdraw funds from your account" />

  <Card :currency />

  <Balance :currency action="withdraw"/>
</template>

<style scoped></style>
