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
    <div v-if="catalog">
      <ItemCard
        v-for="item in catalog"
        :key="item._id"
        :item="item"
      />
    </div>
  </div>
</template>

<style lang="scss">
</style>
