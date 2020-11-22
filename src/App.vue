<script>
/* eslint-disable */
// import Audius from "@audius/libs";

export default {
  components: {
    EmailLandingPage: () => import("./views/EmailLandingPage"),
    // Dropdown: () => import("./components/dropdown/Dropdown"),
    // MusicPlayer: () => import("./components/MusicPlayer"),
    // NetworkWarning: () => import("./components/NetworkWarning"),
    // Sidebar: () => import("./components/sidebar/Sidebar"),
  },
  // watch: {
  //   clientReady() {
  //     if (this.user.id_audius)
  //       this.$store.dispatch("refreshUser", this.user.id_audius);
  //   },
  // },
  // computed: {
  //   clientReady() {
  //     return this.$store.state.clientReady;
  //   },
  //   showSideBar() {
  //     return !!this.$store.state.sidebar.component;
  //   },
  //   showNetworkWarning() {
  //     return (
  //       this.$store.state.ethers.network !== "Ropsten" &&
  //       this.$store.state.ethers.address
  //     );
  //   },
  //   user() {
  //     return this.$store.state.user;
  //   },
  //   onHome() {
  //     return this.$route.path === "/";
  //   },
  //   currentSong() {
  //     return this.$store.state.currentSong;
  //   },
  // },
  // beforeMount() {
  //   this.$store.dispatch("initTextile");
  //   this.$store.dispatch("initAudius");
  // },
};
</script>

<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <EmailLandingPage />
    </transition>
    <!-- <div class="content">
      <transition name="fadeScale" mode="out-in">
        <Sidebar v-if="showSideBar" />
      </transition>
      <div class="view">
        <transition name="fadeScale" mode="out-in">
          <Dropdown />
        </transition>
        <router-view />
      </div>
    </div>
    <NetworkWarning v-if="showNetworkWarning" />
    <transition name="fade" mode="out-in">
      <MusicPlayer v-show="currentSong._id || onHome" />
    </transition> -->
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
  flex-direction: column;
  justify-content: flex-start;
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
