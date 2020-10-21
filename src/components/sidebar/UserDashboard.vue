<script>
/* eslint-disable */
import { mapState } from "vuex"

export default {
  name: "UserDashboard",
  computed: {
    formattedWalletAddr() {
      return (this.user.wallet_addr.substring(0, 4) + "..." + this.user.wallet_addr.substring(this.user.wallet_addr.length - 4))
    },
    ...mapState({
      balanceDai: state => state.ethers.balanceDai,
      balanceEth: state => state.ethers.balance,
      user: "user"
    })
  },
  methods: {
    async mintDai() {
      await this.$store.dispatch('ethers/mintDai')
      alert('minted 100 totally not fake DAI')
    },
  }
}
</script>

<template>
  <div class="user-dashboard">
    <div class="account-item mint">
      <label @click="mintDai">Dai Balance (click to mint)</label>
      <p class="field">{{ balanceDai }}</p>
    </div>

    <div class="account-item">
      <label>ETH Balance</label>
      <p class="field">{{ balanceEth }}</p>
    </div>

    <label>Claimable tokens</label>
  </div>
</template>

<style lang="scss">
.user-dashboard {
  font-family: Inconsolata;
  padding: 16px 32px;
}

.account-item {
  padding: 16px 0 12px 0;
}

.field {
  margin-top: 8px;
}
</style>