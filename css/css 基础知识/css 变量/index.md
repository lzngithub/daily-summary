# css 变量

所有主流浏览器都支持

## 特点

- 变量名大小写敏感
- 只能做属性值，不能做属性名
- 变量值的类型：字符串，可以其他字符串拼接；数值，可以带单位
- 在不同作用域可以多次声明

## 例子：

- 定义：变量名前面要加两根连词线（--），要声明在一个声明区块里，全局变量可以声明在:root 中
- 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，:root 表示 <html> 元素，除了优先级更高之外，与 html 选择器相同。所有主流浏览器均支持 :root 选择器，除了 IE8 及更早的版本。在声明全局 CSS 变量时 :root 会很有用。

```css
:root {
  --foo: #7f583f;
  --bar: #f7efd2;
}
```

- 使用：var()，var() 接受第二个参数，为默认值

```css
color: var(--foo, #7f583f);
```

## 监测浏览器是否支持

css 方法检测，CSS 中的 @supports 用于检测浏览器是否支持 CSS 的某个属性

```css
@supports ((--a: 0)) {
  /* supported */
}

@supports (not (--a: 0)) {
  /* not supported */
}
```

js 检测方法

```js
const isSupported =
  window.CSS && window.CSS.supports && window.CSS.supports("--a", 0);
if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```

JavaScript 操作 CSS 变量的写法如下。

```js
// 设置变量
document.body.style.setProperty("--primary", "#7F583F");

// 读取变量
document.body.style.getPropertyValue("--primary").trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty("--primary");
```

## 应用总结

1.多于多次使用的值，比如全局的某个颜色定义

```css
body:after {
  content: "--screen-category : " var(--screen-category);
}
```

2 可与 debugger

```css
body {
  --button-color: "#fff";
}
```

3 响应式布局使用

```css
body {
  --primary: #7f583f;
  --secondary: #f7efd2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary: #f7efd2;
    --secondary: #7f583f;
  }
}
```
