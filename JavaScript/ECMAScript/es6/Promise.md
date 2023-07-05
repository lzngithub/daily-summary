# Promise

Promise 是异步编程的一种解决方案

- Promise 对象状态不受外部状态的影响。有三种状态：pending、fulfilled、rejected。
- 状态一旦改变，就不会再变了。
- 无法取消

## 基本用法

```js
const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("success");
  } else {
    reject("fail");
  }
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

- resolve(): 将状态变为 fulfilled
- reject(): 将状态变为 rejected
- then(success(), fail()): 成功后的回调函数 success();失败后的回调函数 fail(),相当于 catch
- catch(): 失败后的回调函数
- finally(): 最后执行的函数，与状态无关，不接受任何参数

## Promise.all()

将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2]);
```

- p 的状态取决与 p1 和 p2 的状态，只有 p1 和 p2 状态为 fulfilled 时，p 才会时 fulfilled
- p 的 catch 方法当 p1 或者 p2 定义了自己 catch 方法时将不会捕获

## Promise.race()

将多个 Promise 实例中最先返回的按个 Promise 包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2]);
```

## Promise.allSettled()

解决 all 只要有一个失败就结束执行的问题，

- allSettled 会等所有状态都变更了才会发生状态变更。而且状态总是 fulfilled，不会是 rejected
- 返回的数据格式为

      [
        { status: 'fulfilled', value: 42 },
        { status: 'rejected', reason: -1 }
      ]

-
