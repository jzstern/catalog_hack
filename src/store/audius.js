import Audius from '@audius/libs'
import { CURRENT_USER_EXISTS_LOCAL_STORAGE_KEY } from '@audius/libs/src/constants'
import { DISCOVERY_PROVIDER_TIMESTAMP } from '@audius/libs/src/services/discoveryProvider/constants'

const AUDIUS_ACCOUNT_KEY = '@audius/account'
const AUDIUS_ACCOUNT_USER_KEY = '@audius/audius-user'

export const init = async () => {
  const dataRegistryAddress = '0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2'

  const ethTokenAddress = '0xF0A4A438821d21e37150e9916569De7c156E898F'
  const ethRegistryAddress = '0x095284A8237b275aBB96E8587e60ed76983BE6A5'
  const ethProviderUrl = 'https://ropsten.infura.io/v3/b8d7e2bc1b8942a6859e2a840b82f09d'
  const ethProviderOwnerWallet = '0xC7310a03e930DD659E15305ed7e1F5Df0F0426C5'

  const libs = new Audius({
    web3Config: Audius.configInternalWeb3(
      dataRegistryAddress,
      ['https://core.poa.network']
    ),
    ethWeb3Config: Audius.configEthWeb3(
      ethTokenAddress,
      ethRegistryAddress,
      ethProviderUrl,
      ethProviderOwnerWallet
    ),
    discoveryProviderConfig: Audius.configDiscoveryProvider(),
    identityServiceConfig: Audius.configIdentityService(
      'https://identityservice.audius.co'
    ),
    creatorNodeConfig: Audius.configCreatorNode(
      'https://creatornode.audius.co'
    )
  })
  await libs.init()
  window.libs = libs
  return libs
}

const getValue = (key) => {
  if (window && window.localStorage) {
    const val = window.localStorage.getItem(key)
    return val ?? null
  }
  return null
}

const getJSONValue = (key) => {
  const val = getValue(key)
  if (val) {
    try {
      const parsed = JSON.parse(val)
      return parsed
    } catch (e) {
      return null
    }
  }
  return null
}

const setValue = (key, value) => {
  if (window && window.localStorage) {
    window.localStorage.setItem(key, value)
  }
}

const setJSONValue = (key, value) => {
  const string = JSON.stringify(value)
  setValue(key, string)
}

const removeItem = (key) => {
  if (window && window.localStorage) {
    window.localStorage.removeItem(key)
  }
}

export const getAudiusAccount = () => getJSONValue(AUDIUS_ACCOUNT_KEY)
export const setAudiusAccount = (value) => setJSONValue(AUDIUS_ACCOUNT_KEY, value)
export const clearAudiusAccount = () => removeItem(AUDIUS_ACCOUNT_KEY)
export const getAudiusAccountUser = () => getJSONValue(AUDIUS_ACCOUNT_USER_KEY)
export const setAudiusAccountUser = (value) => setJSONValue(AUDIUS_ACCOUNT_USER_KEY, value)
export const clearAudiusAccountUser = () => removeItem(AUDIUS_ACCOUNT_USER_KEY)
export const getCurrentUserExists = () => getValue(CURRENT_USER_EXISTS_LOCAL_STORAGE_KEY)
export const getCachedDiscoveryProvider = () => getJSONValue(DISCOVERY_PROVIDER_TIMESTAMP)