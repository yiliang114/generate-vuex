import { generateAction, generateMutations } from '../src/ts-generate-vuex'

function asyncFunc() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200)
    }, 1000)
  })
}

const state = {
  a: 0
}

const mutations = generateMutations(state)
// 模拟提交
const commit = (type: string, payload?: any) => {
  if (mutations[type]) {
    mutations[type](state, payload)
  }
}

describe('generateAction test', () => {
  it('generateAction', async () => {
    const action = generateAction({ func: asyncFunc, stateName: 'a' })
    await action({ commit, state })
    expect(state.a).toBe(200)
  })
})
