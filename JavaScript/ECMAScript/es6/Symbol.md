# Symbol(符号)

## 背景

原始值，跟数值、布尔值等一样，提供一种生成独一无二的变量的方式，可做对象的键，可以转化为 string 和 Boolean 值。

## 初始化

Symbol 值通过 Symbol()函数生成。

```js
let symbol = Symbol(params);
```

params 可选，分为两种类型

- 字符串：对 Symbol 的描述，
- 对象：调用该对象的 toString()方法，将其转换了字符串，该字符串是对 Symbol 的描述

## 方法

Symbol.prototype.description: 获取 Symbol 值的描述

```js
const sym = Symbol('foo');
sym.description; // "foo"
```

## 做对象的键

写法

```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!',
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol]; // "Hello!"
```

Symbol 值作为对象属性名时，不能用点运算符。

## Symbol.for() Symbol.keyFor()

可以利用这个描述符做一些事情，比如记录某些值，这样一个 Symbol 可以对应两个值

有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2; // true
```

Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key。

```js
let s1 = Symbol.for('foo');
Symbol.keyFor(s1); // "foo"

let s2 = Symbol('foo');
Symbol.keyFor(s2); // undefined
```

## 属性名的遍历

Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

另一个新的 API，Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```js
let obj = {s
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3,
};

Reflect.ownKeys(obj);
//  ["enum", "nonEnum", Symbol(my_key)]
Object.getOwnPropertySymbols(obj) // [Symbol(my_key)]
```

## 内置的 Symbol 值(11 个)

Symbol 是一个函数，但在 js 里函数是也是对象，是 Function 函数的实例，因为 Symbol 也有很多内置属性。

重点关注 Symbol.iterator，对象的 Symbol.iterator 属性，指向该对象的默认遍历器方法。
