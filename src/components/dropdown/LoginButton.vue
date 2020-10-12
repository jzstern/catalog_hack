<template>
  <div
    class="login-button"
    @click="login"
  >
    Login / Register
  </div>
</template>

<script>
export default {
  name: "LoginButton",
  methods: {
    login() {
      this.$store.commit('sidebar', 'Login')
    }
  }
}
</script>

<style lang="scss">
.login-button {
  &:hover {
    opacity: 50%;
  }
}

</style>