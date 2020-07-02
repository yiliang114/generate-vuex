// plugin
import vuex from '../helpers/vuex'
// options
import accessorize from '../helpers/accessors'

/**
 * Store plugin which updates the store object with set() and get() methods
 *
 * @param {Object} store  The store object
 */
function plugin(store) {

  // cache store instance
  vuex.store = store

  // add pathify accessors 存取器
  accessorize(store)
}

export default {
  plugin,
}
