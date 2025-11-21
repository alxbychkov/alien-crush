<script setup lang="ts">
type Currency = 'NUCL' | 'TON'

defineProps<{
  currency: Currency
  actions?: boolean
}>()
</script>

<template>
  <div class="balance-card">
    <div class="balance-body">
      <div class="card-icon">
        <img v-if="currency === 'NUCL'" src="@/assets/nucl_icon.webp" alt="Nucleus Icon" />
        <img v-else-if="currency === 'TON'" src="@/assets/ton_icon.webp" alt="Ton Icon" />
      </div>
      <div class="card-info">
        <p v-if="currency === 'NUCL'" class="card-label">Nucleus Balance</p>
        <p v-else-if="currency === 'TON'" class="card-label">TON BALANCE</p>

        <div class="card-amount">
          <p class="value">{{ currency === 'NUCL' ? '2,450.50' : '15.75' }}</p>
          <p class="summary">≈ {{ currency === 'NUCL' ? '$245.05' : '$42.50' }}</p>
        </div>
      </div>
    </div>
    <div v-if="actions" class="balance-action">
      <router-link :to="{ name: 'Deposit', query: { currency } }" class="button-link">
        <span class="button-icon" :class="{'icon-dep': currency === 'NUCL', 'icon-wal': currency === 'TON'}"></span>
        <span class="button-caption">Deposit</span>
      </router-link>
      <router-link v-if="currency === 'NUCL'" :to="{ name: 'Withdraw', query: { currency } }" class="button-link">
        <span class="button-icon icon-wit"></span>
        <span class="button-caption">Withdraw</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.balance-card {
  border-radius: 30px;
  padding: 20px;
  overflow: hidden;
  background: rgba(137, 137, 137, 0.05);
  background-image: url(@/assets/card_bg.webp);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(75px);
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.balance-card:not(:last-child) {
  margin-bottom: 10px;
}
.balance-body {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}
.card-icon {
  width: 60px;
  height: 60px;
}
.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.card-info {
  width: 100%;
}
.card-label {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #ae9ece;
  opacity: 0.4;
  margin-bottom: 10px;
}
.card-amount {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
.value {
  font-family: 'MikroSuper', sans-serif;
  font-weight: 800;
  font-size: 32px;
  line-height: 100%;
  text-transform: uppercase;
}
.summary {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #b3a3c2;
}

.balance-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
}
.button-link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8.625px 30px;
  gap: 10px;
  border: 0.75px solid #ffffff;
  border-radius: 9.375px;
  width: 100%;
  height: 45px;
  text-decoration: none;
}

.button-icon {
  width: 16px;
  height: 16px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.button-caption {
  font-weight: 500;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  color: #ffffff;
  padding-top: 3px;
}
.icon-dep {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADOSURBVHgB7ZbhDYIwEIXfOQEbyAiOwAa6gWyCm6gbuJEruEG9/rJprie2VzCkX3IJyXG8D0jaAo0CnHMD1wFr4IPdhwGZ7JBP+OZ7ZFIiYEITaAJN4L8FeIW7cE3IpGieB0/BUnsV+mPQPwv9W9A/4ld4qON6piQ0gSjcP6NHDn4wJZESMAv/JiEJmIdrErFAtXBFQrvuUQNBIqZe+AyJ+uGKxHLhgsTy4ZuCUg3+rCPseBHRY/bdHD45e8RdcfXzgPYL/BbawSqI6I6GwBvYQxOpSQ1rSQAAAABJRU5ErkJggg==);
}
.icon-wit {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADbSURBVHgB7ZbhDcIgEIUfjQN0BEfoBnYDR9BNiqO4gZvoBo5gN8AzwUgNh6Sc8Oe+hIQekPeVpqWAUoBzbqQ2oAUUbN0Hi5p8hdeVYMLrSPwI/69EJPzK9OUlIuETtWNwffA1eYlYuK8vBHxNVoIL5wREJWjhwIWnBBiJkcvpeAX0Qd8aY07IxM+1QemBNfhd2DFj7A7krH+zSQ3SndxQQM76Do1RARVQASmBGbWhL1xP7e7bFspKDDfwOmwgx0znwiV7duQ8l2CKZTV/DVOPYI/lT0lZkDFnKBGeR+EA89rvgRAAAAAASUVORK5CYII=);
}
.icon-wal {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFiSURBVHgB7VeLbYMwED0iBugI3qDpBPEG7QZlg3SD0gnaTgDZoBs0I7QTwAbNBu5zMeKCHIOqOxQpedLpDBzcw/eTiS4dWeymc85AWZJBm2XZfpYlHN9APp08Gv/tOQQqp4fnmM+cOTdQRb9tkJJkUAdtklYg8MDYPpIQ2Der2PMVW/MYWVoaYFg4fTR+p7nfFS0LA6kcq4j8hOEH5EDyzi11ob6H7JIE0Dx2JAgfYork1tIhoLMjkJMSQqJZGsp7M/VCIdWI8P4T5GeiHP+IiYcgJNsrHTe2MQxk6xcaIdiydUndXOGoGQkVAuugfSm/jB9ih2p+rVEFfQOzrpuwSWgQeAva50Azzj5md9Ai8A75mmknnwOIu/+zu1ANvPYNDa24hF2rQoARqWnI+PEsaPv711nAQ7Bn6xJblpEsNpMWTudMEMP6FAF/MKmcLo7OB6mj2S2lB8p/8I3qmNMjLgi/AVeavkAHJygAAAAASUVORK5CYII=);
}
</style>
