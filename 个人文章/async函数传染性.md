# async/await 的传染性

怎么理解 async/await 函数具有传染性，举两个例子

```js
let result = null;

const fun1 = async () => {
  return new Promise((resolve) => {
    resolve("resolved");
  });
};

result = fun1();

console.log(result); // Promise { <pending> }
```

这样是拿不到 fun1 函数中返回回来的结果的，这是因为 await 返回回来的是一个 pending 状态的 Promise，所以一个底层函数使用了 async，那么所有基于它的所有调用链都必须使用 await 获取结果，或者使用 .then()。

```js
let result = null;

const fun1 = async () => {
  return new Promise((resolve) => {
    resolve("resolved");
  });
};

(async () => {
  result = await fun1();
  console.log(result); // resolved
})();
```

像这样就能拿到需要的结果，因此说 async/await 函数具有传染性。
