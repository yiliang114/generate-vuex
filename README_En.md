## generate-vuex

![build](https://github.com/yiliang114/generate-vuex/workflows/auth%20publish/badge.svg?branch=master)

Generate-Vuex maybe can use as a plugin which makes you feel better when you use vuex. You need not to write simple mutation functions any more if you use it.

### Use

You can use generate-vuex in vuex child module, it can generate mutations and getters which you used to write repeatedly.

在 vuex 的任意一个子 module 中使用, 将自动生成 mutations 和 getters

```js
import { setFuncName, generateGetters, generateMutations } from 'generate-vuex'

const state = {
  msg: 'haha'
}
const mutations = {
  ...generateMutations(state)
}
const actions = {
  asyncChangeMsg({ commit }) {
    setTimeout(() => {
      commit(setFuncName('msg'), 'async heihei')
    }, 1000)
  }
}
const getters = {
  ...generateGetters(state)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```
