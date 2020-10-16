<script>
/* eslint-disable */
export default {
  name: "Catalog",
  components: {
    ItemCard: () => import('../../components/shop/ItemCard')
  },
  computed: {
    catalog() {
      return this.$store.state.artist.catalog;
    },
  },
};
</script>

<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <ItemCard
      v-for="item in catalog"
      :key="item.title + item.artist"
      :item="item"
    />
  </div>
</template>

<style lang="scss">
</style>
