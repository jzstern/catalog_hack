
var BASE_URL = 'https://discoveryprovider.audius.co'
BASE_URL = 'https://discoveryprovider.mumbaudius.com'

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com'

// Doesn't work rn
export const audiusResolveProfileURL = async (handle) => {
  let path = `${CORS_PROXY}/${BASE_URL}/v1/resolve?url=https://audius.co/${handle}`
  // path = `${BASE_URL}/v1/resolve?url=https://audius.co/${handle}`

  try {
    // console.log('🎵 Resolving Audius URL...', { path })
    const response = await fetch(path, {
      method: 'GET',
      mode: 'cors'
    })

    const { data } = await response.json()
    // console.log('🎵✅ Resolved Audius URL!', { data })

    return data

  } catch (err) {
    throw new Error(err)
  }
}

export const getUserByAudiusHandle = async (audiusHandle) => {
  const path = `${BASE_URL}/users?handle=${audiusHandle}`

  try {
    // console.log('🎵 Resolving Audius handle...', { audiusHandle })
    const response = await fetch(path, {
      method: 'GET',
      mode: 'cors'
      // mode: 'no-cors'
    })

    const data = await response.json()
    // console.log('🎵✅ Resolved Audius Handle', { data })
    return data.data
  } catch (err) {
    throw new Error(err)
  }
}

export const audiusGetUserByAudiusId = async (userIdAudius) => {
  const path = `${BASE_URL}/v1/users/${userIdAudius}`

  try {
    // console.log(`🎵 Getting Profile with audiusId ${userIdAudius}... `)

    const response = await fetch(path, {
      method: 'GET',
      mode: 'cors'
    })

    const { data } = await response.json()

    // console.log('🎵✅ Resolved Audius Profile 🎵', { data })
    return data

  } catch (err) {
    throw new Error(err)
  }
}

export const getAudiusUploads = async (userIdAudius) => {
  const path = `${BASE_URL}/v1/users/${userIdAudius}/tracks`

  try {
    console.log(`🎵 Getting tracks by user with audiusId ${userIdAudius}... `)

    const response = await fetch(path, {
      method: 'GET',
      mode: 'cors'
    })

    const { data } = await response.json()

    console.log('🎵✅  Resolved Tracks by Audius User', { data })
    return data

  } catch (err) {
    throw new Error(err)
  }
}

export const audiusGetTrackByAudiusId = async (trackIdAudius) => {
  const path = `${BASE_URL}/v1/tracks/${trackIdAudius}`

  try {
    // console.log(`🎵 Getting Track with audiusId ${trackIdAudius}... `)

    const response = await fetch(path, {
      method: 'GET',
      mode: 'cors'
    })

    const { data } = await response.json()

    // console.log('🎵✅  Resolved Audius Track', { data })
    return data

  } catch (err) {
    throw new Error(err)
  }
}

export const getTrackSrcAudiusId = async (trackIdAudius) => {
  // const path = `https://discoveryprovider2.audius.co/v1/tracks/${trackIdAudius}/stream`
  // const path = `https://discoveryprovider2.audius.co/v1/tracks/nkjkp/stream`
  // const path = `${BASE_URL}/v1/tracks/${trackIdAudius}/stream`
  // const path = `${BASE_URL}/v1/tracks/nkjkp/stream`
  return `https://creatornode2.audius.co/tracks/stream/${trackIdAudius}`

  // const path = `https://discoveryprovider.audius.co/v1/tracks/D7KyD/stream`

  // try {
  //   // console.log(`🎵 Getting Track with audiusId ${trackIdAudius}... `)

  //   const response = await fetch(path, {
  //     method: 'GET',
  //     mode: 'no-cors'
  //     // mode: 'cors'
  //   })
    
  //   console.log("response")
  //   console.log(response)

  //   const { data } = await response.json()
    
  //   console.log("data")
  //   console.log(data)
  //   // console.log('🎵✅  Resolved Audius Track', { data })
  //   return data

  // } catch (err) {
  //   throw new Error(err)
  // }
}