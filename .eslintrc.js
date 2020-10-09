module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    // 'plugin:vue/essential',
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ["error", "never"],
    'semi': ["error", "never"],
    // "vue/script-indent": ["error", 2, { "baseIndent": 0 }]
  }
}
