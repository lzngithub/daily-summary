# Set

组员的成员是唯一，键名和键值是相同的。

## 初始化

通过 Set 构造函数生成，不能通过字面量的形式，参数接受具有 Iterator 接口的数据结构，

下面数据接口自带 Iterator 接口

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

生成

```js
const s = new Set([1, 2]);
```

## 方法

### 操作方法（6 个）

- add：添加某个值，返回 Set 结构本身。
- delete：删除某个值，返回一个布尔值，表示删除是否成功。
- has： 返回一个布尔值，表示该值是否为 Set 的成员。
- clear：清除所有成员，没有返回值。

### 属性

- Set.prototype.constructor：构造函数，默认就是 Set 函数。
- Set.prototype.size：返回 Set 实例的成员总数。

### 遍历方法

Set 的遍历顺序就是插入顺序

- Set.prototype.keys()：返回键名的遍历器。
- Set.prototype.values()：返回键值的遍历器。
- Set.prototype.entries()：返回所有成员的遍历器。
- Set.prototype.forEach()：遍历 Set 的所有成员。

```js
Set.prototype[Symbol.iterator] === Set.prototype.values;
```

## 应用场景

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

## 注意的点

- 向 Set 加入值的时候，不会发生类型转换，所以 5 和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。

- add 方法返回 Set 本身，因此可以链式调用
