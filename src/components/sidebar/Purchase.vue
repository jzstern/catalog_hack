<template>
  <div class="purchase">
    <p>{{ item.title }}</p>
    <p>{{ item.artist }}</p>
    <p>${{ item.price }}+</p>
    <input
      v-model="payment"
      type="number"
    >
    <p>Include message</p>
    <input
      v-model="message"
      type="Text"
    >
    <button @click="purchaseItem">
      Purchase
    </button>
    <button @click="back">
      Go back
    </button>
  </div>
</template>

<script>
export default {
  name: "Purchase",
    data: () => ({
    payment: null,
    message: null
  }),
  computed: {
    item() {
      return this.$store.state.sidebar.item
    }
  },
  methods: {
    back() {
      this.$store.commit('sidebar', {
        component: "Item",
        item: this.item
      })
    },
    purchaseItem() {
      const purchase = {
          ...this.item,
          price: this.payment
        }
      this.$store.commit("addToCollection", purchase)
      this.$store.commit('sidebar', {
        component: "Receipt",
        item: purchase
      })
    }
  }
}
</script>

<style style="scss">

</style>