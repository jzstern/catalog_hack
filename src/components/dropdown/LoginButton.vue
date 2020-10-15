<script>
/* eslint-disable */

export default {
  name: "LoginButton",
  methods: {
    login() {
      this.$store.commit("sidebarComponent", "Login");
    },
  },
};
</script>

<template>
  <div class="login-button" @click="login">login</div>
</template>

<style lang="scss">
.login-button {
  color: #ffcf2e;
  font-size: 14px;
  padding-right: 24px;
}
</style>