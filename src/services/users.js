import {
    addDocument,
    // findDocument,
    removeDocument,
    makeQuery,
    fetchCollection,
    updateDocument
} from "../utils/textileApi"

import {
    // audiusGetUserByAudiusId,
    // audiusResolveProfileURL,
    // getUserByAudiusHandle,
    // getAudiusUploads
} from "../utils/audiusApi"


// Constants
import { queryUserByAudiusId } from "../textile_constants/queries"
const USERS_COLLECTION = "Users"

// Convert a user object to be Textile-friendly
export const formatUser = (user) => {
    var catalog = []
    var collection = []

    // format catalog to be Textile-friendly
    if (user.catalog.length) {
        catalog = user.catalog.map(item => {
            return {
                _id: item._id,
                id_audius: item.id_audius,
                artist: item.artist
            }
        })
    }

    // format collection to be Textile-friendly
    if (user.collection.length) {
        collection = user.collection.map(item => {
            return {
                _id: item._id,
                id_audius: item.id_audius,
                artist: item.artist
            }
        })
    }
        
    const formattedUser = {
        _id: user._id,
        id_audius: user.id_audius,
        handle: user.handle,
        name: user.name,
        wallet_addr_mm: user.wallet_addr_mm,
        catalog,
        collection,
        links: []
    }

    return formattedUser
}

export const createUser = async (client, userObj) => {
    const t0 = performance.now()
    console.log(`💽 Creating user...`)

    // resolve the Audius URL against Audius to get their data
    // const audiusProfile = await audiusResolveProfileURL(userObj.handle)

    // Push the User Textile document to Users Collection
    // const result = await addDocument(client, USERS_COLLECTION, textileData)
    const result = (await addDocument(client, USERS_COLLECTION, userObj))[0]

    const t1 = performance.now()
    console.log(`💽✅ Created user! Took ${t1 - t0}ms`, { result })

    return result
}

export const getAllUsers = async (client) => {
    // console.log(`💽 Getting all users...`)
    const usersTextile = await fetchCollection(client, USERS_COLLECTION)
    // console.log(`💽✅ Got all users!👌`)
    return usersTextile
}

// userID is textileID
// export const getUserById = async (client, userId) => {
//     try {
//         const t0 = performance.now()
//         console.log(`💽 Fetching user with Textile ID ${userId}`)

//         // Get textile data for the user
//         const userTextile = await findDocument(client, USERS_COLLECTION, userId)

//         // Using the audiusID, get the user from Audius
//         const userAudius = await audiusGetUserByAudiusId(userTextile.id_audius)
//         const { name, cover_photo, profile_picture } = userAudius

//         // Get tracks user has uploaded on Audius
//         let audiusUploads = await getAudiusUploads(userTextile.id_audius)
//         // audiusUploads = audiusUploads.map(({ id, title }) => ({ id, title }))

//         // Find out which Audius uploads of the user are in their Catalog
//         // We may need to do this if we want to expand out their Catalog in this function 
//         // const catalog = []

//         // Stitch textile and Audius Data
//         const user = new UserModel({
//             ...userTextile,
//             name,
//             background: cover_photo['2000x'],
//             profilePicture: profile_picture['1000x1000'],
//             audiusUploads
//         }).getData()

//         const t1 = performance.now()
//         console.log(`💽✅ Fetched user ${userId}! Took ${t1 - t0}ms`, { user })
//         return user

//     } catch (err) {
//         throw new Error(err)
//     }
// }

// Instance not found ? 
// userId is textile ID
// Not only do you have to delete the user, you have to delete any Items in the 'Items' collection
// 
export const deleteUser = async (client, userId) => {
    try {
        console.log(`deleting user ${userId} from ${USERS_COLLECTION}...`)
        await removeDocument(client, USERS_COLLECTION, userId)
        console.log(`deleted! 😇 `)
        return true
    } catch (err) {
        throw new Error(err)
    }
}

export const updateUser = async (client, user) => {
    try {
        // console.log(`💽 Updating user ${user.handle} in ${USERS_COLLECTION}...`)
        await updateDocument(client, USERS_COLLECTION, user)
        // console.log(`💽✅ Updated user! 😩 ?`)
    } catch (err) {
        throw new Error(err)
    }
}

export const findTextileUserByAudiusId = async (client, audiusId) => {
    try {   
        // console.log(`💽 Finding user in ${USERS_COLLECTION} by Audius Id ${audiusId} ...`)
        const query = queryUserByAudiusId(audiusId)
        const user = (await makeQuery(client, USERS_COLLECTION, query))[0]
        // console.log(`💽✅ Found user by Audius Id!`, { user })
        return user
    } catch (err) {
        throw new Error(err)
    }
}

// export const addTrackToCatalog = async (client, Id) => {

// }