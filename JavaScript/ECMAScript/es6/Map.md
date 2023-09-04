# Map

类似于对象，键值对的集合，键的范围不限于字符串和 Symbol。

## 初始化

通过 Set 构造函数生成，不能通过字面量的形式，参数接受任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构，

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author'],
]);
```

## 实例属性和操作方法

### 实例属性（1）

- size：返回 Map 结构的成员总数。

### 操作方法（5）

- set：设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键。
- get：get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。
- has：has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- delete：delete()方法删除某个键，返回 true。如果删除失败，返回 false。
- clear：clear()方法清除所有成员，没有返回值。

### 遍历方法（4）

Map 的遍历顺序就是插入顺序

- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。

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
