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
      return this.$store.state.artist.loading.collection;
    },
  },
};
</script>

<template>
  <div class="collection">
    <h1 v-if="loading">loading...</h1>
    <h1 v-else-if="!collection.length" class="no-tracks">
      no tracks to display
    </h1>
    <ItemCard v-else v-for="item in collection" :key="item._id" :item="item" />
  </div>
</template>

<style lang="scss">
.collection {
  // position: relative;
  margin: 10% auto 128px auto;
  width: 84%;
  // border: 5vw solid transparent;
  box-sizing: border-box;

  display: grid;
  grid-auto-flow: row;
  grid-gap: 35px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto, auto);
  z-index: 200;
}
</style>
