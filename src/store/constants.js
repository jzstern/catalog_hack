export const LOGGED_OUT_USER = {
  _id: null,
  id_audius: null,
  catalog: [],
  collection: [],
  uploads: [],
  email: null,
  name: null,
  handle: null,
  wallet_addr: null,
  login_status: "LOGGED_OUT"
}

export const NULL_ARTIST = {
  _id: null,
  id_audius: null,
  catalog: [],
  collection: [],
  contractAddress: null,
  email: null,
  name: null,
  handle: null,
  wallet_addr: null,
  loading: {
    user_info: true,
    catalog: true,
    collection: true
  }
}

export const NULL_SONG = {
  _id: null,
  id_audius: null,
  playing: false,
  artist: {},
  title: null,
  artwork: {}
}