<script>
export default {
  /* eslint-disable */

  name: "Collection",
  components: {
    ItemCard: () => import('../../components/shop/ItemCard')
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
    <h1>Collection</h1>
    <ItemCard
      v-for="item in collection"
      :key="item.title + item.artist"
      :item="item"
      collection
    />
  </div>
</template>

<style lang="scss">
</style>
