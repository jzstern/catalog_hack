<script>
/* eslint-disable */

export default {
  name: "Account",
  computed: {
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
        {{ user.walletAddress.substr(user.walletAddress.length - 12) }}
      </p>
    </div>
    <div class="account-item">
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

.account-item {
  padding: 16px 0 12px 0;
}

.account {
  font-family: Inconsolata;
  padding: 16px 32px;
  // width: 100%;
}
</style>