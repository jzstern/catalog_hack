/* eslint-disable */
import Vue from 'vue'
import {
  ethers,
  providers,
  Contract as ContractModule,
  utils as utilsModule
} from 'ethers'

export const ACCOUNT_CHECK_MS = 2000
export const ETHEREUM_TIMEOUT = 60 * 1000
// networks where ens exists
export const ENS_NETS = [1, 3, 4] // ? Mainet, Ropsten, ...
export const PROVIDER_TYPE = 'ethereum'

export const MSGS = {
  NOT_CONNECTED: 'Not connected to Ethereum network',
  NOT_READY: 'Ethereum network not ready',
  NO_WALLET: 'No Ethereum wallet detected',
  ACCOUNT_CHANGED: 'Ethereum account changed',
  NETWORK_CHANGED: 'Ethereum network changed',
  ETHERS_VUEX_INITIALIZED: 'Ethers vuex module initialized',
  ETHERS_VUEX_READY: 'Ethers vuex module ready'
}
export const EVENT_CHANNEL = 'ethers'
// use vue as a simple event channel
export const event = new Vue()
// expose ethers modules
export const utils = utilsModule
export const Contract = ContractModule

// ethereum transactions to log
// More information: https://docs.ethers.io/ethers.js/html/api-providers.html#events
export const LOG_TRANSACTIONS = [
  'block'
  // can also be an address or transaction hash
  // [] // list of topics, empty for all topics
]

// * max uint256 * 115792089237316195423570985008687907853269984665640564039457584007913129639935
const CATALOG_CONTRACT_ADDRESS = '0x1e0FcC8644b40A53f5272C8A0B5E5Bd9ca697553'
const DAI_CONTRACT_ADDRESS = '0x65a0D7D0e47ccF0501985246542E5d88740B5E45'
const artistPoolAbi = require('./abi/artistPool.json')
const catalogAbi = require('./abi/catalog.json')
const distributorAbi = require('./abi/IDistributor.json')
const IERC20 = require('./abi/IERC20.json')
const daiAbi = require('./abi/dai.json')
const params = { gasLimit: 500000 }

// for ethers
let ethereum
let provider
let chainId
let userWallet
let currentAccount
let providerInterval
let daiContract
let daiMintContract
let catalogContract
let initialized


/* * * * * * * * * * * *
 * ARTIST TOKEN STUFF
* * * * * * * * * * * */

async function hasUserApprovedPool(contract, owner, spender, amount) {
  return (await contract.allowance(owner, spender)).gte(amount)
}

export async function getArtistInfo(artistAddress) {
  const info = await catalogContract.artists(artistAddress)
  console.log('getArtistInfo', {info, artistAddress, catalogContract })
  return info
}

export async function getNumTokensReceived(artistAddress, daiAmount) {
  const { distributor } = await getArtistInfo(artistAddress)
  console.log(distributor);
  const distributorContract = new ethers.Contract(distributor, distributorAbi.abi, userWallet)

  const uintDaiAmount = utils.parseEther(daiAmount)

  const numTokensReceived = await distributorContract.getReward(uintDaiAmount)

  return fromDai(numTokensReceived).toString()
}

export async function  getStakedArtistTokens(artistAddress) {
  const { pool, token, distributor } = await getArtistInfo(artistAddress)
  const poolContract = new ethers.Contract(pool, artistPoolAbi.abi, userWallet)

  const stakedTokenAmt = await poolContract.stakes(currentAccount)

  return utils.formatEther(stakedTokenAmt.toString())
}

async function stakeArtistTokens(poolContract, artistTokenBalance) {
  await poolContract.stake(artistTokenBalance, params)
}

export async function getArtistTokenAddress(artistWalletAddress) {
  const res = await catalogContract.artists(artistWalletAddress)
  // console.log({res}, Object.keys(res), res.registered)
  if (res.registered) return res.token
  return null
}

export async function initContracts() {
  catalogContract = new ethers.Contract(CATALOG_CONTRACT_ADDRESS, catalogAbi.abi, userWallet)
  daiContract = new ethers.Contract(DAI_CONTRACT_ADDRESS, IERC20.abi, userWallet);
  daiMintContract = new ethers.Contract(DAI_CONTRACT_ADDRESS, daiAbi.abi, userWallet);
}

