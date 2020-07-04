/*
 * @Author: yiliang
 * @Date: 2018-12-19 15:10:50
 * @Last Modified by: yiliang
 * @Last Modified time: 2019-01-16 16:00:14
 * vuex 的表单处理的一种方案： https://vuex.vuejs.org/zh/guide/forms.html
 */
import Vuex, { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { resolveName, getStateKeys, isObject } from './util/index'
import { normalizeMap, normalizeNamespace } from './util/vuex-helpers'
import vuex from './helpers/vuex'

export const mapStateSync = (namespace, states) => {

  // 先获取到所有（传参的）states
  const get = mapState(namespace, states)
  // get 的 key 就是 stateName 本身
  const stateKeys = getStateKeys(get)

  if (typeof namespace !== 'string') {
    states = namespace
    namespace = ''
  } else if (namespace.charAt(namespace.length - 1) !== '/') {
    namespace += '/'
  }

  // 获取所有对应的 get 的 states 的 mutation
  return stateKeys.reduce((obj, key) => {
    obj[key] = {
      get: get[key],
      set: function mappedMutation(...args) {

        // Get the commit method from store
        let commit = this.$store.commit
        if (namespace) {
          const module = getModuleByNamespace(this.$store, 'mapMutations', namespace)
          if (!module) {
            return
          }
          commit = module.context.commit
        }
        // 这里暂时就不支持 function 形式的了，因为 states 也可能给传 functions 的
        return commit.apply(this.$store, [resolveName('mutations', key)].concat(args))
      }
    }
    return obj
  }, {});
}


/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace(store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}

// todo:
// 1. mapFunc 的 全量导入(*), 符号筛选(直接通过 mapState('demo',{haha: "haha.demo.xx.y"})), 快捷方式 @actions, @mutations, @state, @getters
export const _get = (path, props) => {
  if (typeof path !== 'string' && process.env.NODE_ENV !== 'production') {
    console.error(`[generate-vuex] param of get expects string but get: ${typeof path}`)
    return {}
  }
  // 校验 path 中是否携带特殊的字符
  const special = ['@state', '@actions', '@mutations', '@getters']
  if (path.includes('*')) {
    // todo:
    // 处理 path ，截取 '/'
    const namespace = 'test'
    // 子模块的 state 可以直接从 this.$store.state.xxx 中获取， 而 getters 就需要拼接字符串来获取了，直接扩展到了一个对象中
    // 但是 actions mutations 不会对外暴露，也就是说需要手动 commit 以及 dispatch
    // actions mutations 的函数名称，全都通过 this.$store._modulesNamespaceMap[namespace].rawModule 来获取。。 这些都是未经过加工的 module内容

    // todo: 不精确的 get
    // 调用方式：
    // 1. mapState(...stateHelper('namespace', "*"))
    // 2. get('namespace', "*") get 本身是对 mapState 进行的封装

    // todo: 精确的 get
    // 调用方式：
    // get('namespace', ['xxx/yyy.c.b.e']) get 本身是对 mapState 进行的封装
    const state = vuex.$store.state
    return {
      state: mapState(...stateHelper('namespace', ["@actions"])),
      getters: mapGetters('namespace', ["@actions"]),
      mutations: mapMutations('namespace', ["@actions"]),
      actions: mapActions('namespace', ["@actions"]),
    }
  }

}


/**
 * 从 store 中获取 raw module
 * @param {*} namespace
 * @param {*} store
 */
function getRawModule(namespace, store) {
  if (!namespace) {
    console.error(`getRawModule error: namespace is required.`)
    return {}
  }
  if (!store) {
    console.error(`getRawModule error: store is undefined.`)
    return {}
  }
  if (!store instanceof Vuex.Store) {
    console.error(`getRawModule error: store must be constructed by Vuex.Store func.`)
    return {}
  }
  // _modulesNamespaceMap:
  // todo/: Module { runtime: false, _children: { … }, _rawModule: { … }, state: { … }, context: { … } }
  // user/: Module { ... }
  if (namespace.charAt(namespace.length - 1) !== '/') {
    // 添加一个斜杠后缀
    // var namespace = "intent" ==> namespace = "intent/"
    namespace += '/'
  }
  return store._modulesNamespaceMap[namespace]._rawModule
}


/**
 * 这个函数的作用是将输入的 特殊快捷输入法，转化为实际的键值
 * 比如第二个参数值为 *，则表示实际的值为 ['@state','@getters','@actions','@mutations']
 * 比如第二个参数值为 @state， 则表示实际的值为 ['todos','todoDetail'] (todo store module)
 * 比如第二个参数值为 xxx.yyy.cc， 则表示实际的值为 ['xxx'], 但是自动经过 computed 进行处理，传出所需要的的子属性 yyy 的属性 cc 值
 * todo:
 * 先暂时只处理 shortCuts 是数组的情况
 * @param {*} namespace
 * @param {*} shortCuts
 */
export const stateHelper = (namespace, shortCuts) => {
  if (typeof namespace !== 'string') {
    shortCuts = namespace
    namespace = ''
  }
  let states = []
  // 先处理特殊的符号标识
  if (Array.prototype.includes.call(shortCuts, '@state')) {
    states = Object.keys(this.$store.state[namespace] || {})
  }

  // 只输入一个参数的情况，就是省略了 namespace
  // if (!shortCut && typeof namespace !== 'string' && isObject(namespace)) {
  //   shortCut = normalizeMap(namespace)
  //   namespace = ''
  // }

  // if (typeof shortCut !== 'string' && process.env.NODE_ENV !== 'production') {
  //   console.error(`[generate-vuex: stateHelper] param of get expects Array but get: ${typeof shortCut}`)
  //   return {}
  // }

  return [namespace, states]
}

/**
 * 只需要获取某个 namespace 中的键 数组就行了。。。后面还是交给 vuex helpers func
 * @param {*} namespace
 * @param {*} shortCuts
 *  注意： 箭头函数的 this 不会被绑定，定义处的 this 指向什么值就是什么值，严格模式下全局函数中的 this 值就是 undefined
 *        而且对于箭头函数来说， bind call apply 的使用对箭头函数只起到传参数的作用，不会改变 this 的值
 */
export function generateHelper(namespace, shortCuts) {
  if (typeof namespace !== 'string') {
    shortCuts = namespace
    namespace = ''
  }
  console.log('namespace', namespace);
  const store = vuex.store
  // 这里可以直接 从 _action 中通过命名直接来获取
  const rawModule = getRawModule(namespace, store)
  console.log('rawModule', rawModule);
  let obj = {}
  let target = ''
  shortCuts.forEach(value => {
    if (value.charAt(0) === '@')
      target = value.slice(1)
    console.log(target);
    // 处理特殊的符号标识
    switch (value) {
      case '@state':
        obj.state = Object.keys(this.$store.state[namespace] || {})
        break;
      case '@getters':
      // obj.getters = Object.keys(rawModule.getters || {})
      // break;
      case '@actions':
      // obj.actions = Object.keys(rawModule.actions || {})
      // break;
      case '@mutations':
        // obj.mutations = Object.keys(rawModule.mutations || {})
        obj[target] = Object.keys(rawModule[target] || {})
        break;
    }
  })
  return [namespace, obj[target]]
}

/**
 * get 是对 generateHelper 和 mapFunc 的封装
 * @param {*} namespace
 * @param {*} shortCuts
 */
export function get(namespace, shortCuts) {
  console.log('get', this)
  return mapActions(...generateHelper.apply(this, ["todo", ["@actions"]]))
}
