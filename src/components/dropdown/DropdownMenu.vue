<template>
  <div class="dropdown-menu">
    <div @click="toggleDropdown()" class="menu-item">
      {{ user.name }}
      <img class="dropdown-icon" src="@/assets/other/dropDown.svg" />
    </div>

    <div class="expanded" v-show="expanded">
      <div class="menu-item">
        <router-link :to="`/${this.user.handle}`">my catalog</router-link>
      </div>
      <!-- <div class="menu-item">
        <router-link :to="`/${this.user.handle}/collection`">
          Collection
        </router-link>
      </div> -->
      <div class="menu-item" @click="openSidebar('Upload')">upload</div>
      <div class="menu-item" @click="openSidebar('Account')">account</div>
    </div>
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
  data: () => ({
    expanded: false,
  }),
  methods: {
    openSidebar(component) {
      this.$store.commit("sidebarComponent", component);
    },
    toggleDropdown() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style lang="scss">
.dropdown-icon {
  padding-left: 4px;
}

.dropdown-menu {
  background-color: rgb(16, 16, 16);
  opacity: 0.5;
  border-radius: 4px;

  &:hover {
    opacity: 1;
  }
}

.menu-item {
  color: #f2ba00;
  padding: 8px 16px;
  box-sizing: border-box;
  &:hover {
    box-sizing: border-box;

    // border: 1px solid rgba(255, 255, 255, 0.1);
    // border-radius: 4px;
    background-color: rgba(87, 87, 87, 0.1);
  }
}
</style>