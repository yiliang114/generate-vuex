/*
 * @Author: yiliang 
 * @Date: 2018-12-14 17:15:01 
 * @Last Modified by: yiliang
 * @Last Modified time: 2019-01-14 17:32:13
 */
import { resolveName, getStateKeys, normalizeMap, isPromise } from '../util/index'
import formatters from '../util/formatters'

/**
 * ['stateName1','stateName2', 'stateName3']
 * @param {*} stateKeys 
 */
const generateGetters = (stateKeys) => {
  if (!Array.isArray(stateKeys) && process.env.NODE_ENV !== 'production') {
    // 简单一点，如果不是传入一个数组， dev 环境下直接报错
    console.error(`[generate-vuex] param of generateGetters expects array but get: ${typeof stateKeys}`)
    return {}
  }
  return stateKeys.reduce((obj, key) => {
    // TODO: 如果开发者传入的参数 stateKeys 包含 state 中不含的 key
    obj[key] = function (state) {
      return state[key]
    }
    return obj
  }, {});
  // return getStateKeys(state)
  //   .reduce(function (obj, key) {
  //     obj[key] = function (state) {
  //       return state[key]
  //     }
  //     return obj
  //   }, {})
}

function generateMutations(mutationKeys) {
  if (!Array.isArray(mutationKeys) && process.env.NODE_ENV !== 'production') {
    // 简单一点，如果不是传入一个数组， dev 环境下直接报错
    console.error(`[generate-vuex] param of generateMutations expects array but get: ${typeof mutationKeys}`)
    return {}
  }
  return mutationKeys.reduce((obj, key) => {
    const mutationFuncName = resolveName('mutations', key)
    obj[mutationFuncName] = function (state, value) {
      state[key] = value
    }
    return obj
  }, {})
}

/**
 * 生成异步 action 的函数
 * @param {*} createPromise 这个参数是其实是 api 函数，返回一个 promise
 * @param {*} targetStateName 这个参数可以理解为，promise 返回的结果经过处理后赋值为 state 中的哪一项
 * @param {*} successCallback api 成功回调，一般用于处理过滤接口返回的结果
 * @param {*} failCallback api 失败回调
 */
function generateAction(createPromise, targetStateName, successCallback, failCallback) {

  if (typeof createPromise !== 'function' && process.env.NODE_ENV !== 'production') {
    // 简单一点，如果不是传入一个数组， dev 环境下直接报错
    console.error(`[generate-vuex] the first param of generateAction expects function but get: ${typeof createPromise}`)
    return {}
  }
  // todo: 隐藏了一个 bug， 如果用户传入的 targetStateName 在 state 中没有进行声明就有问题
  if (!targetStateName && process.env.NODE_ENV !== 'production') {
    console.error('[generate-vuex] the second param of generateAction is required.')
    return {}
  }

  return async function ({ commit, state }, params = {}) {
    let result
    const mutation = resolveName('mutations', targetStateName)
    // 传到外部变量，便于直接 await 获取
    await createPromise(params).then(resp => {
      result = successCallback && successCallback(resp) || resp
      commit(mutation, result)
    }, err => {
      failCallback && failCallback(err)
    })
    return result
  }
}

export default {
  getters: generateGetters,
  mutations: generateMutations,
  // actions 需要和 generateState 一起使用
  action: generateAction
}