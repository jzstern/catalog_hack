<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  methods: {
    selectItem() {
      this.$store.commit('sidebar', {
        component: "Item",
        item: this.item
      })
    }
  }
}
</script>

<template>
  <div
    class="item"
    @click="selectItem"
  >
    <p>{{ item.title }}</p>
    <p>{{ item.artist }}</p>
    <p>{{ item.description }}</p>
    <p>{{ item.price ? `$${item.price}` : "Name your price" }}</p>
  </div>
</template>

<style lang="scss">
.item {
  border: 1px solid gray;
}
</style>