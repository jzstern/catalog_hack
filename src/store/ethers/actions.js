/* eslint-disable */
import {
  MSGS,
  EVENT_CHANNEL,
  connect,
  event,
  ready,
  ethereumOk,
  getBalance,
  getProvider,
  getWallet,
  getWalletAddress,
  getNetName,
  // sendTransaction,
  hasEns
} from './ethersConnect'
// import { compileToFunctions } from 'vue-template-compiler'
// import { LogDescription } from 'ethers/lib/utils'

export default {
  async connect(ctx) {
    try {
      // const oldAddress = ctx.state.address;
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

      // const msg = oldAddress && oldAddress !== address
      //   ? `Your Ethereum address has changed.
      // Address: ${address}
      // Network: ${network}
      //    Your balance: ${await provider.getBalance(address)} wei`
      //   : `You are connected to the Ethereum Network.
      //    Address: ${address}
      //    Network: ${network}
      //    Your balance: ${await provider.getBalance(address)} wei
      //    If you change your address or network, this app will update automatically.`

      // console.log(msg)

      // Other vuex stores can wait for this
      event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_READY)

      // now check for .eth address too
      if (await hasEns()) {
        console.log('Net supports ENS. Checking...')
        const ens = await provider.lookupAddress(address)
        ctx.commit('ens', ens)
      }
    } catch (err) {
      // console.warn("Ethers connection error ⍉");
      // ctx.dispatch('disconnect', err)
    }
  },
  disconnect(ctx, err) {
    const oldAddress = ctx.state.address
    ctx.commit('connected', false)
    ctx.commit('error', err)
    ctx.commit('address', '')
    ctx.commit('network', '')
    ctx.commit('ens', null)

    const msg = err ? `There was an error: ${err.message}` : (oldAddress
      ? 'You have been disconnected from your Ethereum connection. Please check MetaMask, etc.'
      : 'You are not connected to an Ethereum node and wallet. Please check MetaMask, etc.')
    console.log(msg)
  },
  async getBalance(ctx) {
    ctx.commit('balance', await getBalance())
  },
  async init(ctx) {
    event.$on(EVENT_CHANNEL, async (msg) => {
      // console.log(msg)
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
          if (ctx.state.address) ctx.dispatch('getBalance', ctx.state.address)
          break
        case MSGS.NOT_CONNECTED:
          await ctx.dispatch('notConnected')
          break
      }
    })

    ctx.commit('ethereumOk', ethereumOk())
    if (ready()) await ctx.dispatch('connect')
    else ctx.commit('txState', 'intro')
    event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_INITIALIZED)
    ctx.commit('initialized', true)
  },
  async login() {
    connect()
  },
  logout(ctx) {
    ctx.commit('address', '')
    // console.log('You have been logged out from your Ethereum connection')
  },
  notConnected(ctx) {
    ctx.commit('address', '')
    console.log('You are not connected to the Ethereum network. Please check MetaMask, etc.')
  },
  // async tipCurrentSong(ctx, tip) {
  //   if (!ctx.state.ethereumOk || !ctx.state.connected) {
  //     ctx.commit('setTip', { ...tip, amountUsd: 0.25 }, { root: true });
  //     ctx.dispatch('login');
  //   } else {
  //     return new Promise((resolve, reject) => {
  //       sendTransaction(tip.artistWalletAddress, tip.amountEth).then(async (tx) => {
  //         tip = { ...tip, hash: tx.hash };

  //         ctx.commit('resetToastMessage', null, { root: true });
  //         ctx.commit('addPendingTip', tip, { root: true });
  //         ctx.commit('txState', 'pending');
  //         ctx.commit('setTip', { ...tip, amountUsd: 0.25 }, { root: true });

  //         const receipt = await tx.wait();
  //         resolve(receipt);
  //       }).catch((error) => {
  //         // if (e.code === 4001) // user rejection
  //         ctx.dispatch('txFailed');
  //         reject(error);
  //       });
  //     });
  //   }
  // },
  txConfirmed(ctx) {
    ctx.commit('txState', 'confirmed')
    setTimeout(() => {
      ctx.commit('txState', 'none')
    }, 7000)
  },
  txFailed(ctx) {
    ctx.commit('txState', 'failed')
    ctx.commit('resetToastMessage', null, { root: true })
    setTimeout(() => {
      ctx.commit('txState', 'none')
    }, 10000)
  },
}
