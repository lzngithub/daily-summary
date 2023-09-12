# 原型继承

## 原型链

- 实例对象是没有 constructor 属性，是通过继承原型链上的
- 函数是对象的一种，是 Function()的实例
- prototype 是函数中的一个属性，它指向通过这个函数生成对象的一个共有祖先,是可以被改变的，他和 constructor 是成对相反的。

![](./202309111422.png)

## 继承

### 原型链继承

原型链继承的核心就一句话：用父类实例作为子类原型，这使得子类实例最终可以访问父类上的属性和其原型上的方法。

```js
function Parent() {
  this.name = 'xiaoming';
}
Parent.prototype.getNames = function () {
  console.log(this.names);
};
function Child() {
  this.ages = 18;
}
Child.prototype = new Parent();
const child = new Child();
console.log(child.__proto__.__proto__ === Parent.prototype); // true
```

- 没发传参
- 没有进行属性隔离，子类实例公用同一个实例的属性和方法。

### 构造函数继承

借用父类构造函数，它的核心就是完全不使用原型，而是在子类构造函数中通过 call 调用父类构造函数，从而增强子类实例。

```js
function Parent(name, sex) {
  this.name = name;
  this.sex = sex;
}
Parent.prototype.getNames = function () {
  console.log(this.names);
};
function Child(name, sex, ages) {
  Parent.call(this, name, sex);
  this.ages = ages;
}
const child = new Child('xiaohong', '男', 18);
console.log(child.getNames); // undefined
```

- 可以往父类传参
- 子类的所有实例都会继承父类实例的方法和属性
- 父类原型上的方法，子类是无法继承

### 寄生式继承

通过第三方进行继承

```js
const obj = {
  name: 'jack',
  friends: [],
};
function createObject(o) {
  // 对象浅拷贝
  let anotherObj = Object.create(o);
  // 对象增强
  anotherObj.getFriends = function () {};
  return anotherObj;
}
const anotherObj = createObject(obj);
```
