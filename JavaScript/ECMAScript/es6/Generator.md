# Generator(生成器)

Generator 函数，异步编程解决方案，状态机，封装了多个内部状态

- 返回一个遍历器对象

* yield 表达式如果放在一个表达式里面的话，要加小括号，但如果是在表达式的右边，则不用加括号

语法

```js
function* helloworld() {
  yield 'hello
}
```

# next()

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
