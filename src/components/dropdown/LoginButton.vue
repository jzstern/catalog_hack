<script>
/* eslint-disable */

export default {
  name: "LoginButton",
  components: {
    Sidebar: () => import("../../components/sidebar/Sidebar"),
  },
  computed: {
    onLogin() {
      if (
        this.$store.state.sidebar.component === "Login" ||
        this.$store.state.sidebar.component === "Register"
      )
        return true;
    },
  },
  methods: {
    login() {
      this.$store.commit("sidebarComponent", "Login");
    },
  },
};
</script>

<template>
  <div :class="['login-button', { disable: onLogin }]" @click="login">
    log in or register
  </div>
</template>

<style lang="scss">
.login-button {
  color: #f2ba00;
  font-size: 13px;
  padding: 10px 24px;

  &:hover {
    text-decoration: underline;
  }
}

.disable {
  // color: cyan;
  opacity: 0.5;
  text-decoration: line-through;
  cursor: default;
  &:hover {
    text-decoration: line-through;
  }
}
</style>