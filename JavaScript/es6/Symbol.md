# Symbol

原始值，独一无二，可做对象的键，可以转化为 string 和 Boolean 值

语法：

```js
let s = Symbol(params); // params：可选，string, obj
```

## 方法

sym.description: 获取 sym 的描述

## 做对象的键

写法

```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = "Hello!";

// 第二种写法
let a = {
  [mySymbol]: "Hello!",
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: "Hello!" });

// 以上写法都得到同样结果
a[mySymbol]; // "Hello!"
```

Symbol 值作为对象属性名时，不能用点运算符。
