<template>
  <div class="item-sidebar">
    <p>{{ item.title }}</p>
    <p>{{ item.artist }}</p>
    <p>{{ item.desription }}</p>
    <p>{{ item.price }}</p>

    <button @click="purchaseItem">
      Purchase
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.sidebar.item
    }
  },
  methods: {
    purchaseItem() {
      this.$store.commit('sidebar', {
        component: "Purchase",
        item: this.item
      })
    }
  }
}
</script>

<style lang="scss">
</style>