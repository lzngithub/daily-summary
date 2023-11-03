# tree-shaking

Tree-shaking 翻译过来的意思就是摇树。这棵树可以把它比喻为现实中的树，可以这样理解，摇树就是把发黄、没有作用还要汲取养分的叶子给给摇掉。把这个搬到 javascript 程序里面来就是，移除 Javascript 上下文中的未引用代码（dead-code）。

tree-shaking 依赖于 ESM 规范,因为该规范的带入导出是静态的,而 tree- shaking 是要发生了编译时的,所以需要在编译时就确定依赖关系.

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

## 如何对副作用进行 tree-shaking

- 在业务范围中,设置最小化副作用范围
- 通过合理的配置,给工程化工具最多的副作用信息.
