<template>
  <div class="network-warning">
    <p v-if="network === 'Mainnet'">
      Do not use Catalog on Mainnet. You will lose money. Switch to Ropsten fam.
    </p>
    <p v-else>Catalog currently only works on Ropsten</p>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  computed: {
    network() {
      return this.$store.state.ethers.network;
    },
  },
};
</script>

<style lang="scss">
.network-warning {
  position: fixed;
  z-index: 10000;
  bottom: 100px;
  padding: 0px 32px;
  background-color: black;
  border: 2px solid red;
  border-radius: 100px;
  left: 50%;
  width: max-content;
  transform: translateX(-50%);
  // border: 1px sold red;
  // border-radius: 4px;
  // background-color: gray;
  font-family: "Supply", sans-serif;
}
</style>