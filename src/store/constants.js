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