# tree-shaking

Tree-shaking 翻译过来的意思就是摇树。这棵树可以把它比喻为现实中的树，可以这样理解，摇树就是把发黄、没有作用还要汲取养分的叶子给给摇掉。把这个搬到 javascript 程序里面来就是，移除 Javascript 上下文中的未引用代码（dead-code）。

tree-shaking 依赖于 ESM 规范,因为该规范的导入导出是静态的，而 tree- shaking 是要发生了编译时的,所以需要在编译时就确定依赖关系.

废话不多说，直接看例子：

```js
// test.js
function add(a, b) {
  return a + b;
}
function multiple(a, b) {
  return a * b;
}
let firstNum = 3,
  secondNum = 4;
add(firstNum, secondNum);
```

在这段代码中，我们定义了两个函数 add 和 multiple，两个变量 firstNum 和 secondNum，然后调用了 add 方法并将 firstNum 和 secondNum 作为参数传入。
很明显，multiple 方法是没有被调用到的，打包的时候其实是可以被删除掉的，以减少我们打包后的代码体积。
那么，如何删除 multiple 呢？这时候就该我们的 ast 就登场了！要实现这个功能，分三步走。

1. 解析源代码生成 ast（抽象语法树）
2. 遍历 ast，记录相关信息
3. 根据遍历 ast 得到的信息，生成新代码

## wepack 中 tree-shaking

tree-shaking 在 生产模式下会自动开启，它不是某个选项的开启，是一组功能搭配使用后的效果。

在 none 模式下开启，在 optimization 下配置，该字段是 webpack 集中去配置优化功能所对应的。

```js
{
  optimization: {
    useExports: true, // 只导出外部使用的功能
    concatenateModules: true, // 合并模块，不再是一个模块对应一个函数，优化代码提及和运行效率
    minimize: true,   // 压缩掉没有使用的代码
  }
}
```

## tree-shaking 和 babel

有的时候使用 babel 后，tree-shaking 失效，原因是 tree-shaking 以来 esm，所以如果 babel 编译后是 commonjs 模块则会失效。

## tree-shaking 和 副作用

副作用配合 tree-shaking 可以更好的压缩代码

标识代码的副作用情况

```json
{
  // "sideEffects": false, // 项目中的函数都没有副作用
  "sideEffects": ["./index.js"] // 表示同意哪些模块有副作用，这样webpack打包的时候就不会忽略了。
}
```

```js
{
  optimization: {
    sideEffects: true, // production下会自动开启。
  }
}
```
