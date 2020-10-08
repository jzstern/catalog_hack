import Vue from 'vue'
import Vuex from 'vuex'
import { Magic } from 'magic-sdk'
import ethers from './ethers/index.js'
// import router from '../router/index';

Vue.use(Vuex)

const MAGIC = new Magic('pk_test_5975B67E22265359')

const LOGGED_OUT_USER = {
  catalog: null,
  collection: [],
  email: null,
  isLoggedIn: false,
  loading: false,
  name: null,
  walletAddress: null
}

export default new Vuex.Store({
  modules: {
    ethers
  },
  state: {
    user: LOGGED_OUT_USER
  },
  mutations: {
    logout(state) {
      state.user = LOGGED_OUT_USER
    },
    user(state, user) {
      state.user = user
    }
  },
  actions: {
    async loadMagic({ state, dispatch }) {
      await MAGIC.preload()
      if (!state.user.isLoggedIn) dispatch('checkMagicLogin')
    },
    async loginWithMagic({ dispatch }, email) {
      await MAGIC.auth.loginWithMagicLink({ email })
      dispatch('checkMagicLogin')
    },
    async logout({ commit }) {
      await MAGIC.user.logout()
      commit('logout')
    },
    async checkMagicLogin({ state, commit }) {
      const loggedIn = await MAGIC.user.isLoggedIn()

      if (loggedIn) {
        commit('user', {
          ...state.user,
          loading: true
        })
        const user = await MAGIC.user.getMetadata()
        commit('user', {
          ...state.user,
          email: user.email,
          walletAddress: user.publicAddress,
          isLoggedIn: true,
          loading: false
        })
      }
    }
  }
})
