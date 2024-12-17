# string 常用方法整理

1.trim(),去除 str 开头和结尾处的空白字符，返回 str 的一个副本，不影响字符串本身的值，trimStart()、trimEnd()方法类似。

```js
let a = " a bc ";
let b = a.trim();
console.log(a); // ' a bc '
console.log(b); // 'a bc'
```

2.toLowerCase(),会将调用该方法的字符串值转为小写形式，并返回。

```js
let a = "ABC abc abc";
let b = a.toLowerCase();
console.log(a); // 'ABC abc abc'
console.log(b); // 'abc abc abc'
```

3.toUpperCase(),会将调用该方法的字符串值转为大写形式，并返回。

```js
let a = "ABC abc abc";
let b = a.toUpperCase();
console.log(a); // 'ABC abc abc'
console.log(b); // 'ABC ABC ABC'
```

4.concat(),方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。

```js
let a = "abc";
let b = a.concat(1, undefined, null, NaN, {});
console.log(a); // 'abc'
console.log(b); // 'abc1undefinednullNaN[object Object]'
```

5.replace(),replace() 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数，用回调函数会更灵活一点，可以拿到参数进行逻辑计算再确定替换的值。如果 pattern 是字符串，则仅替换第一个匹配项。replaceAll()方法也一样；不会改变原字符串。

```js
let a = "abc abc abc";
let b = a.replace("abc", "ab");
let c = a.replace(/abc/g, 'ab');
console.log(a); // 'abc abc abc'
console.log(b); // 'ab abc abc'
console.log(c); // 'ab ab ab'
```

6.split(),分裂，方法使用指定的分隔符字符串将一个 String 对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

```js
/**
 * @param {string | RegExp} [separator] 分隔匹配字符，以该标志进行分割
 * @param {number} [limit] 限制分割结果数组的长度
 * @return {Array} 分隔返回的数组
 */
function split(separator, limit) {}

let a = "ABC abc abc 123";
let b = a.split();
let c = a.split(" ", 1);
let d = a.split("", 3);
console.log(a); // 'ABC abc abc 123'
console.log(b); // ["ABC", "abc", "abc", "123"]
console.log(c); // ["ABC"]
console.log(d); // [ 'A', 'B', 'C' ]
```

7.chatAt()：从一个字符串中返回指定的单个字符，参数为字符串下标，默认不传为 0。如果 index 超出了 0 – str.length - 1 的范围，charAt() 将返回一个空字符串。

```js
/**
 * @param {number} [index = 0] 范围为：0~length-1。
 * @return {tring} 返回从开始索引到结束索引的值，不符合条件则返回空字符串
 */
function chatAt(index) {}

let a = "ABC abc abc 123";
let b = a.charAt(1);
let c = a.charAt(-1);
console.log(a); // 'ABC abc abc 123'
console.log(b); // 'B'
console.log(c); // ''
```

8.at()：从一个字符串中返回指定的单个字符，参数为字符串下标，可以为负数, 负数从右边数起，-1对应倒数第一个。

```js
/**
 * @param {number} [index=0] 下标的值，可为负数。
 * @return {tring|undefined} 返回从开始索引到结束索引的值，不符合条件则返回undefined
 */
function at(index) {}

let a = "ABC abc abc 123";
let b = a.at(1);
let c = a.at(-1);
console.log(a); // 'ABC abc abc 123'
console.log(b); // 'B'
console.log(c); // '3'
```

9.substring(),方法返回一个字符串在开始索引到结束索引之间的一个子字符串。

参数有以下特点：

- 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
- 如果 indexStart 大于 indexEnd，则相当于参数位置互换。
- 如果省略 indexEnd，substring 提取字符一直到字符串末尾。
- 如果任一参数小于 0 或为 NaN，则被当作 0。
- 如果任一参数大于 length，则被当作 length。

