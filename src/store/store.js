/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import { LOGGED_OUT_USER, NULL_ARTIST } from './constants'
import { init, getAudiusAccountUser, setAudiusAccountUser, clearAudiusAccountUser, clearAudiusAccount } from './audius'
import { audiusResolveProfileURL, getTrackSrcAudiusId } from '../utils/audiusApi'
import { getUserDataAudius } from '../utils/audiusHelpers'
import { loginAndSetupDB } from '../utils/setup'
import { getUsers, findTextileUserByAudiusId, updateUser, deleteUser, createUser } from '../services/users'
import { getAllTracks, deleteItem } from '../services/tracks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artist: NULL_ARTIST,
    artistList: [],
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
    artistList(state, artists) {
      state.artistList = artists
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
      commit('artist', userAudius)
      try {
        const userTextile = await findTextileUserByAudiusId(state.client, userAudius.id_audius)
        console.log("artist Textile info");
        console.log(userTextile);
      } catch (e) {
        console.log("Artist not found in Textile DB");
      }
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
    async getArtistList({ state, commit }) {
      const artists = await getUsers(state.client)
      commit('artistList', artists)
    },
    async getTrackSrc({ state, commit }, trackId) {
      const src = await getTrackSrcAudiusId(trackId)
      console.log("traccck src");
      console.log(src);
    },
    async initAudius({ commit }) {
      const libs = await init()
      commit('libs', libs)

      // Check if user exists in local storage
      const user = await getAudiusAccountUser()
      if (user) commit('user', user)
    },
    async initTextile({ commit, dispatch }) {
      const [client] = await loginAndSetupDB({ newIdentity: false })
      commit('client', client)
      dispatch('getArtistList')
    },
    async logout({ state, commit }) {
      await state.libs.Account.logout()
      commit('logout')
      clearAudiusAccount()
      clearAudiusAccountUser()
    },
    async login({ state, commit, dispatch }, credentials) {
      commit('user', {
        ...state.user,
        login_status: "LOGGING_IN"
      })
      var user
      try {
        user = await state.libs.Account.login(credentials.email, credentials.pw)
        
        var userModel = {
          // id_audius: user.user.user_id,
          id_audius: null,
          id_textile: null,
          catalog: [],
          collection: [],
          email: credentials.email,
          name: user.user.name,
          handle: user.user.handle,
          wallet_addr: user.user.wallet,
          login_status: "LOGGED_IN",
          loading: {
            user_info: false,
            catalog: true,
            collection: true
          }
        }

        commit('user', userModel)
        commit('sidebarComponent', "Account")

        // fetch "real" audius ID & update user
        const id_audius = (await audiusResolveProfileURL(userModel.handle)).id
        // const id_audius = (await getUserByAudiusHandle(userModel.handle)).id
        userModel.id_audius = id_audius
        commit('user', userModel)

        var userTextile = await findTextileUserByAudiusId(state.client, userModel.id_audius)

        if (!userTextile) {
          console.warn("User does not exist in our DB (yet) - creating an entry");
          
          userTextile = {
            id_audius: userModel.id_audius,
            name: userModel.name,
            handle: userModel.handle,
            catalog: [],
            collection: [],
            links: []
          }
          
          const newUser = await createUser(state.client, userTextile)
          userTextile = newUser
          dispatch('getArtistList')
        }

        userModel = {
          ...userModel,
          id_textile: userTextile._id,
          catalog: userTextile.catalog,
          collection: userTextile.collection,
          links: userTextile.links,
          loading: {
            user_info: false,
            catalog: false,
            collection: false
          }
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
    },
    async createUser({ state, commit, dispatch }, textileUser) {
      const user = await createUser(state.client, textileUser)
    },
    async updateUser({ state, commit }, { id, user }) {
      const updatedUser = await updateUser(state.client, id, user)
      console.log(updatedUser)
    },
    async getAllTracks({state}) {
      const tracks = await getAllTracks(state.client)
      console.log(tracks)
    },
    async deleteItem({ state }, itemId) {
      const res = await deleteItem(state.client, itemId)
    },
    async deleteUser({ state }, userId) {
      const res = await deleteUser(state.client, userId)
    }
  }
})
