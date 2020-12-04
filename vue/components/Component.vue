<template>
  <div class="hello">
    <button @click="store.count -= 1">-</button>
    <button @click="store.count += 1">+</button>
    ({{ store.count }})
  </div>
</template>

<script>
export default {
  name: 'Component',
  inject: ['store']
}
</script>

<style scoped>
</style>
