# js 常用数组方法总结

1.forEach,遍历数组的方法，不会改变原数组，也没有返回值

```js
let a = [1, 2, 3];
a.forEach((item, index) => {
  console.log(item); // 1 2 3
});
```

2.map,返回一个新数组，默认返回 undefined

```js
let a = [1, 2, 3];
let b = a.map((item, index) => {
  return item + 1;
});
console.log(b); // [2, 3, 4]
```

3.find, 找到数组中第一个满足条件的元素，没有则返回 undefined

```js
let a = [1, 2, 3];
let b = [2, 3, 4];
let c = a.find((item, index) => {
  return item > 3;
});
let d = b.find((item, index) => {
  return item > 3;
});
console.log(c); // undefined
console.log(d); // 4
```

4.findIndex,找到数组中第一个满足条件的元素的索引，没有则返回-1

```js
let a = [1, 2, 3];
let b = [2, 3, 4];
let c = a.findIndex((item, index) => {
  return item > 3;
});
let d = b.findIndex((item, index) => {
  return item > 3;
});
console.log(c); // -1
console.log(d); // 2
```

5.filter,返回一个满足条件的新数组，不会改变元素组

```js
let a = [1, 2, 3];
let b = a.filter((item, index) => {
  return item > 2;
});
console.log(b); // [3]
```

6.every,方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。若收到一个空数组，此方法在一切情况下都会返回 true。

```js
let a = [1, 2, 3, 1];
let b = a.every((item) => item < 4);
console.log(b); // true
```

7.some,方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。如果用一个空数组进行测试，在任何情况下它返回的都是 false。

```js
let a = [1, 2, 3, 1];
let b = a.some((item) => item < 2);
console.log(b); // true
```

8.push, 在数组后添加一个元素，返回数组的长度

```js
let a = [1, 2, 3];
let b = a.push(4);
console.log(a, b); // [1, 2, 3, 4] 4
```

9.pop,删除数组末尾的一个元素，并返回该元素，数组为空时返回 undefined

```js
let a = [1, 2, 3];
let b = a.pop();
console.log(a, b); // [1, 2] 3
```

10.unshift, 在数组开头添加一个元素，返回数组的长度

```js
let a = [1, 2, 3];
let b = a.unshift(4);
console.log(a, b); // [4, 1, 2, 3] 4
```

11.shift,删除数组开头的一个元素，并返回该元素，数组为空时返回 undefined

```js
let a = [1, 2, 3];
let b = a.shift();
console.log(a, b); // [2, 3] 1
```

12.concat, 方法在一个数组后面拼接新的元素，可接收 n 个参数，参数可以是任意数据类型，如果是数组，则将数组跟原数组拼接，如果是其他数据类型，则将该元素添加到原数组后面该方法不改变原数组，会返回拼接好的新数组，因此可以 执行链式操作

```js
let a = [1, 2, 3];
let b = a.concat([4], 5, "6", null, undefined, NaN, {});
console.log(b); // [1, 2, 3, 4, 5, "6", null, undefined, NaN, {}]
```

13.reverse, 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

```js
let a = [1, 2, 3];
let b = a.reverse();
console.log(a); // [3, 2, 1]
console.log(b); // [3, 2, 1]
```

14.slice(片)，方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括 end）。原始数组不会被改变。

```js
let a = [1, 2, 3];
let b = a.slice(0, 1);
let c = a.slice(-1);
console.log(b); // [1]
console.log(c); // [3]
```

15.splice(拼接)，方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。格式：array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

```js
let a = [1, 2, 3];
let b = a.splice(1, 0, "2", "3"); //增加 a=[1, "2", "3", 2, 3], b=[]
// let b = a.splice(1, 1); //删除 a=[1, 3], b=[2]
```

16.includes,用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

```js
let a = [1, 2, 3];
let b = a.includes(1);
console.log(b); // true
```

17.indexOf,方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```js
let a = [1, 2, 3];
let b = a.indexOf(1, 1);
let c = a.indexOf(1, -3);
let d = a.indexOf(1, -10);
let e = a.indexOf(1, 10);
console.log(b); // -1
console.log(c); // 0
console.log(d); // 0
console.log(e); // -1
```

18.lastIndexOf,方法返回在数组中可以找到一个给定元素的最后一个索引，如果不存在，则返回-1，从给定 index 向前搜索。

```js
const numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2); // 3
numbers.lastIndexOf(7); // -1
numbers.lastIndexOf(2, 3); // 3
numbers.lastIndexOf(2, 2); // 0
numbers.lastIndexOf(2, -2); // 0
numbers.lastIndexOf(2, -1); // 3
```

19.join,方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。默认用逗号连接

```js
let a = [1, 2, 3];
let b = a.join("-");
console.log(typeof b, b); // string '1-2-3'
```

20.ruduce,方法对数组中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值,格式：arr.reduce((prev, current, index, array) => {}, initialValue)，如果没有提供 initialValue，reduce 会从索引 1 的地方开始执行 callback 方法，跳过第一个索引。如果提供 initialValue，从索引 0 开始。

- prev：累计器
- current；当前值
- index：当前索引
- array：当前数组
- initialValue: 累计器传入初始值，如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错

```js
let a = [1, 2, 3, 1];
// let b = a.reduce((prev, current) => prev + current, 0) // 数组求和
// let b = a.reduce((prev, current) => prev * current, 1) // 数组求乘积
let b = a.reduce((pre, current) => {
  if (pre.includes(current)) {
    return pre;
  } else {
    return pre.concat(current);
  }
}, []); // 数组去重
console.log(b);
```

## 总结

- 循环：forEach map some every find findIndex filter redux
- 增加删除：push pop unshift shift
- concat reverse indexOf lastIndexOf join includes
- slice splice

> 会改变原数组的方法：push, pop, unshift, shift, splice, reverse, sort(排序)
