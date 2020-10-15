<script>
export default {
  /* eslint-disable */

  name: "Collection",
  components: {
    Item: () => import("../../components/shop/Item"),
  },
  computed: {
    collection() {
      return this.$store.state.user.collection;
    },
  },
};
</script>

<template>
  <div class="collection">
    <Item
      v-for="item in collection"
      :key="item.title + item.artist"
      :item="item"
      collection
    />
  </div>
</template>

<style lang="scss">
</style>
