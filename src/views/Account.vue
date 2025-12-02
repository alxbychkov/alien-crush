<script setup>
import Card from '@/components/account/Card.vue'
import ActionItem from '@/components/common/ActionItem.vue'
import SectionComponent from '@/components/common/SectionComponent.vue'
import TransactionItem from '@/components/common/TransactionItem.vue'
import ViewHead from '@/components/common/ViewHead.vue'
import Footer from '@/components/common/Footer.vue'
</script>

<template>
  <ViewHead title="Account" description="Manage your balance and transactions" />

  <Card currency="NUCL" :actions="true" />
  <Card currency="TON" :actions="true" />

  <SectionComponent title="Quick Actions">
    <ActionItem title="Transaction History" icon="icon-right" />
    <ActionItem title="Open Main Nucleus Bot" icon="icon-link" />
  </SectionComponent>

  <SectionComponent title="Recent Transactions">
    <TransactionItem
      type="deposit"
      currency="NUCL"
      amount="50.00 NUCL"
      time="2 hours ago"
      status="Completed"
    />
    <TransactionItem
      type="withdraw"
      currency="TON"
      amount="25.50 TON"
      time="5 hours ago"
      status="Completed"
    />
    <TransactionItem
      type="deposit"
      currency="NUCL"
      amount="100.00 NUCL"
      time="1 day ago"
      status="Completed"
    />
  </SectionComponent>

  <Footer />
</template>
