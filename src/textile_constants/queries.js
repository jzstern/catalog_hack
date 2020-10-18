import {Where} from '@textile/hub'

export const queryUserByAudiusId = (audiusId) => new Where('id_audius').eq(audiusId)

export const queryItemByAudiusId = (audiusId) => new Where('id_audius').eq(audiusId)

export const queryItemsByUserAudiusId = (audiusId) => new Where('artist.id_audius').eq(audiusId)

