<template>
  <div class="login">
    <label>Email</label>
    <br />
    <input v-model="email" type="email" />
    <br />
    <label>Password</label>
    <br />
    <input v-model="password" type="password" />
    <br />
    <button class="buttonPrimary" @click="login">Login</button>
    <br />
    <br />
    <button class="buttonSecondary" @click="register">Register</button>
    <br />
    <br />
    <button class="buttonSecondary" @click="artists">Back to artists</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Login",
  data: () => ({
    email: null,
    password: null,
  }),
  methods: {
    artists() {
      this.$store.commit("sidebarComponent", "Browse Artists");
    },
    login() {
      this.$store.commit("login", email, password);
    },
    register() {
      this.$store.commit("sidebarComponent", "Register");
    },
  },
};
</script>

<style lang="scss">
.login {
  // display: block !important;
  padding: 0px 24px;
}
</style>