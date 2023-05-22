# 每日一题

## 第一题

实现对象的 map 函数，类似于 Object.prototype.map()函数一样

```js
Object.prototype.objMap = function (fun) {
  let origin = this;
  let target = {};
  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = fun(key, origin[key]);
    }
  }
  return target;
};
```

知识点：

- obj.hasOwnProperty(key)： 判断是不是自己自身的属性
- for in：利用 for in 去循环对象

## 第二题

用最精炼的代码实现数组非零非负最小值的 index

```js
const arr = [10, 21, 0, -7, 35, 7, 9, 23, 18];

function getMinIndex(arr) {
  return arr.indexOf(Math.min(...arr.filter((item) => item > 0)));
}

console.log(getMinIndex(arr)); // 5
```

知识点：

- arr.indexOf: 返回数组中指定值的下标，没有则返回 -1
- Math.min(): 找到传递参数中的最小值
- ...: 扩展运算符，和传参相结合，减少代码量

## 3

输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法

```js
const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

function test() {
  list.forEach(async (x) => {
    const res = await square(x);
    console.log(res);
  });
}
test();
```

输出结果：1s 钟后输出 1 4 9

原因：forEach 不阻塞，不会等待 await 的返回

解决方法：改用 for in/of 循环

```js
const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

async function test() {
  for (let i = 0; i < list.length; i++) {
    const res = await square(list[i]);
    console.log(res);
  }
}
test();
```
