export const LOGGED_OUT_USER = {
  _id: null,
  id_audius: null,
  catalog: [],
  collection: [],
  uploads: [],
  email: null,
  login_status: "loggedOut",
  name: null,
  handle: null,
  wallet_addr: null
}

export const LOGGED_IN_USER = {
  catalog: [
    {
      title: "Swing Theory",
      artistHandle: "quicklyquickly",
      description: "swung af",
      price: 1,
      id: "4"
    },
    {
      title: "all i wanna do",
      artistHandle: "quicklyquickly",
      description: "freebie",
      price: null,
      id: "5"
    },
    {
      title: "docks [clip]",
      artistHandle: "quicklyquickly",
      description: null,
      price: null,
      id: "6"
    }
  ],
  collection: [],
  email: "quicklyquickly@gmail.com",
  login_status: "loggedIn",
  name: "quickly, quickly",
  handle: "quicklyquickly",
  wallet_addr: "0x13ouhfAnv937NkPa1g"
}

export const NULL_ARTIST = {
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

export const ARTISTS = [
  {
    name: "appa", handle: "jzstern", catalog: [], collection: [], wallet_addr: null
  },
  {
    name: "buns", handle: "buns", catalog: [], collection: [], wallet_addr: null
  },
  { name: "chromonicci", handle: "chromonicci",  catalog: [], collection: [], wallet_addr: null },
  {
    name: "crown comfort", handle: "_mike", catalog: [{
      title: "shimmer",
      artist: "crown comfort",
      artistHandle: "crowncomfort",
      price: 1,
      id: "3"
    }], collection: [], wallet_addr: null },
  { name: "drumloop", handle: "drumloop",  catalog: [], collection: [], wallet_addr: null },
  { name: "feewet", handle: "feewet",  catalog: [], collection: [], wallet_addr: null },
  { name: "g l u e 7 0", handle: "glue70",  catalog: [], collection: [], wallet_addr: null },
  { name: "gohda", handle: "gohda",  catalog: [], collection: [], wallet_addr: null },
  { name: "KMB", handle: "kmb",  catalog: [], collection: [], wallet_addr: null },
  { name: "Melo-Zed", handle: "melozed",  catalog: [], collection: [], wallet_addr: null },
  { name: "MssingNo", handle: "mssingno",  catalog: [], collection: [], wallet_addr: null },
  { name: "pandi", handle: "pandi",  catalog: [], collection: [], wallet_addr: null },
  {
    name: "Omari Jazz",
    handle: "omarijazz",
    catalog: [
      {
        title: "Dream Child",
        artist: 'Omari Jazz',
        artistHandle: "omarijazz",
        price: 1,
        id: "0"
      },
      {
        title: "Kindling",
        artist: 'Omari Jazz',
        artistHandle: "omarijazz",
        price: null,
        id: "1"
      },
      {
        title: "Atlas",
        artist: 'Omari Jazz',
        artistHandle: "omarijazz",
        price: 2,
        id: "2"
      }
    ],
    collection: [{
      title: "shimmer",
      artist: "crown comfort",
      artistHandle: "crowncomfort",
      price: 1,
      id: "3"
    }]
  },
  { name: "sharad", handle: "sharad",  catalog: [], collection: [], wallet_addr: null },
  { name: "WISHNOMORE", handle: "wishnomore",  catalog: [], collection: [], wallet_addr: null },
  LOGGED_IN_USER
]