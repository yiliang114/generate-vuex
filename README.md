## generate-vuex

![master action](https://github.com/yiliang114/generate-vuex/workflows/master%20action/badge.svg)

Generate-Vuex maybe can use as a plugin which makes you feel better when you use vuex. You need not to write simple mutation functions any more if you use it.

### 使用

在 vuex 的任意一个子 module 中使用, 将自动生成 mutations 和 getters, 不用再重复写它了~

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
