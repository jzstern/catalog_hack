import actions from './actions'
import mutations from './mutations'

const state = {
  initialized: false,
  balance: null,
  balanceDai: null,
  connected: false,
  ethereumOk: null,
  ethPriceUsd: null,
  error: null,
  address: null,
  network: null,
  ens: null,
  txState: null
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
