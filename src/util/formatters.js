export default {
  // 驼峰命名
  camel: function (...args) {
    return args.shift() + args
      .map(text => text.replace(/\w/, c => c.toUpperCase()))
      .join('')
  },

  // 下划线
  snake: function (...args) {
    return this
      .camel(...args)
      .replace(/([a-z])([A-Z])/g, (match, a, b) => a + '_' + b)
      .toLowerCase()
  },

  // 常量形式： 先转化为有下划线的形式，之后全部转化为大写
  const: function (...args) {
    return this
      .snake(...args)
      .toUpperCase()
  }
}
