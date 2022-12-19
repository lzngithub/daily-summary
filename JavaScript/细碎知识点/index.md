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
