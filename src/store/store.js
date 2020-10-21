/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import ethers from "./ethers/index"
import state from "./state"
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { ethers },
  state,
  actions,
  mutations
})