```js
/**
 * @param {number} [indexStart=0] 开始位置
 * @param {number} [indexEnd=length] 结束位置
 * @return {string}
 */
function substring(indexStart, endIndex) {}

let a = "ABC abc abc 123";
let b = a.substring(4, 7);
console.log(a); // 'ABC abc abc 123'
console.log(b); // 'abc'
```

10.slice()：方法返回一个字符串在开始索引到结束索引之间的一个子字符串，和substring方法的区别是会接受负数参数且不会存在开始位置小于结束位置参数互换的效果，因为参数可以接受负数了，不好判断两个参数的大小。

```js
/**
 * @param {number} [startIndx = 0] 开始索引，可为负数，负数从右边数起
 * @param {number} [endIndex = length] 结束索引，可为负数，负数从右边数起
 * @return {tring} 返回从开始索引到结束索引的值，不符合条件则返回空字符串
 */
function slice(startIndx, endIndex) {}

let a = "ABC abc abc 123";
let b = a.slice(0, a.length + 1);
let c = a.slice(1, -1);
console.log(a); // 'ABC abc abc 123'
console.log(b); // 'ABC abc abc 123'
console.log(c); // 'BC abc abc 12'
```

11.startsWith()：判断当前字符串在某位置开始是否是以另外一个子字符串开始，并根据判断结果返回 true 或 false。endsWith()方法也一样

```js
/**
 * @param {number} [searchvalue] 匹配的字符串，必需
 * @param {number} [index = 0] 开始位置，小于0则会视为0
 * @return {boolean} 
 */
function startsWith(searchvalue, index) {}

let a = "ABC abc abc 123";
let b = a.startsWith("ABC");
let c = a.startsWith("abc", 4);
console.log(b); // true
console.log(c); // true
```

12.repeat()：字符串重复n次拼接成新的字符串。

```js
let a = "9";
let b = a.repeat(3);
console.log(b); // 999
```

13.padStart()：方法用另一个字符串填充当前字符串（如果需要的话，会重复多次），以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。padEnd()方法也一样

```js
let a = "9";
let b = a.padStart(3, "0");
console.log(b); // 009
```

14.includes(),判断一个字符串是否有某字符串，可以根据不同位置开始查，默认从0开始查，有返回 true，否则返回 false。

```js
let a = "ABC abc abc 123";
let b = a.includes("A");
let c = a.includes("A", 1)
console.log(a); // 'ABC abc abc 123'
console.log(b); // true
console.log(b); // false
```

15.indexOf(),返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。lastIndexOf() 方法一样

```js
let a = "ABC abc abc 123";
let b = a.indexOf("abc", 5);
console.log(a); // 'ABC abc abc 123'
console.log(b); // 8
```

16.match(),返回一个包含匹配结果的数组，如果没有匹配项，则返回 null。如果参数传入的是一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象

```js
let a = "ABC abc abc 123";
let b = a.match(/abc/g);
console.log(a); // 'ABC abc abc 123'
console.log(b); // ["abc", "abc"]
```

17.search(),查找 str 与一个正则表达式是否匹配。如果匹配成功，则返回正则表达式在字符串中首次匹配项的索引；否则，返回 -1。如果参数传入的是一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象

```js
let a = "ABC abc abc 123";
let b = a.search(/abc/g);
console.log(a); // 'ABC abc abc 123'
console.log(b); // 4
```

## 记忆方法

从简单到难

- 去空格：trim trimStart trimEnd
- 大小写转换：toLowerCase toUpperCase

- 字符串拼接：连接符(+) concat
- 自身重复：repeat
- 用特定字符来扩展字符串：padStart padEnd
- 替换：replace replaceAll

- 字符串转换为数组：split

- 根据下标返回一个或者多个字符：at chatAt slice substring(at 和 slice 接受负数位置且从右边计算)

- 子字符串是否在父字符串里面：includes startWith endsWith
- 子字符串在字符串里面的位置：indexOf lastIndexOf search

- 某个模式下在字符串中的匹配结果的数组：match matchAll

- 返回对象字面量的原始值：valueOf toString

- 和数组同名的方法：concat slice indexOf lastIndexOf includes

参考：[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
