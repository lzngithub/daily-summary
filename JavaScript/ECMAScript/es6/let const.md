# let

- 不存在变量提升
- 暂时性死区，在用 let 声明一个变量的部分属于该变量的死区。不能对该变量做任何操作。
- 不允许重复声明

应用：

```js
// 解决i污染全局变量问题
for (let i = 0; i < 3; i++) {
  console.log(i);
}
console.log(i); // i is not defined
```
