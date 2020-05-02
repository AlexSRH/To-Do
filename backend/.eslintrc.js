module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['jest'],
  extends: [
    'standard',
    'plugin:jest/all'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'jest/prefer-expect-assertions': 'none'
  }
}
