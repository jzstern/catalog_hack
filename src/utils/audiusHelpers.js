// import { getUserByAudiusHandle, audiusResolveProfileURL, audiusGetUserByAudiusId, audiusGetUserUploads } from './audiusApi'
import { audiusResolveProfileURL, audiusGetUserUploads } from './audiusApi'

// Returns a formatted Audius user
export const getUserDataAudius = async (handle) => {
  const user = await audiusResolveProfileURL(handle)
  const uploads = await audiusGetUserUploads(user.id) // * should only use this for choosing songs to upload
  const catalog = getCatalog(uploads) // * this should come from textile
  const collection = []

  return {
    id_audius: user.id,
    name: user.name,
    handle,
    wallet_addr: user.wallet_addr,
    cover_photo: user.cover_photo,
    catalog,
    collection,
    loading: {
      user_info: false,
      catalog: true,
      collection: true
    }
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