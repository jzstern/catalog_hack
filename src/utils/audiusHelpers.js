import { audiusGetTrackByAudiusId, audiusResolveProfileURL, getAudiusUploads, getUserByAudiusHandle } from './audiusApi'

export const getAudiusTracksInCatalog = async (userIdAudius, catalogTextile) => {
  // fetch all Audius uploads from a user
  const uploads = await getAudiusUploads(userIdAudius)
  const formattedUploads = await formatUploads(uploads)
  
  // filter out tracks not in a user's Textile catalog
  var catalog = []

  catalogTextile.forEach(item => {
    const track = formattedUploads.find(track => track.id_audius === item.id_audius)
    if (track) catalog.push({
      ...track,
      _id: item._id,
      price: item.price,
      artist: item.artist
    })
  })

  console.log('getAudiusTracksInCatalog', {catalog})

  return catalog
}

// export const getAudiusTracksInCollection = async (userIdAudius, collectionTextile) => {
export const getAudiusTracksInCollection = async (collectionTextile) => {
  // fetch all tracks in a user's collection
  const collection = collectionTextile.map(async (track) => {
    const item = await audiusGetTrackByAudiusId(track.id_audius)
    return {
      _id: track._id,
      artist: track.artist,
      price: track.price,
      id_audius: item.id,
      title: item.title,
      description: item.description,
      artwork: item.artwork
    }
  })

  return await Promise.all(collection)
}

// Returns a formatted Audius user
export const getUserDataAudius = async (handle) => {
  const user = await audiusResolveProfileURL(handle)
  const wallet_addr = (await getUserByAudiusHandle(handle))[0].wallet
  // var uploads = await getAudiusUploads(user.id) // * should only use this for choosing songs to upload
  // uploads = formatUploads(uploads)
  const catalog = [] // * this should come from textile
  const collection = []

  return {
    id_audius: user.id,
    name: user.name,
    handle,
    wallet_addr,
    cover_photo: user.cover_photo,
    catalog,
    collection,
    loading: {
      user_info: true,
      catalog: true,
      collection: true
    }
  }
}

// Returns an array of formatted tracks with Audius info
const formatUploads = (uploads) => {
  return uploads.map(track => {
    return {
      id_audius: track.id,
      title: track.title,
      description: track.description,
      artwork: track.artwork
    }
  })
}

// const createPlaylist = async (
//   userId,
//   metadata,
//   isAlbum = false,
//   trackIds = [],
//   isPrivate = true
// ) => {
//   const playlistName = metadata.playlist_name
//   const coverArt = metadata.artwork ? metadata.artwork.file : null
//   const description = metadata.description
//   // Creating an album is automatically public.
//   if (isAlbum) isPrivate = false

//   try {
//     const { playlistId, error } = await window.libs.Playlist.createPlaylist(
//       userId,
//       playlistName,
//       isPrivate,
//       isAlbum,
//       trackIds
//     )

//     if (error) return { playlistId, error }

//     // If this playlist is being created from an existing cover art, use it.
//     if (metadata.playlist_image_sizes_multihash) {
//       // await window.libs.contracts.PlaylistFactoryClient.updatePlaylistCoverPhoto(
//       //   playlistId,
//       //   Utils.formatOptionalMultihash(metadata.playlist_image_sizes_multihash)
//       // )
//     } else if (coverArt) {
//       await window.libs.Playlist.updatePlaylistCoverPhoto(playlistId, coverArt)
//     }
//     if (description) {
//       await window.libs.Playlist.updatePlaylistDescription(
//         playlistId,
//         description
//       )
//     }
//     return { playlistId, error: false }
//   } catch (err) {
//     // This code path should never execute
//     console.error(err.message)
//     return { playlistId: null, error: true }
//   }
// }

// const addPlaylistTrack = async (playlistId, trackId) => {
//   try {
//     await window.libs.Playlist.addPlaylistTrack(playlistId, trackId)
//     return { error: false }
//   } catch (error) {
//     console.error(error.message)
//     return { error }
//   }
// }