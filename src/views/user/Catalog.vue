<script>
/* eslint-disable */
import { mapState } from 'vuex'

export default {
  name: "Catalog",
  components: {
    ItemCard: () => import("../../components/shop/ItemCard"),
  },
  watch: {
    userCatalog(newVal) {
      if (this.userHandle === this.$route.path.substr(1, this.$route.path)) {
        this.$store.commit("artistCatalog", newVal);
      }
    },
  },
  computed: mapState({
    catalog: state => state.artist.catalog,
    handle: state => state.user.handle,
    loading: state => state.artist.loading.catalog,
    userCatalog: state => state.user.catalog,
  })
};
</script>

<template>
  <div class="catalog">
    <img v-if="loading" class="loader" src="../../assets/other/catalog.svg" />
    <h1 v-else-if="!catalog.length" class="no-tracks">no tracks to display</h1>
    <ItemCard v-else v-for="item in catalog" :key="item._id" :item="item" />
  </div>
</template>

<style lang="scss">
.catalog {
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
