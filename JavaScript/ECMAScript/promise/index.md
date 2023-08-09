# Promise

## 是什么

是一种异步解决方案,用于处理异步操作的结果.

## 为什么出现

promise 处理异步操作的结果采用链式调用的方法,可以解决以前异步写法容易产生回调地狱的问题,回调地狱阅读性差,逻辑混乱.

## 基本知识点

### 状态

Promise 对象有三种状态,状态一旦改变,之后不可再改变.

- 进行中(pending): Promise 刚被创建时的初始状态，表示异步操作正在进行中，尚未完成或失败。
- 已成功(fulfilled): 当异步操作成功完成时，Promise 的状态变为已成功，同时携带着异步操作的结果值。
- 已失败(rejected): 当异步操作失败时，Promise 的状态变为已失败，同时携带着失败的原因，通常是一个错误对象。

创建一个 promise 对象需要 new Promise() 构造函数, 接受一个带有两个参数 resolve、reject 的执行函数作为参数:

```js
const promise = new Promise((resolve, reject) => {
  // 异步操作（例如，从服务器获取数据或读取文件）
  // 如果异步操作成功，调用 resolve 执行并传递结果值
  // 如果异步操作失败，调用 reject 执行并传递失败原因
});
```

Promise 对象，就可以通过使用 .then() 方法来添加异步操作成功的回调和异步操作失败的回调,也可以使用 .catch() 方法来添加异步操作失败的回调：

```js
const promise = new Promise((resolve, reject) => {
  // 异步操作（例如，从服务器获取数据或读取文件）
  // 如果异步操作成功，调用 resolve 执行并传递结果值
  // 如果异步操作失败，调用 reject 执行并传递失败原因
})
  .then(
    (res) => {
      // 异步操作成功，获取 result 结果值
    },
    (error) => {
      // 异步操作失败，获取 error 失败原因
    }
  )
  .catch((error) => {
    // 异步操作失败，获取 error 失败原因
  });
```

.then 会返回一个新的 Promise 对象,所以支持链式调用,因此可以在最后使用.catch 方法处理错误逻辑.

### 主要方法

- Promise.prototype.then(onFulfilled, onRejected)：用于添加异步操作成功（Fulfilled）和失败（Rejected）的回调函数。onFulfilled 是异步操作成功时的回调函数，接收成功的结果值作为参数；onRejected 是异步操作失败时的回调函数，接收失败的原因作为参数。

- Promise.prototype.catch(onRejected)：用于添加异步操作失败的回调函数，相当于 .then(null, onRejected)。

- Promise.prototype.finally(onFinally)：在 Promise 的状态变为 Fulfilled 或 Rejected 时，都会执行 onFinally 回调函数。该方法不接收任何参数，它返回一个新的 Promise 对象，该 Promise 对象的状态和值与原始 Promise 对象一致。

- Promise.resolve(value)：返回一个以给定值 value 解析的 Promise 对象。如果 value 是一个 Promise 对象，则直接返回它；如果 value 是一个 thenable 对象（即具有 then 方法的对象），则会将它转换成一个 Promise 对象并返回。

- Promise.reject(reason)：返回一个以给定原因 reason 拒绝的 Promise 对象。

- Promise.all(iterable)：该方法接收一个可迭代对象（例如数组）作为参数，其中的每个元素都是 Promise 对象。它返回一个新的 Promise 对象，该 Promise 对象在所有输入的 Promise 都成功完成时才会成功，并将成功的结果值作为数组返回，如果有任何一个输入的 Promise 失败，则返回失败的原因。

- Promise.allSettled(iterable)：该方法与 Promise.all 类似，接收一个可迭代对象作为参数，返回一个新的 Promise 对象，在所有输入的 Promise 都完成（无论成功或失败）时才会成功。它将以包含每个 Promise 的结果状态的对象数组进行解析，每个对象都有一个 status 字段，可能的值是 "fulfilled" 或 "rejected"，以及一个 value 或 reason 字段分别包含了成功的结果值或失败的原因。

- Promise.race(iterable)：该方法与 Promise.all 类似，接收一个可迭代对象作为参数，返回一个新的 Promise 对象，该 Promise 对象在输入的 Promise 中有任意一个完成（成功或失败）时就会完成，并将完成的结果值或失败的原因传递给回调。

## 优势和劣势

优势和劣势都需要参照物才有意义,所以下面总结的都是相对来说的.

### 优势

- 比起回调函数的写法,代码结构变得清晰,容易维护.
- Promise.all()等方法可以一次性处理多个异步操作,提升性能.
- 链式调用同时有 Promise.all 方法,可以方便的进行异步任务的组合.

### 劣势

- 当链式调用过于复杂时,还是会降低代码的可读性.
- 一个 Promise 一次只能处理一个异步任务,无法解决需要多个结果的场景.
- 不支持超时设置.
- 部分浏览器可能不兼容
