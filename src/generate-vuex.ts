// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import Vuex from './util/vuex'

export default class Generate {
  constructor(store: Object) {
    this.setStore(store)
  }

  // 私有方法
  _getRawModuleByNamespace(namespace: String) {
    if (namespace.charAt(namespace.length - 1) !== '/') {
      // 添加一个斜杠后缀
      // var namespace = "intent" ==> namespace = "intent/"
      namespace += '/'
    }
    const rawModule = this.store._modulesNamespaceMap[namespace]._rawModule
    if (process.env.NODE_ENV !== 'production' && !rawModule) {
      console.error(`[generate vuex] module namespace not found : ${namespace}`)
    }
    return rawModule
  }

  _getStateKeysByNamespace(namespace) {
    const state = this.store.state[namespace]
    if (process.env.NODE_ENV !== 'production' && !state) {
      console.error(`[generate vuex] module namespace not found : ${namespace}`)
    }
    return Object.keys(state)
  }

  // 对外暴露
  setStore(store) {
    if (!store instanceof Vuex.Store) {
      console.error(`getRawModule error: store must be constructed by Vuex.Store func.`)
      this.store = {}
    }
    this.store = store
    console.log('init: setStore', this.store)
  }

  getKeysOfModule(namespace, target) {
    if (process.env.NODE_ENV !== 'production' && !['actions', 'mutations', 'getters'].includes(target)) {
      // 单独处理 state, 跟其他几个模块获取的方式不同
      if (target === 'state') {
        return this._getStateKeysByNamespace(namespace)
      }
      console.error(`[generate vuex] the second param of getKeysOfModule need one of ['actions', 'mutations', 'getters'] but get typeof : ${typeof target}`)
      return []
    }
    const module = this._getRawModuleByNamespace(namespace)
    const keys = module[target]
    if (process.env.NODE_ENV !== 'production' && keys === undefined) {
      console.error(`[generate vuex] ${namespace} module do not have ${target}`)
      return []
    }
    return Object.keys(keys || [])
  }
}
