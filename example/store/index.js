import Vue from 'vue'
import Vuex from 'vuex'

import test from './modules/test'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const isProd = process.env.NODE_ENV === 'production'

export default new Vuex.Store({
  state: {},
  mutations: {},
  modules: {
    test
  },
  getters: {},
  plugins: !isProd ? [createLogger()] : [],
  strict: isProd
})
