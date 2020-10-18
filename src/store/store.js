/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import { LOGGED_OUT_USER, NULL_ARTIST } from './constants'
import { init, getAudiusAccountUser, setAudiusAccountUser, clearAudiusAccountUser, clearAudiusAccount } from './audius'
import { audiusResolveProfileURL } from '../utils/audiusApi'
import { getUserDataAudius } from '../utils/audiusHelpers'
import { loginAndSetupDB } from '../utils/setup'
import { findTextileUserByAudiusId } from '../services/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artist: NULL_ARTIST,
    client: null,
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
    artist(state, artist) {
      state.artist = artist
    },
    client(state, client) {
      state.client = client
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
    wallet_addr(state, address) {
      state.user.wallet_addr = address
    }
  },
  actions: {
    async getArtistData({ state, commit }, handle) {
      commit('artist', {
        ...NULL_ARTIST,
        loading: {
          user_info: true,
          catalog: true,
          collection: true
        }
      })
      const userAudius = await getUserDataAudius(handle)
      commit('artist', userAudius )
      const userTextile = await findTextileUserByAudiusId(state.client, userAudius.id_audius)
      console.log("artist Textile info");
      console.log(userTextile);
      commit('artist', {
        ...userAudius,
        id_textile: userTextile.id,
        catalog: userTextile.catalog,
        collection: userTextile.collection,
        loading: {
          user_info: false,
          catalog: false,
          collection: false
        }
      })
    },
    async initAudius({ commit }) {
      const libs = await init()
      commit('libs', libs)

      // Check if user exists in local storage
      const user = await getAudiusAccountUser()
      if (user) commit('user', user)
    },
    async initTextile({ state, commit }) {
      const [client] = await loginAndSetupDB({ newIdentity: false })
      commit('client', client)
    },
    async logout({ state, commit }) {
      await state.libs.Account.logout()
      commit('logout')
      clearAudiusAccount()
      clearAudiusAccountUser()
    },
    async login({ state, commit }, credentials) {
      commit('user', {
        ...state.user,
        login_status: "LOGGING_IN"
      })
      var user
      try {
        user = await state.libs.Account.login(credentials.email, credentials.pw)
        
        var userModel = {
          id_audius: user.user.user_id,
          id_textile: null,
          catalog: [],
          collection: [],
          email: credentials.email,
          name: user.user.name,
          handle: user.user.handle,
          wallet_addr: user.user.wallet,
          login_status: "LOGGED_IN"
        }

        commit('user', userModel)
        commit('sidebarComponent', "Account")

        // fetch "real" audius ID & update user
        const id_audius = (await audiusResolveProfileURL(`https://audius.co/${userModel.handle}`)).id
        userModel.id_audius = id_audius
        commit('user', userModel)

        const userTextile = await findTextileUserByAudiusId(state.client, state.user.id_audius)

        userModel = {
          ...userModel,
          id_textile: userTextile._id,
          catalog: userTextile.catalog,
          collection: userTextile.collection,
          links: userTextile.links
        }

        commit('user', userModel)
        setAudiusAccountUser(userModel)
      } catch (e) {
        console.error("yikes: ", e)
        commit('user', {
          ...state.user,
          login_status: "BAD_LOGIN"
        })
      }
    }
  }
})
