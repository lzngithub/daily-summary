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
