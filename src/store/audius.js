import Audius from '@audius/libs'

export default async function init() {
  const dataRegistryAddress = '0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2'

  const ethTokenAddress = '0xADEf65C0f6a30Dcb5f88Eb8653BBFe09Bf99864f'
  const ethRegistryAddress = '0xb2be26Ca062c5D74964921B80DE6cfa28D9A36c0'
  const ethProviderUrl = 'https://mainnet.infura.io/v3/d6b566d7eea1408988388c311d5a273a'
  const ethProviderOwnerWallet = '0xe886a1858d2d368ef8f02c65bdd470396a1ab188'

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