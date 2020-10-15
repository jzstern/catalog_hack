<script>
/* eslint-disable */
export default {
  components: {
    Dropdown: () => import("./components/dropdown/Dropdown"),
    Home: () => import("./views/Home"),
    Sidebar: () => import("./components/sidebar/Sidebar")
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
    this.$store.dispatch("initAudius")
    // this.$store.dispatch("init")
    // this.$store.dispatch("ethers/init");
    // if (!this.userIsLoggedIn) this.$store.dispatch('checkMagicLogin')
  },
};
</script>

<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <Sidebar v-if="showSideBar"/>
    </transition>
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
  src: url("./assets/fonts/TenorSans-Regular.ttf") format("ttf");}
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  display: flex;
}

a {
  text-decoration: none;
}

body {
  background-color: black;
  margin: 0;
  // overscroll-behavior: none;
  overflow: hidden;
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
  background-color: rgb(158, 158, 158);
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
