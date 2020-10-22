<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  name: "DropdownMenu",
  computed: mapState({
    connected: (state) => state.ethers.address,
    sidebar: "sidebar",
    user: "user",
  }),
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

<template>
  <div class="dropdown-menu no-select">
    <div @click="toggleDropdown()" class="menu-item">
      {{ user.name }}
      <img
        v-show="!expanded"
        class="dropdown-icon"
        src="@/assets/other/dropDown.svg"
      />
      <img
        v-show="expanded"
        class="dropdown-icon"
        src="@/assets/other/dropUp.svg"
      />
    </div>

    <transition name="fade" mode="in-out">
      <div class="expanded" v-show="expanded">
        <div class="menu-item">
          <router-link :to="`/${this.user.handle}`">my catalog</router-link>
        </div>
        <!-- <div class="menu-item">
        <router-link :to="`/${this.user.handle}/collection`">
          Collection
        </router-link>
      </div> -->
        <div
          class="menu-item"
          @click="openSidebar('User Dashboard')"
          v-if="connected"
        >
          my dashboard
        </div>
        <div class="menu-item" @click="openSidebar('Upload')">upload</div>
        <div class="menu-item" @click="openSidebar('Account')">account</div>
        <div
          class="menu-item"
          @click="$store.dispatch('ethers/login')"
          v-if="!connected"
        >
          connect 🦊
        </div>
      </div>
    </transition>
  </div>
</template>

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
  padding: 8px 16px 12px 16px;
  box-sizing: border-box;
  &:hover {
    box-sizing: border-box;

    // border: 1px solid rgba(255, 255, 255, 0.1);
    // border-radius: 4px;
    background-color: rgba(87, 87, 87, 0.1);
  }
}
</style>