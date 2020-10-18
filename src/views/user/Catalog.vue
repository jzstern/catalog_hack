<script>
/* eslint-disable */
export default {
  name: "Catalog",
  components: {
    ItemCard: () => import("../../components/shop/ItemCard"),
  },
  computed: {
    catalog() {
      return this.$store.state.artist.catalog;
    },
    loading() {
      return this.$store.state.artist.loading.catalog
    }
  },
};
</script>

<template>
  <div class="catalog">
    <h1 v-if="loading">loading...</h1>
    <ItemCard
      v-for="item in catalog"
      :key="item.title + item.artist"
      :item="item"
    />
  </div>
</template>

<style lang="scss">
.catalog {
  // position: relative;
  margin: 10% auto 0 auto;
  width: 85%;
  // border: 5vw solid transparent;
  box-sizing: border-box;

  display: grid;
  grid-auto-flow: row;
  grid-gap: 35px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto, auto);
  z-index: 200;
}

// .item::before {
//   content: "";
//   display: block;
//   padding-top: 100%;
// }
</style>
