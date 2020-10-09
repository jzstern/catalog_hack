<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  created() {
    this.$store.dispatch("ethers/init")
    // if (!this.userIsLoggedIn) this.$store.dispatch('checkMagicLogin')
  }
}
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link
        v-if="user.walletAddress"
        :to="`/${user.walletAddress}`"
      >
        Profile
      </router-link>
      <router-link
        v-else
        to="/login"
      >
        Login {{ user.loading ? ' ...' : '' }}
      </router-link>
    </div>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  padding: 30px;
}

body {
  background-color: black;
  // overscroll-behavior: none;
  // overflow: hidden;
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
