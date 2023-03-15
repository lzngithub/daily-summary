# 深入理解 bfc

## 什么是 bfc

BFC（Block Formatting Context），块级格式上下文，是 W3C 规范中的一个概念，可以说是一套渲染规则，它决定了其子元素如何定位，以及和周围其他元素的关系

## 触发条件

- body 标签本身具有 bfc 特性
- 浮动元素，float 除 none 以外的值
- 绝对定位元素，position（absolute，fixed）
- display 为 inline-block，table-cells，flex，grid
- overflow（hidden，auto，scroll）

## 渲染规则

- 同一 bfc 容易下的两个元素垂直方向边距会重叠（取大值）
- bfc 元素可以包含浮动元素（清除浮动）
- bfc 是一个独立的容器，里面元素和外面元素不会相互影响

## 触发方式选择

一般会选择两种方式去触发 bfc

1.  设置 overflow 属性
2.  设置 display: flow-root;(推荐，新出现的属性，就是方便触发 bfc)

## 应用场景

1 解决 body 元素下兄弟元素垂直外边距发生折叠
2 防止浮动导致父元素高度塌陷（清除浮动）
3 阻止元素被浮动元素覆盖
