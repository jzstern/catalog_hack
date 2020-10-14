<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    },
    collection: {
      required: false,
      type: Boolean,
      default: false
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
    <p v-if="!collection">
      {{ item.price ? `$${item.price}` : "Name your price" }}
    </p>
  </div>
</template>

<style lang="scss">
.item {
  border: 1px solid gray;
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
}
</style>