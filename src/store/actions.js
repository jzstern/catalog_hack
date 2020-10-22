/* eslint-disable */
import { init, getAudiusAccountUser, setAudiusAccountUser, clearAudiusAccountUser, clearAudiusAccount } from './audius'
import { audiusResolveProfileURL, getAudiusUploads, getTrackSrcAudiusId } from '../utils/audiusApi'
import { getAudiusTracksInCatalog, getAudiusTracksInCollection, getUserDataAudius } from '../utils/audiusHelpers'
import { loginAndSetupDB } from '../utils/setup'
import { getAllUsers, findTextileUserByAudiusId, updateUser, deleteUser, createUser, formatUser } from '../services/users'
import { addItemToCatalog, addItemToCollection, deleteItem, getAllTracks } from '../services/tracks'

import { NULL_ARTIST } from './constants'

const actions = {
  async addItemToCatalog({ state, commit, dispatch }, track) {
    // TODO - in Upload component, filter out tracks that are already in a users catalog from the selection
    if (state.user.catalog.find(item => track.id_audius === item.id_audius)) {
      // TODO - handle this on UI
      console.warn("Track already exists in your catalog")
    }
    else {
      const item = await addItemToCatalog(state.client, track, state.user)
      commit('addItemToUserCatalog', item)

        // finally, update the user in the state/localstorage
        dispatch('refreshUser', state.user.id_audius)
    }
  },
  async addItemToCollection({ state, commit, dispatch }, item) {
    // Check if track already exists in your collection
    if (state.user.collection.find(i => item.id_audius === i.id_audius)) {
      // TODO - handle this on UI
      console.warn("Item already exists in your collection")
      return
    }
    // item = Textile Item
    // Add the current item to the purchasing (logged in) user's collection
    const result = await addItemToCollection(state.client, item, state.user)
    console.log('addItemToCollection top: item\n', result)

    commit('addItemToUserCollection', result)

    // finally, update the user in the state/localstorage
    dispatch('refreshUser', state.user.id_audius)
  },
  async getArtistData({ state, commit, dispatch }, handle) {
    commit('artist', {
      ...NULL_ARTIST,
      loading: { user_info: true, catalog: true, collection: true }
    })

    const userAudius = await getUserDataAudius(handle)
    commit('artist', userAudius)

    const userTextile = await findTextileUserByAudiusId(state.client, userAudius.id_audius)

    const artist = {
      ...userAudius,
      _id: userTextile._id,
      catalog: userTextile.catalog,
      collection: userTextile.collection,
      loading: { user_info: false, catalog: true, collection: true }
    }

    commit('artist', artist)

    const artistWithTrackInfo = await dispatch('getUsersFullTracks', artist)
    commit('artist', artistWithTrackInfo)
  },
  async getArtistList({ state, commit }) {
    const artists = await getAllUsers(state.client)
    commit('artistList', artists)
  },
  async getUsersFullTracks({ }, user) {
    // User must have textile catalog/collection info
    const catalog = getAudiusTracksInCatalog(user.id_audius, user.catalog)
    const collection = getAudiusTracksInCollection(user.collection)

    return Promise.all([catalog, collection]).then(results => {
      return {
        ...user,
        catalog: results[0],
        collection: results[1],
        loading: { user_info: false, catalog: false, collection: false }
      }
    })
  },
  async getTrackSrc({ state, commit }, trackIdAudius) {
    const source = await getTrackSrcAudiusId(trackIdAudius)
    // commit('currentSong', { ...state.currentSong, source })
    return source
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

    if (userLocalStorage) commit('user', userLocalStorage)

    dispatch('ethers/init')

    // const wallet = libs.hedgehog.getWallet()
    // console.log(wallet)
  },
  async initTextile({ commit, dispatch }) {
    // const [client] = await loginAndSetupDB({ newIdentity: false })
    const [client] = await loginAndSetupDB({ newIdentity: true })
    commit('client', client)
    commit('clientReady')
    dispatch('getArtistList')

    // if (state.user.id_audius) dispatch('refreshUser', state.user.id_audius)
  },
  logout({ state, commit, dispatch }) {
    commit('logout')
    dispatch('ethers/disconnect') // todo - properly clear ethers
    clearAudiusAccount()
    clearAudiusAccountUser()
    state.libs.Account.logout()
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
        links: [],
        login_status: "LOGGED_IN",
        loading: {
          user_info: false,
          catalog: true,
          collection: true
        }
      }

      commit('user', userModel)
      
      if (credentials.route !== '/') commit('sidebarComponent', "Account")
      else commit('sidebarComponent', "Artist List")

      // fetch audius ID & update user
      const id_audius = (await audiusResolveProfileURL(userModel.handle)).id
      userModel.id_audius = id_audius
      commit('user', userModel)

      var userTextile = await findTextileUserByAudiusId(state.client, userModel.id_audius)

      if (!userTextile) {
        console.warn("User does not exist in our DB (yet) - creating an entry")

        userTextile = {
          id_audius: userModel.id_audius,
          name: userModel.name,
          handle: userModel.handle,
          catalog: [],
          collection: [],
          links: []
        }

        const newUserId = await createUser(state.client, userTextile)

        console.log("newUserId")
        console.log(newUserId)

        userModel = { ...userModel, _id: newUserId }
        dispatch('getArtistList')
      } else userModel = { ...userModel, _id: userTextile._id }

      userModel = {
        ...userModel,
        _id: userModel._id,
        catalog: userTextile.catalog,
        collection: userTextile.collection,
        links: userTextile.links,
        loading: { ...userModel.loading, user_info: false }
      }

      commit('user', userModel)

      userModel = await dispatch('getUsersFullTracks', userModel)
      commit('user', userModel)
      setAudiusAccountUser(userModel)
    } catch (e) {
      console.error("yikes: ", e)
      commit('user', { ...state.user, login_status: "BAD_LOGIN" })
    }
  },
  async refreshUser({ state, commit, dispatch }, userIdAudius) {
    // Get user metadata
    var user = await findTextileUserByAudiusId(state.client, userIdAudius)
    user = {
      ...state.user,
      catalog: user.catalog,
      collection: user.collection,
      links: user.links
    }

    commit('user', user)

    // Get full Audius track info for Catalog & collection
    user = await dispatch('getUsersFullTracks', user)

    commit('user', user)
    setAudiusAccountUser(user)
  },
  async updateUser({ state, commit }, user) {
    updateUser(state.client, user)
    // const formattedUser = formatUser(user)
    // updateUser(state.client, formattedUser)
    // commit('user', user)
  },
  async getAllTracks({ state }) {
    const tracks = await getAllTracks(state.client)
    console.log(tracks)
  },
  async deleteItem({ state }, itemId) {
    const res = await deleteItem(state.client, itemId)
  },
  async deleteUser({ state }, userId) {
    const res = await deleteUser(state.client, userId)
  },
  async getAllUsers({ state }) {
    const users = await getAllUsers(state.client)
    console.log(users)
  }
}

export default actions