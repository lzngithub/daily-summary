# 整理一些题目

## 1.获取鼠标点击的位置

```js
document.addEventListener("click", (e) => {
  console.log(`x: ${e.pageX}`);
  console.log(`y: ${e.pageY}`);
});
```

## 2.创建一个 div 并在 body 中插入

```js
const div = document.createElement("div");
div.innerHTML = "创建的div";
document.body.appendChild(div);
```

## new 运算符

```js
function cnew(func, ...rest) {
  const obj = Object.create(func.prototype);
  const result = func.apply(obj, rest);
  return typeof result === "object" ? result : obj;
}
```

## 使用 reduce 方法，统一一个数组内元素出现的个数

```js
const arr = ["apple", "banana", "pear", "orange", "apple"];

const obj = arr.reduce((obj, key) => {
  if (obj[key]) {
    obj[key]++;
  } else {
    obj[key] = 1;
  }
  return obj;
}, {});

console.log(obj);
```
