# core-js

core-js 它是 JavaScript 标准库的 polyfill（垫片/补丁）, 是新功能的 es'api'转换为大部分现代浏览器都可以支持
运行的一个'api' 补丁包集合。

## 为什么学习 core-js

- 通过学习 core-js,去引出前端工程化的其他知识点;
- core-js 和 babel 深度绑定,学习 core-js,能更好的理科 babel 生态.
- 通过学习,更好的理解 polyfill 概念.

core-js 中 5 个主要的包

- core-js
- core-js-pure:提供了不污染全局变量的垫片能力.
- core-js-compact:维护了 browserslist 规范的垫片需求数据,可以被 babel 使用
- core-js-buider:结合 webpack 打包出 core-js 代码
- core-js-bundle

core-js 实现的 polyfill(垫片)能力是整个 core-js 的逻辑核心;

## 如何实现一个好的 polyfill 方法

- 侵入性小
- 工程化、自动化程度高
- 对业务影响低
- 按需加载

## 常见的 polyfill 方案

- babel-polyfill
- core-js
- es5-shim
- es6-shim
