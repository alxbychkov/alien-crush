<script setup lang="ts">
import ViewHead from '@/components/common/ViewHead.vue'
import { ref, computed, onMounted } from 'vue'

let tonConnectUI = null
const walletAddress = ref<string>('')
const isConnected = computed(() => !!walletAddress.value)

const walletActionHandler = async () => {
  await connectToWallet()
}

const connectToWallet = async () => {
  if (!tonConnectUI) {
    await initTonConnect()
  }
  await tonConnectUI.openModal()
}

const initTonConnect = async () => {
  const { TonConnectUI, toUserFriendlyAddress } = await import('@tonconnect/ui')

  tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://alien-crush.vercel.app/tonconnect-manifest.json',
  })

  tonConnectUI.onStatusChange((walletInfo) => {
    console.log('onStatusChange', { walletInfo })

    if (walletInfo === null) {
      // isConnected.value = false
    }

    if (walletInfo && walletInfo.account) {
      walletAddress.value = toUserFriendlyAddress(walletInfo.account.address)
    }
  })
}

onMounted(async () => {
  await initTonConnect()
})
</script>

<template>
  <div class="wallet-wrapper">
    <div class="wallet-logo">
      <img src="@/assets/wallet_logo.webp" alt="TON" />
    </div>

    <ViewHead title="Connect Your TON WALLET" class="wallet-title" />

    <div class="wallet-list">
      <div class="wallet-list-item">
        <div class="item-number">1</div>
        <div class="item-body">
          <div class="item-title">Open TON Wallet</div>
          <div class="item-description">Make sure you have TON Wallet installed on your device</div>
        </div>
      </div>

      <div class="wallet-list-item">
        <div class="item-number">2</div>
        <div class="item-body">
          <div class="item-title">Authorize Connection</div>
          <div class="item-description">Confirm the connection request in your wallet app</div>
        </div>
      </div>

      <div class="wallet-list-item">
        <div class="item-number">3</div>
        <div class="item-body">
          <div class="item-title">Start Playing</div>
          <div class="item-description">
            Once connected, you can deposit and withdraw TON tokens
          </div>
        </div>
      </div>
    </div>

    <div class="wallet-button" @click="walletActionHandler">
      <span class="button-icon icon-wal"></span>
      <span>{{ isConnected ? `Disconnect ${walletAddress}` : 'Connect TON Wallet' }}</span>
    </div>

    <div class="wallet-info">
      <p>Your wallet address will never be shared</p>
      <p>Transaction fees apply for deposits and withdrawals</p>
    </div>
  </div>
</template>

<style scoped>
.wallet-list {
  border-radius: 30px;
  overflow: hidden;
  background-image: url(@/assets/wallet_card_bg.webp);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.wallet-list-item {
  padding: 30px 30px 25px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.wallet-list-item:not(:last-child) {
  border: 1px solid rgba(60, 59, 87, 0.6);
}
.item-number {
  min-width: 35px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #a65eed;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  font-family: 'MikroSuper', sans-serif;
  font-weight: 800;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
}
.item-body {
}
.item-title {
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
  color: #ffffff;
}
.item-description {
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.4);
}

.wallet-button {
  width: 100%;
  height: 56px;
  background: linear-gradient(90deg, #c96ef7 100%, #a65eed 0%);
  box-shadow:
    0px 0px 20px rgba(179, 102, 255, 0.1),
    0px 0px 40px rgba(179, 102, 255, 0.3),
    0px 0px 20px rgba(179, 102, 255, 0.6);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wallet-info {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 21px;
}
.wallet-wrapper {
  position: relative;
  z-index: 1;
}
.wallet-logo {
  width: max-content;
  margin: 0 auto;
  display: flex;
  margin-bottom: 5px;
}
.wallet-logo img {
  width: 225px;
  height: auto;
}
.wallet-title {
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 44px;
}
.wallet-list {
}
.button-icon {
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 18px;
}
.icon-wal {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFiSURBVHgB7VeLbYMwED0iBugI3qDpBPEG7QZlg3SD0gnaTgDZoBs0I7QTwAbNBu5zMeKCHIOqOxQpedLpDBzcw/eTiS4dWeymc85AWZJBm2XZfpYlHN9APp08Gv/tOQQqp4fnmM+cOTdQRb9tkJJkUAdtklYg8MDYPpIQ2Der2PMVW/MYWVoaYFg4fTR+p7nfFS0LA6kcq4j8hOEH5EDyzi11ob6H7JIE0Dx2JAgfYork1tIhoLMjkJMSQqJZGsp7M/VCIdWI8P4T5GeiHP+IiYcgJNsrHTe2MQxk6xcaIdiydUndXOGoGQkVAuugfSm/jB9ih2p+rVEFfQOzrpuwSWgQeAva50Azzj5md9Ai8A75mmknnwOIu/+zu1ANvPYNDa24hF2rQoARqWnI+PEsaPv711nAQ7Bn6xJblpEsNpMWTudMEMP6FAF/MKmcLo7OB6mj2S2lB8p/8I3qmNMjLgi/AVeavkAHJygAAAAASUVORK5CYII=);
}
</style>
