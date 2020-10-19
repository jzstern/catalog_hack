/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import { LOGGED_OUT_USER, NULL_ARTIST } from './constants'
import { init, getAudiusAccountUser, setAudiusAccountUser, clearAudiusAccountUser, clearAudiusAccount } from './audius'
import { audiusResolveProfileURL, getAudiusUploads, getTrackSrcAudiusId } from '../utils/audiusApi'
import { getUserDataAudius } from '../utils/audiusHelpers'
import { loginAndSetupDB } from '../utils/setup'
import { getAllUsers, findTextileUserByAudiusId, updateUser, deleteUser, createUser } from '../services/users'
import { addItemToCatalog, deleteItem, getAllTracks } from '../services/tracks'

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
    addItemToCatalog(state, item) {
      state.user.catalog = state.user.catalog.push(item)
    },
    addItemToCollection(state, item) {
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
    async addItemToCatalog({ state, commit }, item) {
      // if (state.user.catalog.find(track => track.id_audius === item.id_audius)) console.warn("Track already exists in collection")
      // else {
        const result = await addItemToCatalog(state.client, item, state.user)
        commit('addItemToCatalog', result.textileItem)
        commit('user', result.updatedTextileUser)
      // }
    },
    async getAllUsers({ state }) {
      const users = await getAllUsers(state.client)
      console.log(users)
    },
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
        commit('artist', {
          ...userAudius,
          _id: userTextile._id,
          catalog: userTextile.catalog,
          collection: userTextile.collection,
          loading: {
            user_info: false,
            catalog: false,
            collection: false
          }
        })
      } catch (e) {
        alert("Artist not found in Textile DB");
      }
    },
    async getArtistList({ state, commit }) {
      const artists = await getAllUsers(state.client)
      commit('artistList', artists)
    },
    async getTrackSrc({ state, commit }, trackId) {
      const src = await getTrackSrcAudiusId(trackId)
      console.log("traccck src");
      console.log(src);
    },
    async getAudiusUploads({ state, commit }, userIdAudius) {
      const uploads = await getAudiusUploads(userIdAudius)
      const formattedUploads = uploads.map(item => {
        return {
          id_audius: item.id,
          title: item.title,
          description: item.description,
          artwork: item.artwork,
          duration: item.duration,
        }
      })
      commit('user', { ...state.user, uploads: formattedUploads })
    },
    async initAudius({ state, commit, dispatch }) {
      const libs = await init()
      commit('libs', libs)

      const userLocalStorage = await getAudiusAccountUser()

      if (userLocalStorage) {
        commit('user', userLocalStorage)
        
        // Also fetch user from textile & update w/ any new data
        if (!state.client) {
          setTimeout(async () => { 
            dispatch('refreshUser', userLocalStorage.id_audius)
          }, 1500)
        } else {
          dispatch('refreshUser', userLocalStorage.id_audius)
        }
      }
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
      commit('user', { ...state.user, login_status: "LOGGING_IN" })
      var user
      try {
        user = await state.libs.Account.login(credentials.email, credentials.pw)
        
        var userModel = {
          _id: null,
          id_audius: null,
          catalog: [],
          collection: [],
          uploads: [],
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

        // fetch audius ID & update user
        const id_audius = (await audiusResolveProfileURL(userModel.handle)).id
        userModel.id_audius = id_audius
        commit('user', userModel)

        var userTextile = await findTextileUserByAudiusId(state.client, userModel.id_audius)

        if (!userTextile) {
          console.warn("User does not exist in our DB (yet) - creating an entry");
          
          userTextile = {
            id_audius: userModel.id_audius,
            name: userModel.name,
            handle: userModel.handle,
            links: []
          }
          
          const newUserId = await createUser(state.client, userTextile)
          dispatch('getArtistList')

          userModel = {
            ...userModel,
            _id: newUserId,
            links: []
          }
        }

        userModel = {
          ...userModel,
          links: userTextile.links,
          loading: {
            user_info: false,
            catalog: false,
            collection: false
          }
        }

        // double check user has their catlaog // collection here

        commit('user', userModel)
        setAudiusAccountUser(userModel)
      } catch (e) {
        console.error("yikes: ", e)
        commit('user', { ...state.user, login_status: "BAD_LOGIN" })
      }
    },
    async refreshUser({ state, commit }, userIdAudius) {
      var user = await findTextileUserByAudiusId(state.client, userIdAudius)
      user = {
        ...state.user,
        catalog: user.catalog,
        collection: user.collection,
        links: user.links
      }
      commit('user', user)
      setAudiusAccountUser(user)
    },
    async updateUser({ state }, { id, user }) {
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
