export default {
  artistTokenAddress(state, value) {
    state.artistTokenAddress = value
  },
  initialized(state, value) {
    state.initialized = value
  },
  balance(state, value) {
    state.balance = value
  },
  balanceDai(state, value) {
    state.balanceDai = value
  },
  connected(state, value) {
    state.connected = value
  },
  ethereumOk(state, value) {
    state.ethereumOk = value
  },
  ethPriceUsd(state, value) {
    state.ethPriceUsd = value
  },
  error(state, value) {
    state.error = value
  },
  address(state, value) {
    state.address = value
  },
  network(state, value) {
    state.network = value
  },
  ens(state, value) {
    state.ens = value
  },
  txState(state, value) {
    state.txState = value
  }
}
