# Generator(生成器)

## 背景

Generator 函数，遍历器生成函数，是 ES6 提供的一种异步编程解决方案。

- 返回一个遍历器对象
- yield 表达式如果放在一个表达式里面的话，要加小括号，但如果是在表达式的右边，则不用加括号

## 基本使用

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function 关键字与函数名之间有一个星号；二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next(); // { value: 'hello', done: false }
hw.next(); // { value: 'world', done: false }
hw.next(); // { value: 'ending', done: true }
hw.next(); // { value: undefined, done: true }
hw.next(); // { value: undefined, done: true }
```

- 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。
- 调用遍历器对象的 next 方法，使得指针移向下一个状态,直到遇到下一个 yield 表达式（或 return 语句）为止。

next 可以传递参数

```js
function* foo(x) {
  var y = 2 * (yield x + 1);
  var z = yield y / 3;
  return x + y + z;
}

var b = foo(5);
b.next(); // { value:6, done:false }
b.next(12); // { value:8, done:false }
b.next(13); // { value:42, done:true }
```

- generator 函数执行不会执行里面的代码，同时会返回一个遍历器对象
- 第一次调用 next 是不用传参数的，因为第一次调用 next 不存在上一次 yield 表达式。
- next 执行遇到 yield 表达式就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。
- yield 表达式本身总是返回的 undefined，next 方法可以携带一个参数，作为上一个 yield 表达式的返回值。
- 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。

## 和 Iterator 的关系

任意一个对象的 Symbol.iterator 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 Symbol.iterator 属性，从而使得该对象具有 Iterator 接口。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable]; // [1, 2, 3]
```

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有 Symbol.iterator 属性，执行后返回自身。

```js
function* gen() {}
var g = gen();
g[Symbol.iterator]() === g;
// true
```

可以这样

```js
function* foo() {
  yield 1;
  return 6;
}
const iterator = {
  [Symbol.iterator]: foo,
};

for (let v of foo()) {
  console.log(v); // 1
}
for (let v of iterator) {
  console.log(v); // 1
}
```

## next() throw() return()

next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。

- next()是将 yield 表达式替换成一个值。
- throw()是将 yield 表达式替换成一个 throw 语句。
- return()是将 yield 表达式替换成一个 return 语句。
