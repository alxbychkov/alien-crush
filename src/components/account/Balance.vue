<script setup lang="ts">
import QuickBets from '@/components/bet-panel/QuickBets.vue'
import { computed, ref, onMounted } from 'vue'
import { useWalletStore } from '@/stores/walletStore'

const walletStore = useWalletStore()

const props = defineProps<{
  currency: 'NUCL' | 'TON'
  action: 'deposit' | 'withdraw'
}>()

const balanceValue = ref(null)
const networkFee = ref(0.01)
const totalAmount = computed(() => {
  if (props.action === 'deposit') {
    return Math.round((balanceValue.value + networkFee.value) * 100) / 100
  } else if (props.action === 'withdraw') {
    return Math.round((balanceValue.value - networkFee.value) * 100) / 100
  } else {
    return 0
  }
})

const balanceActionHandler = (amount: number) => {
  const next = (balanceValue.value ?? 0) + amount

  balanceValue.value = Math.round(next * 100) / 100
}

onMounted(async () => {})
</script>

<template>
  <div class="balance-wrapper">
    <div class="quick-actions-wrapper">
      <div class="quick-title">Quick Select</div>

      <QuickBets @add-to-bet="balanceActionHandler" />
    </div>

    <div class="amount-wrapper">
      <div class="amount-body">
        <input
          type="number"
          class="input"
          name="amount"
          placeholder="Enter amount"
          v-model="balanceValue"
        />
        <div class="amount-body-info">
          <span class="label">Amount</span>
          <span class="value">{{ balanceValue ?? 0 }} {{ currency }}</span>
        </div>
        <div class="amount-body-info">
          <span class="label">Network Fee</span>
          <span class="value">~{{ networkFee }} {{ currency }}</span>
        </div>
      </div>
      <div class="amount-bottom">
        <p class="label" :class="{ withdraw: action === 'withdraw' }">
          {{ action === 'deposit' ? 'Total' : 'You’ll Receive' }}
        </p>
        <p class="value">{{ totalAmount }} {{ currency }}</p>
      </div>
    </div>

    <div class="balance-actions-wrapper">
      <div class="action-button confirm" :class="{ disabled: !balanceValue }">
        <span>Confirm {{ action === 'deposit' ? 'Deposit' : 'Withdrawal' }}</span>
      </div>
      <router-link to="/account" class="action-button cancel"><span>Cancel</span></router-link>
    </div>

    <div class="balance-info">
      <div v-if="action === 'deposit'">
        <p>Deposits typically arrive within 1-2 minutes</p>
        <p>Network fees may vary based on blockchain congestion</p>
      </div>
      <div v-if="action === 'withdraw'">
        <p class="warning">Withdrawals may take 5-10 minutes</p>
        <p>Withdrawals cannot be reversed once confirmed</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quick-actions-wrapper {
  padding: 0 20px;
}
.balance-wrapper {
  padding: 40px 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.quick-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  opacity: 0.3;
  margin-bottom: 24px;
}

.balance-info {
  margin-top: 5px;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
}

.balance-info .warning {
  color: #ffdd33;
  margin-bottom: 2px;
}
.balance-info .warning::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAIqSURBVDhPpZRBUhphEIW/96OpbFLOzu0Qk0pcgbBwKd6AnEA8gfEEcgQ9gckJ5AboMgsFViYFBrZZhYQsUiXMywKG4IBlpfLtpvufN9P9v27xBO7vRfA7mj49Hyp/NcyeWUTZAKlI8uu98Z5Q5UHObhM4ldavlP80WMyxStDdctWBc0Fke4jUwJ6+KIqYoqTYMECuh5c3H7Mac3xXrvuu7KRX+p70SgfZfIq/lGpJr9T3XdnuluuLufkfuleqIZ3bHuh+sq/tzlI5i/i2EHs915QUc887vb1ukAq6vxs7GTexWSU2vRjIXohvC7GfrbUwaDTOa6czDABM7iuCGKhnxQCcjJqejC6ycW13Bhr7WCLyi9wRQACwOLI9CK8eabCJmH5wCb25+WAYAhWA4H4hEioi2tnD/0BDUsWtQhSAqWn9H4IzW3kzbEx7+BRyA7mRDa8iMK0fpJU9AghbreOw1TrOxueIIoC+JT+C8p2h8SWmmj2X4m656s/lR/Ogou32X9uIS4ko+bp6Ohx84DWfZOPMBmJmuVNS20iTM8OQRKfu7y6Vrp+TQ40m+9m4+7uxpZPZdF3xYPS65SqBC8NAYW1/1SZZJJ0uQWy7lnp4fst6fd2wXBfETsbNx8pnVqaTcWsmVl8ciOX19aVUc46T+YrC7blHp06opqtNYx2mSyFlSZDZ0BNyFec4klR8kLPbQEOjyZl2Okvbe6XgIm4VIm+GDWY+WyWyyB+UMxrQSaljAAAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  left: -5px;
  top: 4px;
}
.balance-actions-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.action-button {
  width: 100%;
  height: 56px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.action-button.disabled {
  opacity: 0.4;
}
.action-button.confirm {
  background: linear-gradient(90deg, #c96ef7 100%, #a65eed 0%);
  box-shadow:
    0px 0px 20px rgba(179, 102, 255, 0.1),
    0px 0px 40px rgba(179, 102, 255, 0.3),
    0px 0px 20px rgba(179, 102, 255, 0.6);
}
.action-button.cancel {
  color: #a65eed;
  background: rgba(166, 94, 237, 0.1);
  border: 2px solid #a65eed;
}

.amount-wrapper {
  border-radius: 30px;
  overflow: hidden;
  background-image: url(@/assets/balance_bg.webp);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.amount-bottom {
  border-top: 1px solid rgba(86, 87, 145, 0.4);
  padding: 15px 15px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'MikroSuper', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 20px;
  color: #ffffff;
}
.amount-bottom .label.withdraw {
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 14px;
}
.amount-bottom .value {
  text-transform: uppercase;
}
.amount-body {
  display: flex;
  flex-direction: column;
  padding: 25px 15px 15px;
}
.amount-body .input {
  padding: 8.625px 30px;
  background: rgba(0, 0, 0, 0.3);
  border: 0.75px solid rgba(255, 255, 255, 0.2);
  border-radius: 9.375px;
  width: 100%;
  height: 51px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
  font-family: 'Rubik', sans-serif;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 15px;
}
.amount-body .input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.amount-body-info {
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.amount-body-info:not(:last-child) {
  margin-bottom: 8px;
}
.amount-body .label {
  font-weight: 400;
  color: #b3a3c2;
}
.amount-body .value {
  font-weight: 600;
}
</style>
