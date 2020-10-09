<script>
export default {
  computed: {
    /* eslint-disable */

    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.dispatch("ethers/init");
    // if (!this.userIsLoggedIn) this.$store.dispatch('checkMagicLogin')
  },
};
</script>

<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/"> Home </router-link> |
      <router-link v-if="user.walletAddress" :to="`/${user.walletAddress}`">
        Profile
      </router-link>
    </div> -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  // padding: 30px;
}

body {
  background-color: black;
  margin: 0;
  // overscroll-behavior: none;
  // overflow: hidden;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 0px;
  background-color: rgb(75, 75, 75);
  opacity: 0.4;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(158, 158, 158);
  // opacity: 0.3;
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.entry-enter-active {
  transition-duration: 0.2s;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}
.entry-enter {
  opacity: 0;
  transform: translateX(7em);
}

.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity, transform;
  transition-timing-function: ease;
  // transition: opacity 0.1s ease-in;
  // transition: transform 0.1s ease-in;
}
.fade-enter-active {
  transition-duration: 0.4s;
  transition-property: opacity, transform;
  transition-timing-function: ease;

  // transition: opacity 0.4s ease-in;
  // transition: transform 0.4s ease-in;
  // overflow: hidden;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(1em);
}
</style>
