# Babel

Babel 是一个 JavaScript 编译器.现在前端的快速发展,不同的浏览器兼容,快速新出的语法,意味着开发者需要做大量的代码兼容,而 babel 帮我们做了这些事情,因为学习 babel 是非常有必要的.

## 主要功能

- 语法转换:高级语言特性的降级;
- polyfill 特性的实现和接入;
- 源码转换:比如 jsx

## 设计理念

- 可拔插(Pluggable)
- 可调试
- 基于协定,有一定规范

编译是 babel 的核心目标,自身的实现基于编译原理,深入 ast 来生成目标代码

## babel 核心包

- @babel/core:babel 实现转换的核心包
- @babel/cli:命令行操作包
- @babel/standalone:直接在浏览器中执行 script 标签 type=text/babel 代码
