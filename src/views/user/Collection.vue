<script>
export default {
  /* eslint-disable */

  name: "Collection",
  components: {
    ItemCard: () => import("../../components/shop/ItemCard"),
  },
  computed: {
    collection() {
      return this.$store.state.artist.collection;
    },
    loading() {
      return this.$store.state.artist.loading.collection
    }
  },
};
</script>

<template>
  <div class="collection">
    <h1 v-if="loading">loading...</h1>
    <h1 v-else-if="!catalog.length">no tracks to display</h1>
    <ItemCard
      v-else
      v-for="item in collection"
      :key="item._id"
      :item="item"
    />
  </div>
</template>

<style lang="scss">
</style>
