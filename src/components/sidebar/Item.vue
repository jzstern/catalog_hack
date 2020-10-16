<template>
  <div class="item-sidebar">
    <p>{{ item.title }}</p>
    <p>{{ item.artist }}</p>
    <p>{{ item.desription }}</p>
    <p>{{ item.price }}</p>

    <p v-if="ownedByUser">
      You own this 💪🏼
    </p>
    <button
      v-else
      @click="purchaseItem"
    >
      Purchase
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.sidebar.item
    },
    ownedByUser() {
      return this.$store.state.user.collection.find(item => item.id === this.item.id)
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