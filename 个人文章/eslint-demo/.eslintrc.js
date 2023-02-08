module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    module: "readonly",
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
