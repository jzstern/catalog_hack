<template>
  <div class="item-sidebar">
    <p>{{ item.title }}</p>
    <p>{{ item.artist }}</p>
    <p>{{ item.desription }}</p>
    <p>{{ item.price }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.sidebar.item
    }
  }
}
</script>

<style lang="scss">
</style>