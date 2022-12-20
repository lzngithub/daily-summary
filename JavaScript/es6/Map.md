# Map

类似于对象，键值对的集合，建的范围不限于字符串。

## 实例属性和操作方法

操作方法

size set get has delete clear

遍历方法

keys values entries forEach

## 和其他数据结构相互转换

1.Map 和 Array

```js
let map = new Map([
  [true, 7],
  [{ foo: 2 }, { bar: 1 }],
]); // 数组转化为Map
let arr = [...map]; // Map转化为数组
```

2.Map 和 Object

```js
let obj = { a: 1, b: 2 };
let map = new Map(Object.entries(obj)); // 对象转为Map
```
