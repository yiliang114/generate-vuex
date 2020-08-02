### 用到的一些 npm 包

`npm-watch`: 监听文件修改，执行 npm script 脚本。 不同于 gulp 或者 webpack-dev-server 是专门针对于页面的热加载。

`jasmine`: 一款 vuex 使用的 JavaScript 测试框架， 使用起来感觉比 mocha 要更方便，执行测试的速度也很快。

`babel-polyfill`: 解决 ie9 和一些低版本的高级浏览器对 es6 新语法并不支持，通常是 `...` `promise` 不被支持。

`babel-register`: node 对 es6 的支持性并不是很好， class import 这些关键字都是不支持的。通过 babel 可以将这些 es6 语法转化为 es5， 但是在测试代码中，我们常常不需要 es5 代码的输出，而 `babel-register` 插件可以比较方便地配合 `jasmine` 将使用到 es6 语法的测试代码执行，使用方式就是可以查看 `jasmine.json` 中的内容。
