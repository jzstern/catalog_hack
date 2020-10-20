<script>
/* eslint-disable */
export default {
  name: "Catalog",
  components: {
    ItemCard: () => import("../../components/shop/ItemCard"),
  },
  watch: {
    userCatalog(newVal) {
      if (this.userHandle === this.$route.path.substr(1, this.$route.path)) {
        console.log(newVal);
        this.$store.commit('artistCatalog', newVal)
      }
    }
  },
  computed: {
    catalog() {
      return this.$store.state.artist.catalog;
    },
    loading() {
      return this.$store.state.artist.loading.catalog
    },
    userCatalog() {
      return this.$store.state.user.catalog
    },
    userHandle() {
      return this.$store.state.user.handle
    }
  },
};
</script>

<template>
  <div class="catalog">
    <h1 v-if="loading">loading...</h1>
    <h1 v-else-if="!catalog.length">no tracks to display</h1>
    <ItemCard
      v-else
      v-for="item in catalog"
      :key="item._id"
      :item="item"
    />
  </div>
</template>

<style lang="scss">
</style>
