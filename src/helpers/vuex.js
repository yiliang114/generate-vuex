const vuex = {
  /**
   * 这个对象在实际VUEX STORE的运行时被替换. 
   * 原理在于 vuex 插件的 install
   */
  store: {
    state: null,

    commit() {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vuex Pathify] Plugin not initialized!')
      }
    },

    dispatch() {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vuex Pathify] Plugin not initialized!')
      }
    }
  }
}

export function commit(...args) {
  vuex.store.commit(...args)
}

export function dispatch(...args) {
  return vuex.store.dispatch(...args)
}

export default vuex
