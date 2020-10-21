/* eslint-disable */
import { LOGGED_OUT_USER } from './constants'

const mutations = {
  addItemToUserCatalog(state, item) {
    state.user.catalog.push(item)
    // If the logged in user is on their own page, also add it to the artist catalog
    if (state.artist._id === state.user._id) state.artist.catalog.push(item)
    // setAudiusAccountUser(user)
  },
  addItemToUserCollection(state, item) {
    state.user.collection.push(item)
    // If the logged in user is on their own page, also add it to the artist collection
    if (state.artist._id === state.user._id) state.artist.collection.push(item)
    // setAudiusAccountUser(user)
  },
  artist(state, artist) {
    state.artist = artist
  },
  artistList(state, artists) {
    state.artistList = artists
  },
  artistCatalog(state, catalog) {
    state.artist.catalog = catalog
  },
  artistCollection(state, collection) {
    state.artist.collection = collection
  },
  client(state, client) {
    state.client = client
  },
  clientReady(state) {
    state.clientReady = true
  },
  closeSidebar(state) {
    state.sidebar.component = ""
  },
  currentSong(state, song) {
    state.currentSong = song
  },
  togglePlaying(state) {
    if (state.currentSong._id) state.currentSong.playing = !state.currentSong.playing
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
    // todo - setAudiusAccountUser(user)
  },
  wallet_addr(state, address) {
    state.user.wallet_addr = address
    // setAudiusAccountUser(user)
  }
}

export default mutations