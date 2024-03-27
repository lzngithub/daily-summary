# flex

本文例子默认主轴为 x 轴;

## flex 基本语法

参考 MDN： [https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex]

学习完基本语法再看下面内容。

## flex 项目宽度计算

flex 项目的宽度取决于 flex-grow、flex-shrink、flex-basis、width 设置的值来决定。

- flex-basis 的优先级比 width 高，但可以通过设置 flex-basis: auto 把优先级给到 width 属性。
- 项目（item）的宽度等于 flex-basis 设置或者 width 设置的值加上剩余空间被平分后自己占据那部分的值

比如

```text
容器宽度等于700px

item1 flex-grow=2 flex-basic或者宽度=100px
item2 flex-grow=1 flex-basic或者宽度=200px
item3 flex-basic或者宽度=100px（flex-grow默认等于0）

item1最终宽度 =（700 - 100 - 200 - 100）/ ( 1 + 2) * 2 + 100 = 300
item1最终宽度 =（700 - 100 - 200 - 100）/ ( 1 + 2) * 1 + 200 = 300
item1最终宽度 = 100
```

## flex 复合属性理解

### 语法

- 单值语法：为 flex-grow 或者 flex-basis 有效值或者关键字，不会是 flex-shrink，因为会被认为是 flex-grow 值;
- 双值语法：第一个值对应的是 flex-grow，第二个值对应的是 flex-shrink 或者 flex-basis;
- 三值语法：按照 flex-grow、flex-shrink、flex-basis 去设置对应的值。

### 用法

- 设置 flex 属性，不管是用单值语法还是双值语法，会改变 flex-grow flex-shrink flex-basis 的默认属性

比如

```text
flex: 1;

这个是单值语法：1代表的是flex-grow的值，其他两个值会被省略，被省略的时候，会有默认值

flex-grow: 省略时默认值为 1。 (原本默认值为 0)
flex-shrink: 省略时默认值为 1。 (原本默认值为 1)
flex-basis: 省略时默认值为 0。 (原本默认值为 auto)

所以flex: 1 等于 flex: 1 1 0，而不是felx: 1 1 auto
```

### 关键字

- initial: 等同于 flex: 0 1 auto;
- auto: 等同于 flex: 1 1 auto;
- none: 等同于 flex: 0 0 auto;

## flex 布局可以实现的几个效果

前置准备工作

```html
<div class="content">
  <div class="item1">item1</div>
  <div class="item2">item2</div>
  <div class="item3">item3</div>
</div>
```

等分布局

```css
.content {
  display: flex;
  width: 800px;
  height: 100px;
}
.item1 {
  background-color: #eee;
  flex: 1;
}
.item2 {
  background-color: #ccc;
  flex: 1;
}
.item3 {
  background-color: #bbb;
  flex: 1;
}
```

item1 比 item2 item3 宽度多 200px

```css
.content {
  display: flex;
  width: 800px;
  height: 100px;
}
.item1 {
  background-color: #eee;
  flex: 1 200px;
}
.item2 {
  background-color: #ccc;
  flex: 1;
}
.item3 {
  background-color: #bbb;
  flex: 1;
}
```

item1 的宽度是 item2 item3 的两倍

```css
.content {
  display: flex;
  width: 800px;
  height: 100px;
}
.item1 {
  background-color: #eee;
  flex: 2;
}
.item2 {
  background-color: #ccc;
  flex: 1;
}
.item3 {
  background-color: #bbb;
  flex: 1;
}
```

按倍数去分配容器的宽度

```css
.content {
  display: flex;
  width: 600px;
  height: 100px;
}
.item1 {
  background-color: #eee;
  flex: 1;
}
.item2 {
  background-color: #ccc;
  flex: 2;
}
.item3 {
  background-color: #bbb;
  flex: 3;
}
```
