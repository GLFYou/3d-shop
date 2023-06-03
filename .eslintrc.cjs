module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭组件命名多词组合
    'no-undef': 'off', // 关闭未定义，因为我们使用了自动引入vue，会报错
    'space-before-function-paren': 'off', // 函数括号前的空格，关闭
    'no-unused-vars': 'off' // 未使用变量报错
  }
}
