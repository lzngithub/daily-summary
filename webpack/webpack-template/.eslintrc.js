module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, //
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: [
    'airbnb-base', // ++
  ],
  rules: {
    "no-unused-vars": 'off', // 关掉未使用变量的警告
    "allowImportExportEverywhere": true // 不限制eslint对import使用位置
  }
};
