import { GenerateType, State, Getters, Mutations, MutationValue } from '../types'

/**
 * @param {*} key
 */
export const setFuncName: (key: string) => string = key => `set${key.slice(0, 1).toUpperCase() + key.slice(1)}`
/**
 * generateGetters
 * info: { age: 20, friendship: [{ name: 'wang', age: 20}, ...]} } 可以直接通过 infoAge 以及 infoFriendshipName 来获取
 * 最多添加 2 层， 可以输入一个参数，不要深度遍历
 * @param {*} state
 * @param {*} deep 是否需要深度遍历
 */
export const generateGetters: GenerateType<Getters> = (state: State) => {
  const keys = state && Object.keys(state)
  if (!keys) return {}
  const getters: Getters = {}
  keys.forEach(key => {
    getters[key] = (state: State) => state[key]
  })
  return getters
}

export const generateMutations: GenerateType<Mutations> = (state: State) => {
  const keys = state && Object.keys(state)
  if (!keys) return {}
  let mutations: Mutations = {}
  keys.forEach(key => {
    mutations[setFuncName(key)] = (state: State, value: MutationValue) => {
      if (value !== undefined) {
        state[key] = value
      }
    }
  })
  return mutations
}
