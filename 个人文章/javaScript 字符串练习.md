# javaScript 字符串练习

1. 表单中输入的字符需要去掉前后空白字符串

```JS
let str = ' abc ';
let target = str.trim();
console.log(str); // ' abc '
console.log(target); // 'abc'
```

2. 将输入框中输入第一个字符转为大写

```JS
let str = 'liang';
let target = str.at().toUpperCase().concat(str.slice(1));
console.log(str); // 'liang'
console.log(target); // 'Liang'
```