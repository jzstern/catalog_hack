<script>
export default {
  name: 'Collection',
  components: {
    Item: () => import('../../components/shop/Item')
  },
  computed: {
    collection() {
      return this.$store.state.user.collection
    }
  }
}
</script>

<template>
  <div class="collection">
    <h1>Collection</h1>
    <Item
      v-for="item in collection"
      :key="item.title + item.artist"
      :item="item"
    />
  </div>
</template>

<style lang="scss">
</style>
