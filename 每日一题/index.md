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
