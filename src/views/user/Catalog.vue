<script>
/* eslint-disable */
export default {
  name: "Catalog",
  components: {
    Item: () => import('../../components/shop/Item')
  },
  computed: {
    catalog() {
      return this.$store.state.user.catalog;
    },
  }
};
</script>

<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <Item
      v-for="item in catalog"
      :key="item.title + item.artist"
      :item="item"
    />
  </div>
</template>

<style lang="scss">
</style>
