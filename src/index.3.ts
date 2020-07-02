/*
 * @Author: yiliang 
 * @Date: 2018-12-05 16:48:12 
 * @Last Modified by: yiliang
 * @Last Modified time: 2019-01-16 16:10:02
 */
import generate from './helpers/store'
import { generateState, generateGetters, generateMutations, generateAllStates, generateAllGetters, generateAllMutations, generateActions } from './helpers/generator-v1'
import { returnGetterParams } from './config'
import { setFuncName, getStateKeys } from './util/index'
// import { generateStates, generateGetters } from './helpers/generator'
import GenerateVuexPlugin from './install'
import {
  mapStateSync, generateHelper, get
} from './helpers'
import GenerateClass from './classes/Generate'

import generateVuex from './plugin/generate-vuex'

function getState() {
  return this.$store.state || {}
}

export {
  // config
  returnGetterParams,

  // tool func
  getStateKeys,
  setFuncName,

  // v1.x
  generateState,
  generateAllStates,
  generateGetters,
  generateAllGetters,
  generateMutations,
  generateAllMutations,
  generateActions,


  // v2.x
  // in store
  generate,

  // v2.x
  // 异步

  // helpers
  // store 中的属性的双向绑定
  mapStateSync,
  // todo:
  // 1. mapFunc 的 全量导入(*), 符号筛选(直接通过 mapState('demo',{haha: "haha.demo.xx.y"})), 快捷方式 @actions, @mutations, @state, @getters
  // 2. 异步 action 处理 貌似 done
  // 3. 直接生成 mutation 貌似 done


  getState,
  generateHelper,

  get,
  GenerateVuexPlugin,

  GenerateClass,

  generateVuex
}