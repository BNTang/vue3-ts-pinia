<template>
  <div class="login">
    <h1>login</h1>
    <div>{{ counterStore.count }}</div>
    <button @click="handleIncrement">增加</button>
    <button @click="handleDecrement">减少</button>
  </div>
</template>

<script setup lang="ts">
import njRequest from '@/service'
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()
function handleIncrement() {
  counterStore.increment()
}
function handleDecrement() {
  counterStore.decrement()
}

njRequest
  .post({
    url: '/user/login'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style lang="less" scoped>
.login {
}
</style>
