# 问题

## 1

```js
An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.ts(5097)
```

当我们在导入 TypeScript 文件时包含扩展名时，会出现“An import path cannot end with a ‘.ts’ extension”的错误。 要解决该错误，需要从我们的 TypeScript 导入中删除扩展名。

TypeScript 编译器在将我们的 TypeScript 代码转换为 JavaScript 时不会更改导入说明符，因此如果我们有类似 import {sum} from './another-file.ts' 的导入，即使在编译后路径仍将保留 .ts 扩展名 .

如果我们使用 webpack，另一种方法是尝试将我们需要解析的扩展添加到 webpack.config.js 文件中。

```js
module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
```
