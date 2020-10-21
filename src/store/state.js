/* eslint-disable */
import { LOGGED_OUT_USER, NULL_ARTIST, NULL_SONG } from './constants'

const state = {
  artist: NULL_ARTIST,
  artistList: [],
  client: null,
  clientReady: false,
  currentSong: NULL_SONG,
  libs: null,
  sidebar: {
    component: "Catalog",
    item: null
  },
  user: LOGGED_OUT_USER
}

export default state