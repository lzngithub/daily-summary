# async 函数

## 是什么

一种异步代码结构,是 promise 的语法糖

## 为什么出现

使用 async 关键字定义的函数,配合使用 await 关键字,无需使用链式调用的方式,可以用更简洁的方式写出基于 promise 的异步行为(链式调用:代码逻辑不够清晰).

## 基本语法

形式,

```js
const foo = async () => {
  await ...
  return ...
}
```

async 函数可能包含 0 个或者多个 await 表达式。await 表达式会暂停整个 async 函数的执行进程并出让其控制权，只有当其等待的基于 promise 的异步操作被兑现或被拒绝之后才会恢复进程。promise 的解决值会被当作该 await 表达式的返回值。使用 async/await 关键字就可以在异步代码中使用普通的 try/catch 代码块。

- 在函数前添加 async 关键字定义为 async 函数
- await 接 promise 表达式,如果是一个普通值,则为 promise 的 fufilled 的值
- await 前的代码为同步代码,await 后的代码为异步代码
- return 为一个 promise 实例

## 总结
