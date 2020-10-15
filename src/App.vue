<script>
/* eslint-disable */
import Audius from "@audius/libs"

export default {
  components: {
    Dropdown: () => import("./components/dropdown/Dropdown"),
    Sidebar: () => import("./components/sidebar/Sidebar")
  },
  computed: {
    showSideBar() {
      return !!this.$store.state.sidebar.component
    },
    user() {
      return this.$store.state.user
    }
  },
  async mounted() {
    var init = async () => {
      const dataRegistryAddress = '0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2'

      const ethTokenAddress = '0xADEf65C0f6a30Dcb5f88Eb8653BBFe09Bf99864f'
      const ethRegistryAddress = '0xb2be26Ca062c5D74964921B80DE6cfa28D9A36c0'
      const ethProviderUrl = 'https://mainnet.infura.io/v3/d6b566d7eea1408988388c311d5a273a'
      const ethProviderOwnerWallet = '0xe886a1858d2d368ef8f02c65bdd470396a1ab188'

      const libs = new Audius({
        web3Config: Audius.configInternalWeb3(
          dataRegistryAddress,
          ['https://core.poa.network']
        ),
        ethWeb3Config: Audius.configEthWeb3(
          ethTokenAddress,
          ethRegistryAddress,
          ethProviderUrl,
          ethProviderOwnerWallet
        ),
        discoveryProviderConfig: Audius.configDiscoveryProvider(),
        identityServiceConfig: Audius.configIdentityService(
          'https://identityservice.audius.co'
        ),
        creatorNodeConfig: Audius.configCreatorNode(
          'https://creatornode.audius.co'
        )
      })
      await libs.init()
      window.libs = libs
      return libs
    }

    const libs = await init()
    // libs.Account.login("", "")
    // this.$store.dispatch("initAudius")
    // this.$store.dispatch("init")
    // this.$store.dispatch("ethers/init");
  },
  methods: {}
}
</script>

<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in"> -->
    <Sidebar v-if="showSideBar" />
    <!-- </transition> -->
    <transition
      name="fade"
      mode="out-in"
    >
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
