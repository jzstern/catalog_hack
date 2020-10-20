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
  font-family: "Supply", sans-serif;
  font-weight: 400;
  font-size: 14px;
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 300;
  cursor: url("../../assets/other/cursor.png"), pointer;
}

.dropdownHome {
  top: 25px;
  right: 31%;
}
</style>