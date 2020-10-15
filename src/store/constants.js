export const LOGGED_OUT_USER = {
  catalog: null,
  collection: [],
  email: null,
  isLoggingIn: false,
  name: null,
  handle: null,
  walletAddress: null
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
  isLoggingIn: false,
  name: "quickly, quickly",
  handle: "quicklyquickly",
  walletAddress: "0x13ouhfAnv937NkPa1g"
}

export const NULL_ARTIST = {
  catalog: null,
  collection: null,
  email: null,
  isLoggingIn: false,
  name: null,
  handle: null,
  walletAddress: null
}

export const ARTISTS = [
  {
    name: "appa", handle: "appa", catalog: [], collection: [], walletAddress: null
  },
  { name: "chromonicci", handle: "chromonicci",  catalog: [], collection: [], walletAddress: null },
  {
    name: "crown comfort", handle: "crowncomfort", catalog: [{
      title: "shimmer",
      artist: "crown comfort",
      artistHandle: "crowncomfort",
      price: 1,
      id: "3"
    }], collection: [], walletAddress: null },
  { name: "drumloop", handle: "drumloop",  catalog: [], collection: [], walletAddress: null },
  { name: "feewet", handle: "feewet",  catalog: [], collection: [], walletAddress: null },
  { name: "g l u e 7 0", handle: "glue70",  catalog: [], collection: [], walletAddress: null },
  { name: "gohda", handle: "gohda",  catalog: [], collection: [], walletAddress: null },
  { name: "KMB", handle: "kmb",  catalog: [], collection: [], walletAddress: null },
  { name: "Melo-Zed", handle: "melozed",  catalog: [], collection: [], walletAddress: null },
  { name: "MssingNo", handle: "mssingno",  catalog: [], collection: [], walletAddress: null },
  { name: "pandi", handle: "pandi",  catalog: [], collection: [], walletAddress: null },
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
  { name: "sharad", handle: "sharad",  catalog: [], collection: [], walletAddress: null },
  { name: "WISHNOMORE", handle: "wishnomore",  catalog: [], collection: [], walletAddress: null },
  LOGGED_IN_USER
]