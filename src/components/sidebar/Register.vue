<template>
  <div class="register">
    <div class="form-item">
      <label>Email</label>
      <input
        v-model="email"
        type="email"
      >
    </div>

    <div class="form-item">
      <label>Password</label>
      <input
        v-model="password"
        type="password"
      >
    </div>

    <div class="form-item">
      <label>Display Name</label>
      <input
        v-model="name"
        type="text"
      >
    </div>

    <div class="form-item">
      <label>Handle</label>
      <input
        v-model="handle"
        type="text"
      >
    </div>

    <button
      class="buttonPrimary"
      @click="register"
    >
      Register
    </button>

    <button
      class="buttonSecondary"
      @click="login"
    >
      Log in
    </button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Login",
  data: () => ({
    email: null,
    handle: null,
    name: null,
    password: null,
  }),
  methods: {
    artists() {
      this.$store.commit("sidebarComponent", "Artist List");
    },
    login() {
      this.$store.commit("sidebarComponent", "Login");
    },
    register() {
      this.$store.dispatch("register", { email, password, handle, name });
    },
  },
};
</script>

<style lang="scss">
.register {
  padding: 32px;
}
</style>