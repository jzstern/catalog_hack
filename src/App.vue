<script>
/* eslint-disable */
import Audius from "@audius/libs";

export default {
  components: {
    Dropdown: () => import("./components/dropdown/Dropdown"),
    Sidebar: () => import("./components/sidebar/Sidebar"),
  },
  computed: {
    showSideBar() {
      return !!this.$store.state.sidebar.component;
    },
    user() {
      return this.$store.state.user;
    },
    onHome() {
      return this.$route.path === "/";
    },
  },
  beforeMount() {
    this.$store.dispatch("initTextile");
    this.$store.dispatch("initAudius");
    // this.$store.dispatch("ethers/init");
  },
};
</script>

<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <Sidebar v-if="showSideBar" />
    </transition>
    <transition name="fade" mode="out-in">
      <Dropdown />
    </transition>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "./styles/global.scss";

@font-face {
  font-family: "TenorSans";
  src: url(./assets/fonts/TenorSans-Regular.ttf);
}

@font-face {
  font-family: "Supply";
  src: url("./assets/fonts/Supply-Regular.otf");
}

@font-face {
  font-family: "Inconsolata";
  src: url("./assets/fonts/InconsolataSemiExpanded-Regular.ttf");
}
@font-face {
  font-family: "Inconsolata-SemiBold";
  src: url("./assets/fonts/InconsolataSemiExpanded-SemiBold.ttf");
}
@font-face {
  font-family: "Inconsolata-ExtraBold";
  src: url("./assets/fonts/InconsolataSemiExpanded-ExtraBold.ttf");
}

@font-face {
  font-family: "Syne";
  src: url("./assets/fonts/Syne-Bold.ttf");
}

@font-face {
  font-family: "SpaceGrotesk";
  src: url("./assets/fonts/SpaceGrotesk-Regular.ttf");
}

#app {
  font-family: "TenorSans", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  overflow-x: hidden;
}

body {
  background-color: black;
  margin: 0;
  overscroll-behavior: none;
  // overflow: hidden;
}
</style>
