<script>
/* eslint-disable */
export default {
  name: "Sidebar",
  components: {
    Account: () => import("./Account"),
    ArtistList: () => import("./ArtistList"),
    Login: () => import("./Login"),
    Purchase: () => import("./Purchase"),
    Receipt: () => import("./Receipt"),
    Register: () => import("./Register"),
    Track: () => import("./Track"),
    Upload: () => import("./Upload"),
    UploadComplete: () => import("./UploadComplete"),
    UserDashboard: () => import("./UserDashboard"),
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    },
    onHome() {
      return this.$route.path === "/";
    },
  },
  methods: {
    closeSidebar() {
      if (this.$route.path === "/") {
        this.$store.commit("sidebarComponent", "Artist List");
      } else this.$store.commit("closeSidebar");
    },
  },
};
</script>

<template>
  <div :class="['sidebar', { sidebarHome: onHome }]">
    <div class="header no-select">
      <h1 class="title">
        {{ sidebar.component }}
      </h1>
      <img
        v-if="this.sidebar.component !== 'Artist List'"
        @click="closeSidebar"
        class="close"
        src="../../assets/other/close.svg"
      />
    </div>
    <div class="sidebar-content">
      <transition name="slide" mode="out-in">
        <Account v-if="sidebar.component === 'Account'" />
        <ArtistList v-else-if="sidebar.component === 'Artist List'" />
        <Track v-else-if="sidebar.component === 'Track Info'" />
        <Login v-else-if="sidebar.component === 'Login'" />
        <Purchase v-else-if="sidebar.component === 'Purchase'" />
        <Receipt v-else-if="sidebar.component === 'Receipt'" />
        <Register v-else-if="sidebar.component === 'Register'" />
        <Upload v-else-if="sidebar.component === 'Upload'" />
        <UploadComplete v-else-if="sidebar.component === 'Upload Complete'" />
        <UserDashboard v-else-if="sidebar.component === 'User Dashboard'" />
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
// @import "../../styles/global.scss";

.close {
  width: 40px;
  opacity: 0.3;
  transition: transform 6s ease-in;
  cursor: url("../../assets/other/cursor.png"), pointer;

  &:hover {
    transform: rotate(3600deg);
    transition: transform 30s ease-in;
    opacity: 1;
    will-change: transform;
  }

  &:before {
    transition: transform 30s ease-in;
  }
}

.logo {
  margin: 0px 16px 0px 24px;
  opacity: 0.8;
  width: 24px;
}

.header {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  box-sizing: border-box;
  border-bottom: 1px solid #666666;
  z-index: 200;
  flex-shrink: 0;
  padding: 0 32px;
  backdrop-filter: blur(12px) brightness(25%);
}

.title {
  font-family: "TenorSans", sans-serif;
  font-size: 22px;
  vertical-align: middle;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.sidebar-content {
  flex-shrink: 1;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  -webkit-user-drag: none;
}

.sidebar {
  position: fixed;
  width: 30%;
  flex-shrink: 2;
  // min-width: 500px;
  // flex: initial;
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 400;
  background-color: black;
  // height: 100%;
  // border-left: 1px solid #666666;
  height: 95%;
  border: 1px solid #666666;
  align-self: center;
  margin-right: 2%;
  // -webkit-box-shadow: 0 10px 6px -6px rgb(42, 42, 42);
  // -moz-box-shadow: 0 10px 6px -6px rgb(42, 42, 42);
  // box-shadow: 0 10px 6px -6px rgb(42, 42, 42);
}

.sidebarHome {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  background-color: transparent;
  border-left: 1px solid #666666;
  border-top: transparent;
  border-right: transparent;
  border-bottom: transparent;
  margin-right: 0;
}
</style>