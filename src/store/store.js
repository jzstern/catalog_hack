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
  url: null,
  walletAddress: null
}

const LOGGED_IN_USER = {
  catalog: [],
  collection: [],
  email: "crowncomfort@gmail.com",
  // isLoggedIn: false,
  loading: false,
  name: "crown comfort",
  url: "crowncomfort",
  walletAddress: "0xjaIJz9d1mw9dhb3"
}

export default new Vuex.Store({
  modules: {
    ethers
  },
  state: {
    user: LOGGED_IN_USER,
    sidebar: {
      component: "Catalog",
      item: null
    }
  },
  mutations: {
    addToCatalog(state, item) {
      state.user.catalog.push(item)
    },
    addToCollection(state, item) {
      state.user.collection.push(item)
    },
    logout(state) {
      state.user = LOGGED_OUT_USER
      state.sidebar.component = "Login"
    },
    closeSidebar(state) {
      state.sidebar.component = ""
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
