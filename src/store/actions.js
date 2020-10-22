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

    // TODO(metamask): ADD `wallet_addr_mm` from textile HERE 
    const artist = {
      ...userAudius,
      _id: userTextile._id,
      catalog: userTextile.catalog,
      collection: userTextile.collection,
      wallet_addr_mm: userTextile.wallet_addr_mm || 'WALLET_ADDR_MM', //TODO (metamask) UPDATE `wallet_addr_mm` from textile HERE 
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

    console.log('fulltrax', user)

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

      // TODO(metamask): ADD null `wallet_addr_mm` for textile HERE 
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
        wallet_addr_mm: null,  // TODO(metamask): ADD null `wallet_addr_mm` for textile HERE 
        links: [],
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

      // TODO(metamask): MAKE SURE `wallet_addr_mm` exists in returned textile user
      var userTextile = await findTextileUserByAudiusId(state.client, userModel.id_audius)


      // Create a user if it doesn't exist in db, otherwise update the userModel with the existing data
      if (!userTextile) {
        console.warn("User does not exist in our DB (yet) - creating an entry")

        userTextile = {
          id_audius: userModel.id_audius,
          wallet_addr_mm: null, // TODO(metamask): CREATE `wallet_addr_mm` from textile HERE (if new user is created)
          name: userModel.name,
          handle: userModel.handle,
          catalog: [],
          collection: [],
          links: []
        }

        const newUserId = await createUser(state.client, userTextile)

        console.log("newUserId")
        console.log(newUserId)

        userModel = {
          ...userModel,
          _id: newUserId,
          wallet_addr_mm: userTextile.wallet_addr_mm // TODO(metamask): UPDATE `wallet_addr_mm` from textile HERE (if new user is created)
        }
        dispatch('getArtistList')
      } else userModel = {
        ...userModel,
        _id: userTextile._id,
        wallet_addr_mm: userTextile.wallet_addr_mm // TODO(metamask): UPDATE `wallet_addr_mm` from textile HERE (if user exists)
      }

      //  Create the final userModel we will use, after we either created or loaded a user
      userModel = {
        ...userModel,
        _id: userModel._id,
        catalog: userTextile.catalog,
        collection: userTextile.collection,
        links: userTextile.links,
        loading: { ...userModel.loading, user_info: false }
      }

      // commit('user', userModel)

      // Populate the tracks for catalog and collection
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

    // TODO(metamask): ADD `wallet_addr_mm` HERE
    user = {
      ...state.user,
      catalog: user.catalog,
      collection: user.collection,
      links: user.links,
      wallet_addr_mm: user.wallet_addr_mm // TODO(metamask): MAKE SURE `wallet_addr_mm` exists in textile returned `user`
    }

    commit('user', user)

    // Get full Audius track info for Catalog & collection
    user = await dispatch('getUsersFullTracks', user)

    commit('user', user)
    setAudiusAccountUser(user) // TODO(metamask): MAKE SURE `wallet_addr_mm` exists on `user` going to localstorage HERE 
  },
  async updateUser({ state, dispatch }, user) {
    // updateUser(state.client, user)
    const formattedUser = formatUser(user)
    console.log({ formattedUser })
    await updateUser(state.client, formattedUser)
    dispatch('refreshUser', formattedUser.  id_audius)
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
    console.log('getAllUsers', users)
  }
}

export default actions