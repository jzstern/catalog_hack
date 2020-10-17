/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import ethers from './ethers/index.js'

import { LOGGED_OUT_USER, ARTISTS, NULL_ARTIST } from './constants'
import { init, getAudiusAccountUser, setAudiusAccountUser, clearAudiusAccountUser, clearAudiusAccount } from './audius'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ethers
  },
  state: {
    artist: NULL_ARTIST,
    libs: null,
    sidebar: {
      component: "Catalog",
      item: null
    },
    user: LOGGED_OUT_USER
  },
  getters: {
    onHome() {
      return this.$route.path === '/'
    }
  },
  mutations: {
    addToCatalog(state, item) {
      state.user.catalog.push(item)
    },
    addToCollection(state, item) {
      state.user.collection.push(item)
    },
    artist(state, artist) {
      state.artist = artist
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
    async getArtistData({ commit }, handle) {
      // TODO - fetch user data from Textile & Audius
      const artist = ARTISTS.find(artist => artist.handle === handle)
      commit('artist', artist )
    },
    async initAudius({ commit }) {
      const libs = await init()
      commit('libs', libs)

      const user = await getAudiusAccountUser()
      if (user) commit('user', user)
      console.log(user)
    },
    async logout({ state, commit }) {
      await state.libs.Account.logout()
      commit('user', LOGGED_OUT_USER)
      clearAudiusAccount()
      clearAudiusAccountUser()
    },
    async login({ state, commit }, credentials) {
      commit('user', {
        ...state.user,
        loginStatus: "LOGGING_IN"
      })
      var user
      try {
        user = await state.libs.Account.login(credentials.email, credentials.pw)
        console.log(user);
        const userModel = {
          audiusId: user.user.id,
          catalog: [],
          collection: [],
          email: credentials.email,
          name: user.user.name,
          handle: user.user.handle,
          walletAddress: user.user.wallet,
          loginStatus: "LOGGED_IN"
        }
        commit('user', userModel)
        commit('sidebarComponent', "Account")
        setAudiusAccountUser(userModel)
      } catch (e) {
        commit('user', {
          ...state.user,
          loginStatus: "BAD_LOGIN"
        })
      }
    }
  }
})
