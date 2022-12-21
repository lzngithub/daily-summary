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

yield 表达式本身总是返回的 undefined，next 方法可以携带一个参数，作为上一个 yield 表达式的返回值。

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

- 第一次调用 next 是不用传参数的，因为第一次调用 next 不存在上一次 yield 表达式。
