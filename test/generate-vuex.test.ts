import { setFuncName, generateGetters, generateMutations } from '../src/ts-generate-vuex'

describe('GenerateVuex test', () => {
  ;[
    ['test', 'setTest'],
    ['Test', 'setTest']
  ].forEach(([input, output], index) => {
    it('setFuncName ' + index, () => {
      expect(setFuncName(input)).toBe(output)
    })
  })

  const state = {
    a: 10,
    info: { name: 'yiliang114', age: 25 }
  }

  const getters = generateGetters(state)
  Object.keys(getters).forEach(name => {
    it('generateGetters ' + name, () => {
      expect(getters[name](state)).toEqual(state[name])
    })
  })

  const mutations = generateMutations(state)
  it('generateMutations function name: a', () => {
    mutations.setA(state, 20)
    expect(state.a).toEqual(20)
  })

  it('generateMutations function name: info', () => {
    mutations.setInfo(state, { name: 'yiliang114', age: 26 })
    expect(state.info).toEqual({ name: 'yiliang114', age: 26 })
  })
})
