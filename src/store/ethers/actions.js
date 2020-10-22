/* eslint-disable */
import {
  MSGS,
  EVENT_CHANNEL,
  connect,
  event,
  ready,
  ethereumOk,
  getBalance,
  getBalanceDai,
  getProvider,
  getWallet,
  getWalletAddress,
  getNetName,
  sendDai,
  mintDai,
  stake,
  initContracts,
  hasEns,
  getArtistTokenAddress,
  registerArtistToken,
  getArtistTokenBalanceOfUser
} from './ethersConnect'

// import { compileToFunctions } from 'vue-template-compiler'
// import { LogDescription } from 'ethers/lib/utils'

export default {
  async connect(ctx) {
    try {
      const provider = getProvider()
      if (!provider) throw new Error(MSGS.NOT_CONNECTED)
      
      const wallet = getWallet()
      if (!wallet) throw new Error(MSGS.NO_WALLET)
      const address = await getWalletAddress()
      const network = await getNetName()

      ctx.commit('connected', true)
      ctx.commit('error', null)
      ctx.commit('address', address)
      ctx.commit('network', network)
      ctx.commit('txState', 'none')

      if (address) {
        console.log('mm connect', {address})
        ctx.dispatch('getBalances', address)
        // todo - update user object w/ MM wallet address

        const newUser = {
          ...ctx.rootState.user,
          wallet_addr_mm: address
        }

        ctx.dispatch('updateUser', newUser, { root: true })
      }

      // Other vuex stores can wait for this
      event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_READY)

      // now check for .eth address too
      if (await hasEns()) {
        console.log('Net supports ENS. Checking...')
        const ens = await provider.lookupAddress(address)
        ctx.commit('ens', ens)
      }
    } catch (err) {
      console.warn("Ethers connection error ⍉");
      ctx.dispatch('disconnect', err)
    }
  },
  disconnect(ctx, err) {
    const oldAddress = ctx.state.address
    ctx.commit('connected', false)
    ctx.commit('error', err)
    ctx.commit('address', '')
    // ctx.commit("logout", null, { root: true });
    ctx.commit('network', '')
    ctx.commit('ens', null)

    const msg = err ? `There was an error: ${err.message}` : (oldAddress
      ? 'You have been disconnected from your Ethereum connection. Please check MetaMask, etc.'
      : 'You are not connected to an Ethereum node and wallet. Please check MetaMask, etc.')
    console.log(msg)
  },
  async getBalances(ctx) {
    ctx.commit('balance', await getBalance())
    ctx.commit('balanceDai', await getBalanceDai())
  },
  async mintDai() {
    await mintDai()
    return "🤑"
  },
  async sendDai(ctx, { to, amount }) {
    await sendDai(to, amount)
    return "sent"
  },
  async init(ctx) {
    event.$on(EVENT_CHANNEL, async (msg) => {
      console.log(msg)
      switch (msg) {
        case MSGS.NOT_READY:
          console.log('disconnecting b/c NOT_READY')
          await ctx.dispatch('disconnect')
          break
        case MSGS.NO_WALLET:
          await ctx.dispatch('logout')
          break
        case MSGS.ACCOUNT_CHANGED:
          await ctx.dispatch('connect')
          break
        case MSGS.NETWORK_CHANGED:
          await ctx.dispatch('connect')
          if (ctx.state.address) ctx.dispatch('getBalances', ctx.state.address)
          break
        case MSGS.NOT_CONNECTED:
          await ctx.dispatch('notConnected')
          break
      }
    })

    ctx.commit('ethereumOk', ethereumOk())
    if (ready()) await ctx.dispatch('connect')
    await initContracts()
    event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_INITIALIZED)
    ctx.commit('initialized', true)
  },
  async login(ctx) {
    console.log('ethers/ logging in')
    connect()
  },
  async stake(ctx, artistWalletAddress) {
    await stake(artistWalletAddress)
    return "🥩"
  },
  async getArtistTokenAddress(ctx, artistWalletAddress) {
    const artistTokenAddress = await getArtistTokenAddress(artistWalletAddress)
    ctx.commit('artistTokenAddress', artistTokenAddress)
    return artistTokenAddress
  },
  async registerArtistToken(ctx) {
    const artistTokenAddress = await registerArtistToken()
    ctx.commit('artistTokenAddress', artistTokenAddress)
    return artistTokenAddress
  },
  async getArtistTokenBalanceOfUser(ctx, artistTokenContractAddress) {
    console.log('getArtistTokenBalanceOfUser top')
    const tokenBalance = await getArtistTokenBalanceOfUser(artistTokenContractAddress)
    console.log('getArtistTokenBalanceOfUser top finísh')
    console.log("tokenBalance");
    console.log(tokenBalance);
    return tokenBalance
  },
  logout(ctx) {
    ctx.commit('address', '')
    // todo - clear out wallet object
    // console.log('You have been logged out from your Ethereum connection')
  },
  notConnected(ctx) {
    ctx.commit('address', '')
    // ctx.commit("logout", null, { root: true });
    console.log('You are not connected to the Ethereum network. Please check MetaMask, etc.')
  },
  resetTxState(ctx) {
    ctx.commit('txState', null)
  },
  txConfirmed(ctx) {
    ctx.commit('txState', 'confirmed')
  },
  txFailed(ctx) {
    ctx.commit('txState', 'failed')
    // ctx.commit('resetToastMessage', null, { root: true })
    // setTimeout(() => {
    //   ctx.commit('txState', null)
    // }, 10000)
  },
}
