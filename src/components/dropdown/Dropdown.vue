<script>
export default {
  name: "DropdownContainer",
  components: {
    DropdownMenu: () => import("./DropdownMenu"),
    LoginButton: () => import("./LoginButton")
  },
  computed: {
    loggedIn() {
      return !!this.$store.state.user.name
    }
  }
}
</script>

<template>
  <div class="dropdown">
    <LoginButton v-if="!loggedIn" />
    <DropdownMenu v-else />
  </div>
</template>

<style lang="scss">
.dropdown {
  z-index: 300;
  position: fixed;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
</style>