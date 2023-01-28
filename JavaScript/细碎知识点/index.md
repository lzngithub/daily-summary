## var

对于 var 变量来说，可以不用声明直接赋值；有声明但没赋值的变量，会被自动赋值 undefined；

例子：

```js
console.log(a); // Uncaught ReferenceError: a is not defined
a = 1;
```

```js
console.log(a); // undefined
var a = 1;
```

```js
console.log(typeof a); // undefined
a = 1;
```

```js
var a;
console.log(a); // undefined
```

## typeof

typeof 一个未声明的值，将会返回 undefined，在 let 出现前，typeof 是永远是一个安全操作

```js
console.log(typeof a); // undefined
```

## for

对于 for 循环来说，设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

## Array.reduce()用法

reduce 方法也是遍历，但他可以传递给下一次遍历想要的的值，增加了很多可操作性。

例子：

```js
const arr = [1, 2];

const sum = arr.reduce((pre, res, index, arr) => {
  return pre + res
}, 0)

console.log(sum); // 3
```

reduce方法接受两个参数，第一个是一个reducer函数，该函数执行具体的逻辑运算，第一个参数是传递的初始值，可选

应用场景

1.求和

```js
const arr = [1, 2];
const sum = arr.reduce((pre, cur) => pre + cur)
console.log(sum); // 3
```

2. 将二维数组转换成一维
```js
const arr = [[1, 2], [3, 4]];
const sum = arr.reduce((pre, cur) => pre.concat(cur), []);
console.log(sum); // 3
```

3.计算元素出现的次数
```js
const arr = ['apple', 'banana', 'orange', 'pear', 'pear'];
const sum = arr.reduce((pre, cur) => {
  if (pre[cur]) {
    pre[cur] ++;
  } else {
    pre[cur] = 1;
  }
  return pre
}, {});
console.log(sum); // { apple: 1, banana: 1, orange: 1, pear: 2 }
```

4.使用.reduce替换.filter.map()，只会做一次循环，更高效

```js
// .filter.map()
const arr = [-1, 1, 2];
const sum = arr.filter(item => item > 0).map(item => ++item)
console.log(sum); // [2, 3]

// .reduce
const arr = [-1, 1, 2];
const sum = arr.reduce((pre, cur) => {
  if (cur > 0) pre.push(++cur);
  return pre
}, []);
console.log(sum); // [2, 3]
```

5.使用函数组合实现管道
```js
const add = x => x + x;
const triple = x => (3 * x);
const qua = x => 4 * x;

const pipe = (...functions) => init => functions.reduce((pre, fun) => fun(pre), init)

const addAndTriple = pipe(add, triple);
const quaAndTriple = pipe(qua, triple);

console.log(addAndTriple(1)); // 6
console.log(quaAndTriple(1)); // 12
```

总结：用法上来看是一个写法更简洁的for循环，能处理比filter，map更复杂的逻辑，filter和map返回值。

