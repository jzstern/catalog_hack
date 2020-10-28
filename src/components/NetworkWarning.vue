<template>
  <div class="network-warning">
    <p v-if="network === 'Mainnet'">
      DO NOT use Catalog on Mainnet. You will lose $
    </p>
    <p v-else>
      Catalog currently only works on Ropsten
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    network() {
      return this.$store.state.ethers.network
    }
  }
}
</script>

<style lang="scss">
.network-warning {
  position: absolute;
  z-index: 10000;
  top: 30px;
  left: 30px;
  // border: 1px sold red;
  // border-radius: 4px;
  // background-color: gray;
  font-family: "Supply", sans-serif;
}
</style>