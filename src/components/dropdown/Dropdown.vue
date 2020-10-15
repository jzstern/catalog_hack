<script>
/* eslint-disable */

export default {
  name: "DropdownContainer",
  components: {
    DropdownMenu: () => import("./DropdownMenu"),
    LoginButton: () => import("./LoginButton"),
  },
  computed: {
    loggedIn() {
      return !!this.$store.state.user.name;
    },
    onHome() {
      return this.$route.path === "/";
    },
  },
};
</script>

<template>
  <div :class="['dropdown', { dropdownHome: onHome }]">
    <LoginButton v-if="!loggedIn" />
    <DropdownMenu v-else />
  </div>
</template>

<style lang="scss">
.dropdown {
  z-index: 200;
  position: fixed;
  top: 15px;
  right: 15px;
  cursor: url("../../assets/other/cursor.png"), pointer;
}

.dropdownHome {
  top: 25px;
  right: 30%;
}
</style>