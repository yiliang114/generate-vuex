## generate-vuex@2

定义一下 2.x 版本的 api, 这里有参考 [vuex-pathify](https://github.com/davestewart/vuex-pathify)

### in store

在 store 中使用。
根据传入的 state， 自动生成全部的 getters, mutations, actions

// TODO: 这里的 actions 是需要重新考虑的， 主要是考虑异步的情况

这里需要引入两种 generate 模式: 1. Standard 2. State Machine. 状态机模式下，需要为 STATE 添加 4 个额外的状态。

- generate
  - getters 1/2
  - mutations 1/2
  - actions 2
  - asyncAction 这个仅仅生成一个异步的 action 2

### in component

在组件中使用。
主要是根据传入的 path/to/module , 来获取 getter mutation 或者 action。

- get
- sync

// TODO: pathify 中有的 sync api 很好，直接将 store 中的 getter 跟 组件中的内容进行双向绑定，这个在大表单中应该很好用。

- mapActions
- mapMutations
  ...

这些还是尽量不要动吧，用官方原生的

### in service

在 service 中使用。
这里我主要是想，action 中被赋值的直接是经过加工的 resp 了。相当于一个过滤器吧，返回一个标准返回体。

### 12-19

异步 action (应该说就是将 v1.0 版本的缺点都改进一下)

- 要有状态
- 不要将 vuex—tool 充满没啥用的 getter 和 state
- 不要太多定制，回调的形式 return 一个 promise ？
