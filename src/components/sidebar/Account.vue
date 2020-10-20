<script>
/* eslint-disable */

export default {
  name: "Account",
  computed: {
    formattedWalletAddr() {
      return (this.user.wallet_addr.substring(0, 4) + "..." + this.user.wallet_addr.substring(this.user.wallet_addr.length - 4))
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<template>
  <div class="account">
    <div class="form-item">
      <label>Name</label>
      <p class="field">{{ user.name }}</p>
    </div>
    <div class="form-item">
      <label>Email</label>
      <p class="field">{{ user.email }}</p>
    </div>
    <div class="form-item">
      <label>Wallet Address</label>
      <p class="field">
        {{ formattedWalletAddr }}
      </p>
    </div>
    <div class="form-item">
      <label>Handle</label>
      <p class="field">{{ user.handle }}</p>
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

.account {
  font-family: Inconsolata;
  padding: 0 32px;
  // width: 100%;
}

// .form-item {
//   margin: 32px 0;
//   letter-spacing: 0.05em;
//   font-size: 16px;
// }
</style>