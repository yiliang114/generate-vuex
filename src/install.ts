/*
 * @Author: yiliang 
 * @Date: 2019-01-15 19:38:04 
 * @Last Modified by: mrjzhang
 * @Last Modified time: 2019-08-06 09:54:44
 * 
 * generate-vuex 的安装函数： 直接通过 Vue.use(generate-vuex) 来向 Vue 实例上拓展函数
 */
import generate from './helpers/store'
import { generateHelper } from './helpers'

let GenerateVuexPlugin = {}
GenerateVuexPlugin.install = function (Vue, options) {
  Vue.mixin({
    methods: {
      generateHelper: function () {
        // generateHelper.bind(this)
      }
    }
  })
  // 添加全局方法
  Vue.prototype.$generate = {
    generate,
    generateHelper
  }
}

export default GenerateVuexPlugin
