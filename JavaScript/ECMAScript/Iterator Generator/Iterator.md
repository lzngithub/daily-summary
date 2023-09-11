# Iterator(迭代器)

## 背景

数组，字符串，还有 map、set 等数据接口没有统一的遍历的方法，因此 es6 之后出现了 for of 方法可以进行统一的遍历，for of 背后原理就是迭代器。

迭代器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要有 Iterator 接口实现的对象，就可以完成遍历操作（即依次处理该数据结构的所有成员）

因为 javascript 语言里没有接口的概念，这里我们可以理解成它是一种特殊的对象 - 迭代器对象，返回此对象的方法叫做迭代器方法。
首先他作为一个对象，此对象具有一个 next 方法，每次调用 next 方法都会返回一个结果值。
这个结果值是一个 object，包含两个属性，value 和 done。
value 表示具体的返回值，done 是布尔类型的，表示集合是否遍历完成或者是否后续还有可用数据，没有可用数据则返回 true，否则返回 false。
另外内部会维护一个指针，用来指向当前集合的位置，每调用一次 next 方法，指针都会向后移动一个位置(可以想象成数组的索引)。

## 迭代器方法

模拟实现一个迭代器方法

```js
function getIterator(list) {
  var i = 0;
  return {
    next: function () {
      var done = i >= list.length;
      var value = !done ? list[i++] : undefined;
      return {
        done: done,
        value: value,
      };
    },
  };
}
var it = getIterator(['a', 'b', 'c']);
console.log(it.next()); // {value: "a", done: false}
console.log(it.next()); // {value: "b", done: false}
console.log(it.next()); // {value: "c", done: false}
console.log(it.next()); // "{ value: undefined, done: true }"
console.log(it.next()); // "{ value: undefined, done: true }"
```

上面代码便是根据迭代器的基本概念衍生出来的一个模拟实现。

- getIterator 方法返回一个对象 - 可迭代对象
- 对象具有一个 next 方法，next 方法内部通过闭包来保存指针 i 的值，每次调用 next 方法 i 的值都会+1.
- 然后根据 i 的值从数组内取出数据作为 value，然后通过索引判断得到 done 的值。
- 当 i=3 的时候，超过数组的最大索引，无可用数据返回，此时 done 为 true，遍历完成。

## 可迭代对象

到这里我们已经大概了解了 Iterator, 以及如何创建一个迭代器对象。但是他和 for of 有什么关系呢？

### for of 运行机制

当 for of 执行的时候，循环过程中引擎就会自动调用这个对象上的迭代器方法， 依次执行迭代器对象的 next 方法,将 next 返回值赋值给 for of 内的变量，从而得到具体的值。

我们都知道普通的 for 循环是可以随时中断的，那 for of 是否可以呢？
答案是肯定的，for of 机制兼顾了 for 和 forEach。
迭代器除了必须 next 方法外，还有两个可选的方法 return 和 throw 方法。
如果 for of 循环提前退出，则会自动调用 return 方法，需要注意的是 return 方法必须有返回值，且返回值必须是 一个 object。
ps：以抛出异常的方式退出，会先执行 return 方法再抛出异常。

### 实现可迭代对象

ES6 里规定，只要在对象的属性上部署了 Iterator 接口，具体形式为给对象添加 Symbol.iterator 属性，此属性指向一个迭代器方法，这个迭代器会返回一个特殊的对象 - 迭代器对象。
而部署这个属性并且实现了迭代器方法后的对象叫做可迭代对象。
此时，这个对象就是可迭代的，也就是可以被 for of 遍历。

> Symbol.iterator，它是一个表达式，返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值。

我们再回到最开始使用 for of 来进行遍历字符串、数组、map，我们并没有手动为他们部署 Iterator 接口，仍然可以使用 for of 遍历。
这是因为在 ES6 中有些对象已经默认部署了此接口，不需要做任何处理，就可以使用 for of 来进行遍历取值。

- Array
- Map
- Set
- String
- 函数的 arguments 对象
- NodeList 对象

对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。
不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

## 调用 Iterator 接口的场合

有一些场合会默认调用 Iterator 接口（即 Symbol.iterator 方法），还有几个别的场合。

- for of: for of 执行的时候会自动调用对象的 Symbol.iterator 方法.
- 解构赋值：对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法。
- 扩展运算符：扩展运算符（...）也会调用默认的 Iterator 接口。
- yield\*：yield\*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
- 其他场合：由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。

到这里我们已经可以根据迭代器的规则自定义迭代器了，但实现的过程有些复杂，毕竟需要自己来维护内部指针，有不少的逻辑处理，难免会出错。
那有没有更优雅的实现方式呢？
有，那就是-Generator -生成器 。

```js
let obj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  },
};
for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"
```

它除了可以作为生成迭代器的语法糖，他还有更多神奇的能力。