export async function registerArtistToken() {
  await catalogContract.register()
  const artistTokenAddress = (await catalogContract.artists(currentAccount)).token
  return artistTokenAddress
}

async function approve() {
  await daiContract.approve(CATALOG_CONTRACT_ADDRESS, ethers.constants.MaxUint256)
}

async function approvePool(contract, poolAddress) {
  await contract.approve(poolAddress, ethers.constants.MaxUint256)
}

export async function stake(artistAddress) {
  const { pool, token } = await getArtistInfo(artistAddress)
  const artistTokenContract = new ethers.Contract(token, IERC20.abi, userWallet)
  const poolContract = new ethers.Contract(pool, artistPoolAbi.abi, userWallet)
  const artistTokenBalance = await artistTokenContract.balanceOf(currentAccount)

  if (!artistTokenBalance) {
    alert('no artist tokens to stake (yet... try again in a few)')
    return
  }

  const approved = await hasUserApprovedPool(artistTokenContract, currentAccount, poolContract.address, artistTokenBalance)

  if (!approved) {
    console.log("waiting for approval to spend artitst token: " + artistTokenContract.address)
    await approvePool(artistTokenContract, poolContract.address)
    console.log("approved to spend: " + artistTokenContract.address)
  }

  console.log("staking " + fromDai(artistTokenBalance).toString() + " artist tokens");
  await stakeArtistTokens(poolContract, artistTokenBalance)
  console.log("staking successful");

  return
}

// function initArtistTokenContract(artistTokenContractAddress) {
//   artistTokenContract =
//   return artistTokenContract
// }

export async function getArtistTokenBalanceOfUser(artistTokenContractAddress) {
  // console.log('inner 0', artistTokenContractAddress)
  const artistTokenContract = new ethers.Contract(artistTokenContractAddress, IERC20.abi, userWallet)
  // console.log('inner 1', artistTokenContract)
  // console.log({artistTokenContract, artistTokenContractAddress, currentAccount})
  const balance = fromDai(await artistTokenContract.balanceOf(currentAccount)).toString()
  // console.log({balance})
  return balance
}

/* * * * * * *
 * DAI STUFF
* * * * * * * */

async function hasUserApprovedDai(owner, spender, amount) {
  return (await daiContract.allowance(owner, spender)).gte(amount)
}

export async function sendDai(to, amount) {
  // TODO - check this on the FE
  const balance = fromDai(await daiContract.balanceOf(currentAccount)).toString()
  const balanceInt = Number(balance)
  const amountInt = Number(amount)

  if (balanceInt < amountInt) {
    alert('dai balance too low')
    return
  }

  const amountBigNum = utils.parseEther(amount.toString()).toString()
  const approved = await hasUserApprovedDai(currentAccount, CATALOG_CONTRACT_ADDRESS, amountBigNum)

  if (!approved) {
    console.log("waiting for approval to spend DAI")
    await approve()
    console.log("approved to spend DAI")
  }

  await catalogContract.split(to, amountBigNum, params)
  return
}

export async function getBalanceDai() {
  const balanceDai = fromDai(await daiContract.balanceOf(currentAccount)).toString()
  return balanceDai
}

export async function mintDai() {
  const amount = utils.parseEther('100000000000000000000').toString()
  await daiMintContract.mint(currentAccount, '100000000000000000000')
  return
}

function fromDai(value) {
  return value.div('1000000000000000000')
}

/* * * * * * * * * * * * * * * *
 * general ethers.js stuff
* * * * * * * * * * * * * * * */

// For now, 'eth_accounts' will continue to always return an array
export function handleAccountsChanged(accounts) {
  // MetaMask is locked or the user has not connected any accounts
  if (accounts.length === 0) event.$emit(EVENT_CHANNEL, MSGS.NO_WALLET)
  else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0]
    userWallet = provider.getSigner(currentAccount)
    // userWallet = provider && provider.getSigner(currentAccount)
    event.$emit(EVENT_CHANNEL, MSGS.ACCOUNT_CHANGED)
  }
  else event.$emit(EVENT_CHANNEL, MSGS.ACCOUNT_CHANGED)
}

