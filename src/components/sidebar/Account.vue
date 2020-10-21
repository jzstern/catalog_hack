<script>
/* eslint-disable */
import { mapState } from "vuex"

export default {
  name: "Account",
  computed: {
    formattedWalletAddr() {
      return (this.user.wallet_addr.substring(0, 4) + "..." + this.user.wallet_addr.substring(this.user.wallet_addr.length - 4))
    },
    ...mapState({
      user: "user",
      balanceDai: state => state.ethers.balanceDai,
      balanceEth: state => state.ethers.balance,
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    async mintDai() {
      await this.$store.dispatch('ethers/mintDai')
      alert('minted 100 fake DAI')
    },
  },
};
</script>

<template>
  <div class="account">
    <div class="account-item">
      <label>Name</label>
      <p class="field">{{ user.name }}</p>
    </div>
    <div class="account-item">
      <label>Email</label>
      <p class="field">{{ user.email }}</p>
    </div>
    <div class="account-item">
      <label>Wallet Address</label>
      <p class="field">
        {{ formattedWalletAddr }}
      </p>
    </div>
    <div class="account-item">
      <label>Handle</label>
      <p class="field">{{ user.handle }}</p>
    </div>
    <div class="account-item mint">
      <label @click="mintDai">Dai Balance (click to mint)</label>
      <p class="field">{{ balanceDai }}</p>
    </div>
    <div class="account-item">
      <label>ETH Balance</label>
      <p class="field">{{ balanceEth }}</p>
    </div>

    <br />
    <button class="buttonSecondary" @click="logout">Log out</button>

    <!-- <h4>Songs owned:</h4>
    <h4>{{ user.collection.length }}</h4>

    <h4>Songs uploaded:</h4>
    <h4>{{ user.catalog.length }}</h4> -->
  </div>
</template>

<style lang="scss">
.field {
  margin-top: 8px;
}

.account-item {
  padding: 16px 0 12px 0;
}

.account {
  font-family: Inconsolata;
  padding: 16px 32px;
  // width: 100%;
}

.mint {
  cursor: url("../../assets/other/cursor.png"), pointer;

  &:hover {
    color: #f2ba00;
  }
}
</style>