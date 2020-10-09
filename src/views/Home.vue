<template>
  <div class="home">
    <div class="browse">
      <div class="header no-select">
        <img class="logo" src="../assets/other/catalog.svg" />
        <h1 class="title">CATALOG</h1>
      </div>
      <div class="artist-list no-select">
        <ul>
          <li class="artist">appa</li>
          <div class="divider" />
          <li class="artist">chromonicci</li>
          <div class="divider" />
          <li class="artist">crown comfort</li>
          <div class="divider" />
          <li class="artist">drumloop</li>
          <div class="divider" />
          <li class="artist">feewet</li>
          <div class="divider" />
          <li class="artist">g l u e 7 0</li>
          <div class="divider" />
          <li class="artist">gohda</li>
          <div class="divider" />
          <li class="artist">KMB</li>
          <div class="divider" />
          <li class="artist">Melo-Zed</li>
          <div class="divider" />
          <li class="artist">MssingNo</li>
          <div class="divider" />
          <li class="artist">pandi</li>
          <div class="divider" />
          <li class="artist">Omari Jazz</li>
          <div class="divider" />
          <li class="artist">sharad</li>
          <div class="divider" />
          <li class="artist">WISHNOMORE</li>
          <div class="divider" />
          <li class="artist">quickly, quickly</li>
        </ul>
      </div>
    </div>
    <div class="about">
      <div v-if="user.walletAddress">
        <router-link class="login" :to="`/${user.walletAddress}/upload`">
          {{ user.walletAddress.substr(user.walletAddress.length - 4) }}
        </router-link>
      </div>
      <div class="login" @click="login" v-else>
        log in {{ user.loading ? " ..." : "" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  computed: {
    /* eslint-disable */
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async login() {
      this.$store.dispatch("ethers/login");
    },
  },
};
</script>

<style lang="scss">
ul {
  padding: 0px;
}

.home {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.about {
  position: relative;
  height: 100vh;
  background-repeat: no-repeat;
  flex: auto;
  background-image: url("../assets/other/about.png");
  // border-left: 2px solid #666666;
  box-sizing: border-box;
}

.artist-list {
  padding: 0px 16px;
}

.artist {
  font-family: "Inconsolata", sans-serif;

  list-style-type: none;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  opacity: 0.8;
  cursor: url("../assets/other/cursor.png"), pointer;

  &:hover {
    color: #ffcf2e;
  }

  &:active {
    transform-origin: left center;
    transform: scale(0.95);
  }
}

.browse {
  width: 24%;
  flex: initial;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}

.divider {
  border-bottom: 1px solid #4e3e5b;
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

.login {
  font-family: "Inconsolata-ExtraBold", sans-serif;

  position: absolute;
  top: 22px;
  right: 24px;
  color: #ffcf2e;
  border-radius: 4px;
  padding: 8px 12px 9px 12px;
  box-sizing: border-box;

  &:hover {
    // color: black;
    box-sizing: border-box;

    border: 1px solid #ffcf2e;
    cursor: url("../assets/other/cursor.png"), auto;
  }
}

.logo {
  margin: 0px 16px 0px 24px;
  opacity: 0.8;
  width: 24px;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.title {
  font-family: "Tenor Sans", sans-serif;
  font-size: 22px;
  vertical-align: middle;
  letter-spacing: 0.05em;
  opacity: 0.8;
}
</style>
