/*
 * @Author: yiliang
 * @Date: 2018-12-05 15:38:19
 * @Last Modified by: yiliang114
 * @Last Modified time: 2019-08-06 09:59:30
 */
// 统一返回体, 将对应的键值替换上
const UNIFY_RESPONSE = {
  code: 'code',
  message: 'message',
  data: 'data',
}

// 跟随 generate.js 同时提供一套 axios 的封装函数

// 接口返回码正常, 一般为 200 或者 0, 其余情况都视为异常
const SUCCESS_CODE = 200


