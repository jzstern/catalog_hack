<script>
export default {
  /* eslint-disable */
  name: "Sidebar",
  components: {
    Account: () => import("./Account"),
    ArtistList: () => import("./ArtistList"),
    Item: () => import("./Item"),
    Login: () => import("./Login"),
    Purchase: () => import("./Purchase"),
    Receipt: () => import("./Receipt"),
    Register: () => import("./Register"),
    Settings: () => import("./Settings"),
    Upload: () => import("./Upload"),
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    },
  },
  methods: {
    closeSidebar() {
      this.$store.commit("closeSidebar");
    },
  },
};
</script>

<template>
  <div class="sidebar">
    <div class="header no-select">
      <img
        v-if="sidebar.component === 'Catalog'"
        class="logo"
        src="../../assets/other/catalog.svg"
      />
      <h1 class="title">
        {{ sidebar.component }}
      </h1>
      <button @click="closeSidebar">close</button>
    </div>
    <transition name="fade" mode="out-in">
      <Account v-if="sidebar.component === 'Account'" />
      <ArtistList v-else-if="sidebar.component === 'Browse Artists'" />
      <Item v-else-if="sidebar.component === 'Item'" />
      <Login v-else-if="sidebar.component === 'Login'" />
      <Purchase v-else-if="sidebar.component === 'Purchase'" />
      <Receipt v-else-if="sidebar.component === 'Receipt'" />
      <Register v-else-if="sidebar.component === 'Register'" />
      <Settings v-else-if="sidebar.component === 'Settings'" />
      <Upload v-else-if="sidebar.component === 'Upload'" />
    </transition>
  </div>
</template>

<style lang="scss">
@import "../../styles/global.scss";

.logo {
  margin: 0px 16px 0px 24px;
  opacity: 0.8;
  width: 24px;
}

.header {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: black;
  display: flex;
  align-items: center;
  height: 85px;
  box-sizing: border-box;
  border-bottom: 2px solid #666666;
  z-index: 200;
}

.title {
  font-family: "Tenor Sans", sans-serif;
  font-size: 22px;
  vertical-align: middle;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.sidebar {
  width: 24%;
  height: 100%;
  flex: initial;
  overflow: scroll;
  overflow-x: hidden;
}
</style>