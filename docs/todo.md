### gengerate-vuex
1. getter 有点多，感觉很多貌似都很少用到。
2. state 的状态机感觉也不是必要的，只不过有些场景会写带接口的状态比较好。
3. 精简版的 helper ，不携带状态，自带类似 element 的 message 的提示框。

### generate-services
1. 封装 axios 


### v2.0 特性
- 可以使用注解
- 简单的 API， 写更少的重复代码

<!-- 只针对 action -->
- mapLoading 可以统一在一个地方，引入所有的接口的 loading 状态，添加一个 this.tip() 函数就可以

主要参考他这个模块化
https://github.com/JiriChara/vuex-crud/blob/master/src/vuex-crud/createState.js


这个感觉没啥好参考，我觉得还是我的 mapStateSync 写的好啊
https://github.com/maoberlehner/vuex-map-fields/blob/master/src/lib/array-to-object.js


### script
```
"rollup:build": "src/*.js",
"test:unit": "test/unit/*.spec.js"
```