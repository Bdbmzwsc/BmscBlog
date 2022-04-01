module.exports = {
    root: true,
    parser: 'typescript-eslint/parser',
    plugins: [
      'typescript-eslint',
    ],
    env: {
      'browser': true,
      'es6': true,
      'node': true
    },
    parserOptions: {
      'ecmaVersion': 2018,
      'sourceType': 'module'
    },
    extends: [
      'eslint:recommended',
      'plugin:typescript-eslint/recommended'
    ],
    rules: {}
  };