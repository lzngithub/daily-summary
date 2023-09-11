# class

class 是语法糖，本质还是基于原型

## es5 定义构造函数

```js
// 在构造函数上定义属性
function Liang(name) {
  this.name = name;
}
// 再原型对象上定义方法，因为方法是公用的，而且可以节省内存，访问速度在原型链隔着不多的时候几乎没有区别
Liang.prototype.say = function () {
  console.log(`hi ${this.name}`);
};
let liang = new Liang("liang");
liang.say(); // hi liang
```

## es6 定义 class

```js
class Liang {
  // 构造函数，this代表实例对象
  constructor(name) {
    // name是实例属性
    this.name = name;
  }
  // say方法是原型上的方法
  say() {
    console.log(`hi ${this.name}`);
  }
}
let liang = new Liang("liang");
liang.say(); // hi liang
```

## 实例属性和实例方法

实例属性,两种写法

```js
class Animal {
  // 1. 写在class的最顶层，但无法在初始化的时候接受值,只能在实例化之后赋值
  color = "black";
  constructor(color) {
    // 2.写在constructor里
    this.color = color;
  }
}
```

实例方法

```js
class A {
  say() {
    console.log("hello world!");
  }
}
```

## 静态方法和静态属性

静态方法是类的方法，不会被实例继承，定义方法则是在方法前加上 static 关键字，静态方法中的 this 关键字是指向类的，父类的静态方法可以被子类继承，父类的静态方法可以在子类中通过 super 对象调用.静态属性也是如此.

```js
class Animal {
  static color = "black";
  static say() {
    console.log("hello world!");
  }
}
```

## 私有方法和属性

只在 class 内能被使用，通过#开头的属性或方法，不能被子类继承

### in

判断私有属性，只能在类内部运行，通过继承的也有效,但对于 Object.create()、Object.setPrototypeOf 形成的继承，是无效的，因为这种继承不会传递私有属性。

语法

```js
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}

class SubA extends A {}

A.test(new SubA()); // true
```

## 静态块

它的好处是将静态属性 y 和 z 的初始化逻辑，写入了类的内部，而且只运行一次。静态块内部通过 this 或者类名拿到静态属性和静态方法。

例子：

```js
class C {
  static x = 1;
  static {
    this.x; // 1
    // 或者
    C.x; // 1
  }
}
```

## 注意点

1.类不存在变量提升 2.实例方法中的 this 是执行 undefined，意味这谁调用这个方法，方法内部的 this 就指向谁。
解决办法

```js
// 在构造函数中用bind方法绑定，或者使用箭头函数将方法写在构造函数中，但是这样的化，实例对象中就有了对应的方法了，这方法就不止存在原型上了
// 构造函数时实在实例化的时候运行的，这个时候的this指向实例对象
constructor() {
  this.say = this.say.bind(this)
  this.say = () => {

  }
}
```

## new.target

实例化时返回类名，当被继承时，返回的是子类的类名

应用

```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("本类不能实例化");
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape(); // 报错
var y = new Rectangle(3, 4); // 正确
```

## 继承

1. extends: 继承关键字
2. 子类的构造函数必须调用父类的构造函数一次(先继承，后实例)：super()，不手动定义 constructor 方法，系统会默认添加，同时默认调用 super()方法
3. 子类先执行 super()，才能使用 this
4. 对于父类的私有属性和方法，不能被继承，但可以通过父类实例方法读取到私有属性
5. 对于静态属性和静态方法，会被子类继承，静态属性时通过浅拷贝去实现继承
6. Object.getPrototypeOf()方法可以用来从子类上获取父类，可用该方法判断一个类是否继承了另一个类。

### super

```js
class A {}
class B extends A {}
```

super 可用做函数和对象使用

做函数使用时

- 只能用在构造函数中，super().
- 代表的是父类的构造函数，返回的是子类的实例，即 super 内部的 this 指向子类实例，相当于 A.prototype.constructor.call(this)

做对象使用时

- 在普通方法中，指向父类的原型对象，super === A.prototype
- 在普通方法中，通过 super 调用父类的方法中，方法内部的 this 指向子类实例，A.prototype.print.call(this)
- 在静态方法中，指向父类 super === A
- 在静态方法中，通过 super 调用父类的方法时，方法内部的 this 指向子类

## 原生构造函数

Boolean()、Number()、String()、Array()、Date()、Function()、RegExp()、Error()、Object()
