// import { getUserByAudiusHandle, audiusResolveProfileURL, audiusGetUserByAudiusId, audiusGetUserUploads } from './audiusApi'
import { audiusResolveProfileURL, audiusGetUserUploads } from './audiusApi'

// Returns a formatted Audius user
export const getUserAudiusData = async (handle) => {
  console.log(handle)
  const user = await audiusResolveProfileURL(`https://audius.co/${handle}`)
  console.log(user)
  const uploads = await audiusGetUserUploads(user.id)
  const catalog = getCatalog(uploads)
  const collection = []

  return {
    audiusId: user.id,
    name: user.name,
    handle,
    wallet_addr: user.wallet_addr,
    cover_photo: user.cover_photo,
    catalog: catalog,
    collection: collection
  }
}

// Returns an array of formatted tracks with Audius info
const getCatalog = (uploads) => {
  return uploads.map(track => {
    return {
      id: track.id,
      release_date: track.release_date,
      title: track.title,
      description: track.description,
      artwork: track.artwork,
      price: null
    }
  })
}