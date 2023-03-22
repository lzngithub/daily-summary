# js 的奇怪写法

## map forEach push 扩展运算符结合

push：可以接受多个参数，结合扩展运算符可以将 push 操作放在循环外面

```js
const a = [1, 2];
const b = [];
const c = [];
b.push(...a.map((value) => value + 2));
a.forEach((value) => c.push(value + 2));
```
