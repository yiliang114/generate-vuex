/*
 * @Author: yiliang 
 * @Date: 2018-11-16 20:09:27 
 * @Last Modified by: yiliang
 * @Last Modified time: 2019-01-15 19:21:44
 */
import formatters from './formatters'

const resolvers = {

  /**
   * Standard name mapping function
   */
  standard(type, name, formatters) {
    switch (type) {
      case 'mutations':
        return formatters.const('set', name) // SET_BAR
      case 'actions':
        return formatters.camel('set', name) // setBar
    }
    return name // bar
  },

  /**
   * Simple name mapping function
   */
  simple(type, name, formatters) {
    if (type === 'actions') {
      return formatters.camel('set', name) // setBar
    }
    return name // bar
  },

}

/**
 * TODO： 需要针对 - _ 全部统一为 小驼峰命名
 * @param {*} key 
 */
export const setFuncName = (key) => `set${key.slice(0, 1).toUpperCase() + key.slice(1)}`

export const resolveName = (type, name) => {
  // TODO: 需要对 name 做一定正则校验，实现特殊符号的能力
  if (!name) {
    return ''
  }
  return resolvers.standard(type, name, formatters)
}

const getKeys = (value) => {
  return !value
    ? []
    : Array.isArray(value)
      ? value.map(key => String(key))
      : typeof value === 'object'
        ? Object.keys(value)
        : typeof value === 'string'
          ? value.match(/\w+/g) || []
          : []
}

export function getStateKeys(state) {
  return getKeys(state instanceof Function ? state() : state)
}

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
export const normalizeMap = (map) => {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

// 检验是否是一个 promise
export const isPromise = (obj) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}
