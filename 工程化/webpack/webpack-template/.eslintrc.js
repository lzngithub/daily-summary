module.exports = {
  root: true, // 限定配置文件使用范围
  env: { // 指定代码运行环境
    browser: true, // browser global variables
    es2021: true, //
  },
  parser: '@babel/eslint-parser', // 指定解析器，解决一些eslint错误覆盖问题
  parserOptions: {
    ecmaVersion: 12, //ECMAScript 版本 
    sourceType: 'module', //ECMAScript 模块
    allowImportExportEverywhere: true, // important可以在任何地方使用，@babel/eslint-parser配置项
  },
  extends: [
    'airbnb-base', // ++
  ],
  rules: {
    'no-unused-vars': 'off', // 关掉未使用变量的警告
  },
};
