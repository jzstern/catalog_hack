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
  },
  async mounted() {
    this.$store.dispatch("initAudius");
    this.$store.dispatch("initTextile");
    // this.$store.dispatch("ethers/init");
  }
};
</script>

<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in"> -->
    <Sidebar v-if="showSideBar" />
    <!-- </transition> -->
    <transition name="fade" mode="out-in">
      <Dropdown />
    </transition>
    <div class="content">
      <router-view />
    </div>
    <!-- <Home class="content"/> -->
  </div>
</template>

<style lang="scss">
@import "./styles/global.scss";

@font-face {
  font-family: "Tenor Sans";
  src: url("./assets/fonts/TenorSans-Regular.ttf") format("ttf");
}
@font-face {
  font-family: "Inconsolata-Light";
  src: url("./assets/fonts/InconsolataSemiExpanded-Light.ttf");
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
  font-family: "Inconsolata-ExtraExpanded-Black";
  src: url("./assets/fonts/InconsolataExtraExpanded-Black.ttf");
}

#app {
  font-family: Inconsolata, Helvetica, sans-serif;
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
