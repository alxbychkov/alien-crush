<script setup lang="ts">
defineProps<{
  displayBet: string
  gameState: string
}>()

const emits = defineEmits<{
  (e: 'update:bet', amount: number): void
}>()
</script>

<template>
  <div class="custom-bet">
    <label class="custom-bet-label">Custom Bid</label>
    <div class="bet-input-wrapper">
      <input
        type="number"
        class="bet-input"
        :value="displayBet"
        @input="(e) => emits('update:bet', parseFloat((e.target as HTMLInputElement).value) || 0)"
        :disabled="gameState !== 'idle'"
        step="0.01"
        min="0.01"
      />
    </div>
  </div>
</template>

<style scoped>
.custom-bet {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-bet-label {
  font-size: 13px;
  color: #888;
}

.bet-input-wrapper {
  position: relative;
}

.bet-input {
  font-family: 'Rubik', sans-serif;
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;
  outline: none;
  transition: border-color 0.2s ease;
  font-weight: 500;
  font-size: 50.9469px;
  line-height: 100%;
  letter-spacing: -0.04em;
  color: #ffffff;
  opacity: 0.2;
}

.bet-input:focus {
  border-color: rgba(167, 139, 250, 0.5);
}

.bet-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
