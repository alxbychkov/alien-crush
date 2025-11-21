import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../views/Account.vue'),
    },
    {
      path: '/deposit',
      name: 'Deposit',
      component: () => import('../views/Deposit.vue'),
      // accept currency from query or params and forward as a prop
      props: (route) => ({ currency: route.query.currency || route.params.currency || 'NUCL' }),
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: () => import('../views/Withdraw.vue'),
      // accept currency from query or params and forward as a prop
      props: (route) => ({ currency: route.query.currency || route.params.currency || 'NUCL' }),
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: () => import('../views/Wallet.vue'),
    },
  ],
})

export default router
