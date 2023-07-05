# Set

类似数组，组员的成员是唯一，键名和键值是相同的

生成

```js
const s = new Set([1, 2]);
```

参数接受具有 Iterator 接口的数据结构

## 方法

操作方法

add delete has clear

遍历方法

keys values entries forEach

## 作用

- 去重，配合扩展运算符或者 Array.from 方法，或者 add 方法（在添加的时候去重）

```js
let noreapt = Array.from(new Set(array)); // Array.from方法将Set转成Array
let noreapt = [...new Set(array)];
let set = new Set().add(item1).add(item2); // 添加的时候去重，
```

## 遍历的时候去改变自身

思路：先变为数组，再通过数组生成新的 Set

```js
let set = new Set([1, 2]);
set = new Set([...set].map((item) => item * 2));
set = new Set(Array.from(set, (item) => item * 2));
```