export function connect() {
  if (!ethereum) return event.$emit(EVENT_CHANNEL, MSGS.NOT_CONNECTED)
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('User rejected the connection request. Please connect to an Ethereum wallet')
        event.$emit(EVENT_CHANNEL, MSGS.NOT_READY)
      } else {
        console.error('Error requesting Ethereum connection/accounts', err)
        event.$emit(EVENT_CHANNEL, MSGS.NOT_READY)
      }
      event.$emit(EVENT_CHANNEL, MSGS.ACCOUNT_CHANGED)
    })
}

export async function getBalance() {
  const balanceWei = await provider.getBalance(currentAccount)
  return utils.formatUnits(balanceWei)
}

export function getProvider() {
  return provider
}

export function getWallet() {
  return userWallet
}

export async function getWalletAddress() {
  const addr = userWallet && await userWallet.getAddress()
  return addr
}

export function ready() {
  return !!provider && !!userWallet
}

export async function sendTransaction(to, amount) {
  const value = await utils.parseEther(amount.toString().substr(0, 18))
  const txArgs = { to, value }

  return new Promise((resolve, reject) => {
    userWallet.sendTransaction(txArgs).then((tx) => {
      resolve(tx)
    }, (error) => reject(error))
  })
}

function getEthereum() {
  return window.ethereum
}

export function ethereumOk() {
  const em = getEthereum()
  return em && em.isConnected()
}

export async function getNetName() {
  switch (chainId) {
    case '0x1':
      return 'Mainnet'
    case '0x2':
      return 'Morden (deprecated)'
    case '0x3':
      return 'Ropsten'
    case '0x4':
      return 'Rinkeby'
    case '0x5':
      return 'Goerli'
    case '0x2a':
      return 'Kovan'
    case undefined:
    case null:
      return 'No chain 🤷‍♀️'
    // if you give your ganache an id your can detect it here if you want
    default:
      return 'Unknown 🤷‍♀️'
  }
}

export async function hasEns() {
  return ENS_NETS.includes(chainId)
}

function handleChainChanged(_chainId) {
  chainId = _chainId
  event.$emit(EVENT_CHANNEL, MSGS.NETWORK_CHANGED)
  // window.location.reload()
}

// get deployed address for a contract from its networks object and current network id or null
export async function getNetworkAddress(networks) {
  if (!networks[chainId] || !networks[chainId].address) return null
  return networks[chainId].address
}

// this should only be run when a ethereum provider is detected and set at the ethereum value above
export async function startProviderWatcher() {
  async function updateProvider() {
    ethereum = getEthereum()
    if (!ethereum) return
    // set ethers provider
    provider = new providers.Web3Provider(ethereum)
    initialized = true

    // Normally, we would recommend the 'eth_chainId' RPC method, but it currently
    // returns incorrectly formatted chain ID values.
    chainId = ethereum.chainId

    ethereum.autoRefreshOnNetworkChange = false
    ethereum.on('chainChanged', handleChainChanged)

    /** ******************************************************** */
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /** ******************************************************** */

    ethereum
      .request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error('Error requesting ethereum accounts', err)
        event.$emit(EVENT_CHANNEL, MSGS.NO_WALLET)
      })

    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    ethereum.on('accountsChanged', handleAccountsChanged)
  }

  function checkProvider() {
    // handle changes of availability of ethereum provider
    if (ethereum && !ethereumOk()) {
      ethereum = null
      provider = null
      chainId = null
      currentAccount = null
      userWallet = null
      event.$emit(EVENT_CHANNEL, MSGS.NOT_READY)
    } else if (!ethereum && ethereumOk()) {
      updateProvider()
    }
  }

  // kick it off now
  checkProvider()
  // and set interval
  providerInterval = setInterval(checkProvider, ACCOUNT_CHECK_MS)
}

// stop interval looking for ethereum provider changes
export async function stopWatchProvider() {
  if (providerInterval) clearInterval(providerInterval)
  providerInterval = null
}

startProviderWatcher()
