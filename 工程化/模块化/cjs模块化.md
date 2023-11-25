# commonjs

2009 年 1 月，Mozilla 的工程师 Kevin Dangoor 创建了一个项目，当时的名字是 ServerJS。在 2009 年 8 月，这个项目被改名为 CommonJS，以显示其 API 的更广泛实用性，其中，Node.js 采用的就是这个规范。

## 基本使用

commonjs 是 module.exports，exports 导出，require 导入。

### 导出

导出有两种语法。

1. exports

```js
exports.a = 1;
// 下面这种写法是不能导出的，因为重新给了exports赋值，但是最后导出的module.exports,后面会有说明
exports = {
  a: 1;
}
```

2. module.exports

```js
module.exports = {
  a: 1,
};
// 或者可以这样写
module.exports.a = 1;
```

### 导入

require 方法

```js
const obj = require("./module.js");
console.log(obj); // {a: 1}
```

require 的实现里面，会将导入的文件的内容放到函数里面去执行，默认 this === exports === module.exports，函数最后返回的 module.exports。

## 总结 cjs 和 esm 的区别

1. CommonJS 输出的是值的拷贝，ES Module 输出的是值的引用
2. CommonJS 是运行时加载（module.exports），ES Module 是编译时输出接口
3. CommonJS 的 require（）是同步加载模块，ESModule 的 import 是异步加载模块，静态编译时加载，有独立的模块依赖解析
4. CommonJS 模块的顶层 this 指向当前模块，ES6 模块中，顶层 this 指向 undefined
