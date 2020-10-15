import Vue from 'vue'
import Vuex from 'vuex'
import ethers from './ethers/index.js'
import Audius from '@audius/libs'
// import router from '../router/index';

import { LOGGED_OUT_USER } from './constants'
// import init from './audius'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ethers
  },
  state: {
    artist: null,
    libs: null,
    sidebar: {
      component: "Catalog",
      item: null
    },
    user: LOGGED_OUT_USER
  },
  mutations: {
    addToCatalog(state, item) {
      state.user.catalog.push(item)
    },
    addToCollection(state, item) {
      state.user.collection.push(item)
    },
    closeSidebar(state) {
      state.sidebar.component = ""
    },
    libs(state, libs) {
      state.libs = libs
    },
    logout(state) {
      state.user = LOGGED_OUT_USER
      state.sidebar.component = "Login"
    },
    sidebar(state, value) {
      state.sidebar = value
    },
    sidebarComponent(state, component) {
      state.sidebar.component = component
    },
    user(state, user) {
      state.user = user
    },
    walletAddress(state, address) {
      state.user.walletAddress = address
    }
  },
  actions: {
    async init() {
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
    },
    // async initAudius({ commit }) {
    //   const libs = await init()
    //   commit('libs', libs)
    //   // libs.Account.login("jzstern@gmail.com", "avenged7fold12*")
    //   // console.log(state.libs)
    //   // console.log(libs.Account.getCurrentUser())
    // },
    logout({ state, commit, dispatch}) {
      // commit('walletAddress', null)
      commit('user', {
        catalog: null,
        collection: [],
        email: null,
        // isLoggedIn: false,
        loading: false,
        name: null,
        walletAddress: null
      })
      // commit('user', LOGGED_OUT_USER)
      dispatch('ethers/disconnect')
      // ctx.dispatch('ethers/logout')
      console.log(state.user.walletAddress)
    },
    async login({ state, commit }, email, pw) {
      commit('user', {
        ...state.user,
        isLoggingIn: true
      })
      const { user } = await state.libs.Account.login(email, pw)
      commit('user', {
        ...state.user,
        isLoggingIn: false
      })
      console.log(user)
    }
  }
})
