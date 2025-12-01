<script setup lang="ts">
import ViewHead from '@/components/common/ViewHead.vue'
import Card from '@/components/account/Card.vue'
import Balance from '@/components/account/Balance.vue'

defineProps<{ currency: 'NUCL' | 'TON' }>()
</script>

<template>
  <ViewHead title="DEPOSIT FUNDS " description="Easily deposit funds to your account" />

  <Card :currency />

  <Balance :currency action="deposit" />
</template>

<style scoped></style>
