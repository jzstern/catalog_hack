import Vue from 'vue'
import Vuex from 'vuex'
// import { Magic } from 'magic-sdk'
import ethers from './ethers/index.js'
// import router from '../router/index';

Vue.use(Vuex)

// const MAGIC = new Magic('pk_test_5975B67E22265359')

const LOGGED_OUT_USER = {
  catalog: null,
  collection: [],
  email: null,
  // isLoggedIn: false,
  loading: false,
  name: null,
  walletAddress: null
}

export default new Vuex.Store({
  modules: {
    ethers
  },
  state: {
    user: LOGGED_OUT_USER,
    sidebar: "artist-list"
  },
  mutations: {
    // logout(state) {
    //   state.user = LOGGED_OUT_USER
    //   console.log(state.user.walletAddress)
    // },
    closeSidebar(state) {
      state.sidebar = ""
    },
    sidebar(state, value) {
      state.sidebar = value
    },
    user(state, user) {
      state.user = user
    },
    walletAddress(state, address) {
      state.user.walletAddress = address
    }
  },
  actions: {
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
    }
    // async loadMagic({ state, dispatch }) {
    //   await MAGIC.preload()
    //   if (!state.user.isLoggedIn) dispatch('checkMagicLogin')
    // },
    // async loginWithMagic({ dispatch }, email) {
    //   await MAGIC.auth.loginWithMagicLink({ email })
    //   dispatch('checkMagicLogin')
    // },
    // async logout({ commit }) {
    //   await MAGIC.user.logout()
    //   commit('logout')
    // },
    // async checkMagicLogin({ state, commit }) {
    //   const loggedIn = await MAGIC.user.isLoggedIn()

    //   if (loggedIn) {
    //     commit('user', {
    //       ...state.user,
    //       loading: true
    //     })
    //     const user = await MAGIC.user.getMetadata()
    //     commit('user', {
    //       ...state.user,
    //       email: user.email,
    //       walletAddress: user.publicAddress,
    //       isLoggedIn: true,
    //       loading: false
    //     })
    //   }
    // }
  }
})
