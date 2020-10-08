import actions from './actions'
import mutations from './mutations'

const state = () => ({
  initialized: false,
  balance: null,
  connected: false,
  ethereumOk: null,
  ethPriceUsd: null,
  error: null,
  address: '',
  network: '',
  ens: null,
  txState: null
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
