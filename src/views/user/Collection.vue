<template>
  <div class="collection">
    <h1>Collection</h1>
  </div>
</template>

<script>
export default {
  name: 'Collection',
  computed: {
    catalog() {
      return this.$store.state.user.collection;
    }
  }
  // data: () => ({ })
};
</script>

<style lang="scss">
</style>
