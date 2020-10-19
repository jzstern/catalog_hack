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
      return this.$store.state.artist.loading.catalog;
    },
  },
};
</script>

<template>
  <div class="catalog">
    <img v-if="loading" class="loader" src="../../assets/other/catalog.svg" />
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

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10%;
  height: 10%;
  -webkit-animation: loadAnimation 2.5s infinite;
  -moz-animation: loadAnimation 2.5s infinite;
  -o-animation: loadAnimation 2.5s infinite;
  animation: loadAnimation 2.5s infinite;
}

// .item::before {
//   content: "";
//   display: block;
//   padding-top: 100%;
// }
</style>
