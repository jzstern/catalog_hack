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
    // this.$store.dispatch("ethers/init");
  },
  methods: {},
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
  color: inherit;
  cursor: url("./assets/other/cursor.png"), pointer;
}

body {
  background-color: black;
  margin: 0;
  overscroll-behavior: none;
  // overflow: hidden;
}

label {
  font-family: Inconsolata-SemiBold, sans-serif;
  opacity: 0.6;
  // margin-bottom: 24px;
  font-size: 14px;
}

.buttonPrimary {
  font-family: Inconsolata-ExtraBold;
  height: 45px;
  background-color: #f2ba00;
  color: black;
  border: 1px solid transparent;
  border-radius: 2px;
  margin-top: 16px;
  font-size: 14px;

  width: 100%;
  cursor: url("./assets/other/cursor.png"), pointer;

  &:hover {
    background-color: #f2ba00bf;
  }

  &:active {
    background-color: #f2ba00bf;
    border: 2px solid black;
  }
}

.buttonSecondary {
  font-family: Inconsolata-ExtraBold;
  height: 45px;
  background-color: black;
  color: #f2ba00;
  border-radius: 2px;
  margin-top: 16px;
  font-size: 14px;
  border: 1px solid #f2ba00;
  width: 100%;
  cursor: url("./assets/other/cursor.png"), pointer;

  &:hover {
    background-color: #f2ba001a;
  }

  &:active {
    background-color: #f2ba001a;
    border: 2px solid #f2ba00;
  }
}

input {
  font-family: Inconsolata;
  background-color: black;
  height: 45px;
  width: 100%;
  font-size: 16px;
  padding-left: 16px;
  box-sizing: border-box;
  margin-top: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  color: white;
}

::-webkit-autofill {
  color: red !important;
  background-color: red !important;
}

textarea:focus,
input:focus,
button:focus {
  outline: none;
}

::-webkit-scrollbar {
  width: 1px;
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

.form-item {
  margin: 24px 0;
  letter-spacing: 0.05em;
  font-size: 16px;
  width: 100%;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid #42b983;
  -webkit-text-fill-color: #42b983;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
