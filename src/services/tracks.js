
import { formatUser, updateUser } from './users'
import { queryItemByAudiusId, queryItemsByUserAudiusId } from "../textile_constants/queries"
import {
    makeQuery,
    addDocument,
    removeDocument,
    fetchCollection
} from "../utils/textileApi"

const ITEMS_COLLECTION = "Items"

// Returns a full Textile/Audius item
export const addItemToCatalog = async (client, track, user) => {
    // console.log('💽 Adding track to catalog...', track.title )
    try {
        // Format Audius track to be Textile-friendly
        const item = {
            id_audius: track.id_audius,
            artist: {
                _id: user._id,
                id_audius: user.id_audius,
                handle: user.handle,
                name: user.name
            },
            price: track.price,
            purchased_by: {
                user_ids_audius: [],
                user_ids_textile: []
            }
        }

        // Create the Textile 'Item' Document
        const _id = await createItem(client, item)
        const textileItem = { ...item, _id }


        // Format the user to be Textile-friendly
        var formattedUser = formatUser(user)
        formattedUser.catalog.push(textileItem)

        // Update the Textile 'User' Document 
        await updateUser(client, formattedUser)

        return { ...track, ...textileItem }
    } catch (err) {
        console.error('addItemToCatalog error', err)
    }
}

/*  
 * Adds a track to a User's Catalog.
 * @param client: Client
 * @param audiusTextileItem : { full audius data for a track }
 * @notes
 *  1.) Find the Textile document of the User that matches track's `artist.audiusId`    
 *  2.) Construct the `Item` object by merging audius-provided data and textile-provided Data
 *  3.) Validate that User doesn't already have this Item in their Catalog
 *  4.) Validate that this item doesn't already exist in 'Items' collection
 *  5.) Create the Item in textile 'Items' collection
 *  6.) Use the item._id returned from #5 to update the User document of the track's artist with the updated catalog.
 */

const createItem = async (client, itemDocument) => {
    try {
        console.log(`💽 Creating item...`)
        const resultId = await addDocument(client, ITEMS_COLLECTION, itemDocument)
        console.log(`💽✅ Created item!`, resultId[0])
        return resultId[0]
    } catch (err) {
        console.error('createItem error', err)
        throw new Error(err)
    }
}

export const deleteItem = async (client, itemId) => {
    try {
        console.log(`💽 Deleting item...`)
        const result = await removeDocument(client, ITEMS_COLLECTION, itemId)
        console.log(`💽✅🗑 Deleted item! `, { result })
        return result
    } catch (err) {
        console.error('createItem error', err)
        throw new Error(err)
    }
}

export const textileFindItemByAudiusId = async (client, audiusId) => {
    try {
        console.log(`💽 Querying item in ${ITEMS_COLLECTION} by Audius Id ${audiusId} ...`)
        const query = queryItemByAudiusId(audiusId)
        const item = (await makeQuery(client, ITEMS_COLLECTION, query))[0]
        console.log(`💽✅ Queried item by Audius Id!`, { item })
        return item
    } catch (err) {
        console.error('textileFindItemByAudiusId', err)
    }
}

// Gets Textile Items in the "Items" collection that match the user's audiusId
export const textileGetItemsByUserAudiusId = async (client, userAudiusId) => {
    try {
        console.log(`💽 Querying item in ${ITEMS_COLLECTION} by User Audius Id ${userAudiusId} ...`)
        const query = queryItemsByUserAudiusId(userAudiusId)
        const items = (await makeQuery(client, ITEMS_COLLECTION, query))
        console.log(`💽✅ Queried item by Audius Id!`, { items })
        return items
    } catch (err) {
        console.error('textileFindItemByAudiusId', err)
    }
}

export const getAllTracks = async (client) => {
    console.log(`💽 Getting all tracks...`)
    const tracksTextile = await fetchCollection(client, ITEMS_COLLECTION)
    console.log(`💽✅ Got all tracks!👌`)
    return tracksTextile
}