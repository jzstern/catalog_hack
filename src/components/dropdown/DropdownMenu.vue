<template>
  <div class="dropdown-menu">
    <div
      class="menu-item"
      @click="goToUserCatalog"
    >
      {{ user.name }}
    </div>
    <div
      class="menu-item"
      @click="openSidebar('Account')"
    >
      Account
    </div>
    <div
      class="menu-item"
      @click="openSidebar('Upload')"
    >
      Upload
    </div>
  </div>
</template>

<script>
import router from "../../router/index"

export default {
  name: "DropdownMenu",
  computed: {
    sidebar() {
      return this.$store.state.sidebar
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    goToUserCatalog() {
      router.push(`/${this.user.url}`)
    },
    openSidebar(component) {
      this.$store.commit('sidebarComponent', component)
    }
  }
}
</script>

<style lang="scss">
.dropdown-menu {
  background-color: darkblue;
}

.menu-item {
  &:hover {
    opacity: 50%;
  }
}
</style>