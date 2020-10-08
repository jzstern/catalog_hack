<template>
  <div class="catalog">
    <h1>Catalog</h1>
  </div>
</template>

<script>
export default {
  name: 'Catalog',
  computed: {
    catalog() {
      return this.$store.state.user.catalog;
    }
  }
  // data: () => ({ })
};
</script>

<style lang="scss">
</style>
