import { setFuncName, generateGetters, generateMutations } from '../../../src/ts-generate-vuex.ts'

const state = {
  msg: 'haha'
}
const mutations = {
  ...generateMutations(state)
}
const actions = {
  asyncChangeMsg({ commit }) {
    setTimeout(() => {
      commit(setFuncName('msg'), 'async heihei')
    }, 1000)
  }
}
const getters = {
  ...generateGetters(state)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
