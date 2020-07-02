/*
 * @Author: yiliang 
 * @Date: 2019-01-15 20:30:18 
 * @Last Modified by: yiliang
 * @Last Modified time: 2019-01-16 11:16:54
 * 
 * 拷贝 vuex/helpers.js 中的一些工具函数
 */

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

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
export const normalizeNamespace = (fn) => {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      // 添加一个斜杠后缀
      // var namespace = "intent" ==> namespace = "intent/"
      namespace += '/'
    }
    return fn(namespace, map)
  }
}

