/**
 * vuex store 生成器 v1.1.0
 * 暴露4个生成器：state, getters, mutations, actions
 * 暴露3种action: start, perform, cancel
 * 主要用于封装状态机，底层还是vuex state, getters, mutations, actions
 * http://vuex.vuejs.org/
 */
import { returnGetterParams } from '../config'

const MUTATIONS = {
  START: 'start',
  PERFORM: 'perform',
  DONE: 'done',
  FAIL: 'fail',
  CANCEL: 'cancel'
}

export const STAGES = {
  PENDING: 'Pending',
  STARTED: 'Started',
  LOADING: 'Loading',
  DONE: 'Done',
  FAIL: 'Fail'
}

const getMutationTypes = (stateName) => {
  return {
    START: `${stateName}_${MUTATIONS.START}`,
    PERFORM: `${stateName}_${MUTATIONS.PERFORM}`,
    DONE: `${stateName}_${MUTATIONS.DONE}`,
    FAIL: `${stateName}_${MUTATIONS.FAIL}`,
    CANCEL: `${stateName}_${MUTATIONS.CANCEL}`
  }
}

export const generateState = () => {
  return {
    stage: STAGES.PENDING,
    params: null,
    data: null,
    error: null
  }
}

// v1.2 实际调用的过程中 state 中重复的内容太多了，直接自动生成
export const generateAllStates = (stateName) => {
  const keys = stateName && Object.keys(stateName)
  if (!keys) return {}
  let state = {}
  keys.forEach(key => {
    state[`${stateName[key]}`] = generateState(`${stateName[key]}`)
  });
  return state
}

export const generateGetters = (stateName) => {
  // getters 实际要使用 stage 和 error 的时候很少，最多是在 devtools 中看一眼异步操作的状态
  return returnGetterParams && returnGetterParams.reduce((obj, key) => {
    obj[`${stateName}_${key}`] = state => state[stateName][key]
    return obj
  }, {})


  // return {
  //   [`${stateName}_data`]: state => state[stateName].data,
  //   [`${stateName}_stage`]: state => state[stateName].stage,
  //   [`${stateName}_params`]: state => state[stateName].params,
  //   [`${stateName}_error`]: state => state[stateName].error
  // }
}

// v1.2 实际调用的过程中 getters 中重复的内容太多了，直接自动生成
export const generateAllGetters = (stateName) => {
  const keys = stateName && Object.keys(stateName)
  if (!keys) return {}
  let getters = {}
  keys.forEach(key => {
    getters = {
      ...getters,
      ...generateGetters(`${stateName[key]}`)
    }
  });
  return getters
}

export const generateMutations = (stateName) => {
  const types = getMutationTypes(stateName)
  return {
    [types.START]: (state, params) => {
      state[stateName].error = null
      state[stateName].stage = STAGES.STARTED
      if (params) {
        state[stateName].params = params
      }
    },
    [types.PERFORM]: (state, params) => {
      state[stateName].error = null
      state[stateName].stage = STAGES.LOADING
      if (params) {
        state[stateName].params = params
      }
    },
    [types.CANCEL]: (state) => {
      state[stateName].stage = STAGES.PENDING
    },
    [types.DONE]: (state, data) => {
      state[stateName].stage = STAGES.DONE
      state[stateName].data = data
    },
    [types.FAIL]: (state, err) => {
      state[stateName].stage = STAGES.FAIL
      state[stateName].error = err
    }
  }
}

// v1.2 实际调用的过程中 mutations 中重复的内容太多了，直接自动生成
export const generateAllMutations = (stateName) => {
  const keys = stateName && Object.keys(stateName)
  if (!keys) return {}
  let mutations = {}
  keys.forEach(key => {
    mutations = {
      ...mutations,
      ...generateMutations(`${stateName[key]}`)
    }
  });
  return mutations
}

export const generateActions = (stateName, {
    createPerformPromise
  }) => {
  const types = getMutationTypes(stateName)
  return {
    [`${stateName}_start`]({ commit, state }, params = {}) {
      // start 方法对 params 补充更新
      commit(types.START, { ...state[stateName].params, ...params })
    },
    async [`${stateName}_perform`]({ commit, state, getters }, params = {}) {
      const completeParams = { ...state[stateName].params, ...params }
      // perform 方法对 params 补充更新
      commit(types.PERFORM, completeParams)
      await createPerformPromise(completeParams)
        .then((data) => {
          commit(types.DONE, data)
          // TODO: 
          // data: { "code": 301, "message": "parameters illegal" } 这种错误只能手动来 commit 了...
          //   commit(types.DONE, data)
          // } else {
          //   commit(types.FAIL, data)
          // }
        })
        .catch((err) => {
          commit(types.FAIL, err)
        })
      return {
        data: getters[`${stateName}_data`] || {},
        error: getters[`${stateName}_error`] || {}
      }
    },
    // 手动更新action, 直接替换state tree里的data字段
    [`${stateName}_update`]({ commit }, data) {
      commit(types.DONE, data)
    },
    // 取消正在进行中的异步操作
    [`${stateName}_cancel`]({ commit, state }) {
      if (state[stateName].stage === STAGES.LOADING) return;
      commit(types.CANCEL)
    }
  }
}


// TODO:
// 1. 直接 export 已存在的   state,mutations,actions,getters, namespace 默认开启
// 2. 直接导入 vuex modules 模块 mutations 模块 getters 模块等
// 3. ts 代码提示
// 4. 单元测试
// 5. 感觉 getter 太多了没有必要，声明式 过滤一部分
// 6. 希望封装 axios 之后，能够和后台约定之后，resp 中的 code 和 data 字段是固定的， vuex 中的某一个 state 的 data 
// 不要再记录 code 这些对渲染来说无意义的字段了。

// 7. dispatch a. beforeCallback b. successCallback c. failCallback


// FIXME:
// 1. mutations 的名字跟 actions 的名字其实是重复的。。。可以么也可以。。。
// 2. 貌似没办法处理 data: {"code":301,"message":"parameters illegal"} 这种错误。 这里如果写进 generate.js 中的话，貌似会对后台接口的返回有要求了。。。
// 最好的方式可能是配置文件
// 3. 想了想，这里是不是同一返回体应该跟 vuex 这里无关，应该在 axios 里直接做掉就行了。。。"code":301 到 data 中已经说明不对了


// DOC:
// 尽量推荐使用标准的返回体，resp 包含 code message 以及 data
// code === 0 或者 200 取 data 赋值给 store 的 data
// code !== 0 则取 message 赋值给 store 的 error

// 如果项目是渐进式的，即接口前期不是规范的，后期是标准返回体的，提供一个配置文件

// generateGetters
// generateGetters(STATENAME.xxx, 'data')
// generateGetters(STATENAME.xxx, 'error')
// generateGetters(STATENAME.xxx) 生成全部 data param error status 的 getters
// generateGetters(STATENAME) 生成全部
