// stores/walletStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { TonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui'

export const useWalletStore = defineStore('wallet', () => {
  const tonConnectUI = ref<TonConnectUI | null>(null)
  const walletAddress = ref<string>('')
  const balance = ref<string>('0')
  const isLoading = ref(false)

  const isConnected = computed(() => !!walletAddress.value)

  const formatBalance = (nanoTons: string) => {
    const tons = Number(nanoTons) / 1_000_000_000
    return tons.toFixed(2)
  }

  // Инициализация TonConnect
  const initTonConnect = async () => {
    if (tonConnectUI.value) return

    tonConnectUI.value = new TonConnectUI({
      manifestUrl: 'https://alien-crush.vercel.app/tonconnect-manifest.json',
      buttonRootId: null
    })

    tonConnectUI.value.onStatusChange(async (wallet) => {
      if (wallet) {
        walletAddress.value = wallet.account.address
        // await fetchBalance()
      } else {
        walletAddress.value = ''
        balance.value = '0'
      }
    })

    // Проверяем текущее подключение
    const currentWallet = tonConnectUI.value.wallet
    if (currentWallet) {
      walletAddress.value = currentWallet.account.address
    //   await fetchBalance()
    }
  }

  // Получение баланса
  const fetchBalance = async () => {
    if (!walletAddress.value) return

    try {
      isLoading.value = true
      
      // Используем TON API для получения баланса
      const response = await fetch(
        `https://tonapi.io/v2/accounts/${walletAddress.value}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch balance')
      }

      const data = await response.json()
      console.log('fetch data: ', data)
      balance.value = data.balance || '0'
    } catch (error) {
      console.error('Error fetching balance:', error)
      balance.value = '0'
    } finally {
      isLoading.value = false
    }
  }

  // Подключение кошелька
  const connect = async () => {
    if (!tonConnectUI.value) {
      await initTonConnect()
    }
    await tonConnectUI.value?.openModal()
  }

  // Отключение кошелька
  const disconnect = async () => {
    await tonConnectUI.value?.disconnect()
    walletAddress.value = ''
    balance.value = '0'
  }

  // Отправка транзакции
  const sendTransaction = async (to: string, amount: string) => {
    if (!tonConnectUI.value || !isConnected.value) {
      throw new Error('Wallet not connected')
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address: to,
          amount: amount // в nanotons
        }
      ]
    }

    try {
      const result = await tonConnectUI.value.sendTransaction(transaction)
      // После успешной транзакции обновляем баланс
      setTimeout(() => fetchBalance(), 3000)
      return result
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  }

  return {
    // State
    walletAddress,
    balance,
    isLoading,
    
    // Getters
    isConnected,
    formattedAddress: computed(() => toUserFriendlyAddress(walletAddress.value)),
    formattedBalance: computed(() => formatBalance(balance.value)),
    
    // Actions
    initTonConnect,
    connect,
    disconnect,
    fetchBalance,
    sendTransaction
  }
})