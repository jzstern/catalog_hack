<script>
/* eslint-disable */
import Audius from "@audius/libs";
export default {
  components: {
    Dropdown: () => import("./components/dropdown/Dropdown"),
    Home: () => import("./views/Home"),
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
  created() {
    // this.$store.dispatch("initAudius")
    // this.$store.dispatch("init")
    // this.$store.dispatch("ethers/init");
    // if (!this.userIsLoggedIn) this.$store.dispatch('checkMagicLogin')
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

a {
  text-decoration: none;
}

body {
  background-color: black;
  margin: 0;
  overscroll-behavior: none;
  // overflow: hidden;
}

label {
  opacity: 0.6;
  margin-bottom: 16px;
}

.buttonPrimary {
  font-family: Inconsolata-ExtraBold;
  height: 45px;
  background-color: #ffcf2e;
  color: black;
  // border: 1px solid #ffcf2e;
  width: 100%;
  cursor: url("./assets/other/cursor.png"), pointer;
}

.buttonSecondary {
  font-family: Inconsolata-ExtraBold;
  height: 45px;
  background-color: black;
  color: #ffcf2e;
  border: 1px solid #ffcf2e;
  width: 100%;
  cursor: url("./assets/other/cursor.png"), pointer;
}

input {
  font-family: Inconsolata;
  background-color: black;
  height: 45px;
  font-size: 16px;
  padding-left: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  color: white;
}

textarea:focus,
input:focus {
  outline: none;
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 0px;
  background-color: #666666;
  opacity: 0.4;
}

::-webkit-scrollbar-thumb {
  background-color: #a9a9a9;
  // opacity: 0.3;
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.content {
  position: relative;
  height: 100vh;
  flex: auto;
  // border-left: 2px solid #666666;
  box-sizing: border-box;
}
</style>
