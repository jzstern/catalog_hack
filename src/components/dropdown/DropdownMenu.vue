<template>
  <div class="dropdown-menu">
    <div class="menu-item" @click="goToUserCatalog">
      {{ user.name }}
      <img class="dropdown-icon" src="../../assets/other/dropDown.svg" />
    </div>
    <div class="menu-item">
      <router-link :to="'/'"> Home </router-link>
    </div>
    <div class="menu-item" @click="openSidebar('Account')">Account</div>
    <div class="menu-item" @click="openSidebar('Upload')">Upload</div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "DropdownMenu",
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    goToUserCatalog() {
      this.$router.push(`/${this.user.handle}`);
    },
    openSidebar(component) {
      this.$store.commit("sidebarComponent", component);
    },
  },
};
</script>

<style lang="scss">
.dropdown-icon {
  padding: 0px 4px 0px 8px;
}

.dropdown-menu {
  background-color: rgb(16, 16, 16);

  opacity: 0.3;
  // padding: 12px;
  border-radius: 4px;

  &:hover {
    opacity: 1;
  }
}

.menu-item {
  color: #f2ba00;
  padding: 8px 16px;
  &:hover {
    background-color: rgba(87, 87, 87, 0.1);
  }
}
</style>