<script setup lang="ts">
defineProps<{
  type: 'deposit' | 'withdraw'
  amount: string
  currency?: string
  time: string
  status: string
}>()
</script>

<template>
  <div class="transaction-item">
    <div class="transaction-head" :class="type">
      <div class="transaction-type">{{ type }}</div>
      <div class="transaction-amount">+{{ amount }}</div>
    </div>
    <div class="transaction-bottom">
      <div class="transaction-time">{{ time }}</div>
      <div class="transaction-status">{{ status }}</div>
    </div>
  </div>
</template>

<style scoped>
.transaction-item {
  padding: 12px 25px;
  width: 100%;
  height: 75px;
  background: linear-gradient(104.49deg, #1a0f2e 0%, #1e1434 100%);
  border: 1px solid rgba(55, 38, 89, 0.5);
  box-shadow:
    0px 0px 30px rgba(179, 102, 255, 0.15),
    inset 0px 1px 0px 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  border-radius: 16px;
}
.transaction-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1px;
}
.transaction-type {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #f2f1f4;
  text-transform: capitalize;
}
.transaction-type::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 5px;
  border-radius: 50%;
  position: relative;
  bottom: 2px;
}
.transaction-head.deposit .transaction-type::before {
  background: #24f300;
  box-shadow: 0px 0px 4px #23b011;
}
.transaction-head.withdraw .transaction-type::before {
  background: #f30004;
  box-shadow: 0px 0px 4px #b01112;
}
.transaction-amount {
  font-family: 'MikroSuper', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
}
.transaction-head.deposit .transaction-amount {
  color: #24f300;
}
.transaction-head.withdraw .transaction-amount {
  color: #f30004;
}
.transaction-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #b3a3c2;
}
.transaction-status {
  text-transform: capitalize;
}
</style>
