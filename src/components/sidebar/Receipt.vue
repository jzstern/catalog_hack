<template>
  <div class="receipt">
    <p>Here's what you paid</p>
    <p>${{ item.price }}</p>

    <button @click="close">
      Close
    </button>
  </div>
</template>

<script>
export default {
  name: "Receipt",
  computed: {
    item() {
      return this.$store.state.sidebar.item
    }
  },
  methods: {
    close() {
      this.$store.commit('closeSidebar')
    }
  }
}
</script>

<style lang="scss">

</style>