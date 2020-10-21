<script>
/* eslint-disable */
export default {
  name: "UserDashboard",
  computed: {
    ethers() {
      return this.$store.state.ethers
    },
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<template>
  <div class="user-dashboard">
    <label>Claimable tokens</label>
  </div>
</template>

<style lang="scss">
.user-dashboard {

}
</style>