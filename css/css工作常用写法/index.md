# css 常用写法整理

## 单行文字打点展示

文本需要设置宽度，不换行，超出本分隐藏，文本超出打点展示

```css
.demo1 {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 多行文字打点展示

要明确是多少行，容器高度设置的不要高于文字总的高度，不然没有效果

```css
.demo2 {
  display: -webkit-box;
  width: 200px;
  /* 超出部分隐藏 */
  overflow: hidden;
  /* 子元素的排列方式：垂直排列，垂直排列，子代总高度等于父代高度 */
  -webkit-box-orient: vertical;
  /* 限制文本显示两行，超出打点展示 */
  -webkit-line-clamp: 2;
}
```

## 画虚线

border 画的虚线都是一点一点的，可以利用伪元素加背景渐变来画虚线

```css
.demo3 {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 1px;
}
.demo3::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    #e0e0e0 0%,
    #e0e0e0 50%,
    transparent 50%,
    transparent 100%
  );
  background-repeat: repeat-x;
  background-size: 10px 1px;
}
```

## 媒体查询

- 通过 rem 对不同型号的视口进行响应式布局, 现在主流的有 2560（2k）、1920、1680、1366、1080，基本设置这几个就够用了
- 谷歌浏览器字体最小为 12 号

```css
/* 大屏 */
@media screen and (max-width: 2560px) {
  html,
  body {
    font-size: 20px !important;
  }
}

@media screen and (max-width: 1920px) {
  html,
  body {
    font-size: 18px !important;
  }
}
/* 中屏 */
@media screen and (max-width: 1680px) {
  html,
  body {
    font-size: 16px !important;
  }
}

@media screen and (max-width: 1440px) {
  /* 包含1366 */
  html,
  body {
    font-size: 14px !important;
  }
}
/* 小屏 */
@media screen and (max-width: 1280px) {
  html,
  body {
    font-size: 12px !important;
  }
}

@media screen and (max-width: 1024px) {
  html,
  body {
    font-size: 8px !important;
  }
}
```

## 文字不规则环绕

文字浮动后周围文字只会围绕浮动元素原来的边框进行环绕，可以配合 clip-path 和 shape-outside 属性就行特定形状的环绕

clip-path: 以裁剪的方式决定元素显示的形状，可以是多边形，圆形，椭圆形等
shape-outside: 指定浮动元素的浮动区域。

```css
.demo4 {
  display: inline-block;
  width: 300px;
}
.demo4 .image {
  float: left;
  width: 100px;
  height: 100px;
  background-color: #eee;
  shape-outside: circle(50%);
  clip-path: circle(50%);
}
```

## 100vw

当元素宽度设置 vw 的时候，垂直滚动条的出现会导致出现水平滚动条，因为滚动条会暂居一定的宽度

## overflow

值得类型

- visible: 默认值，内容不会被修剪，会呈现在元素框之外(这个框指的是 border，意味着 padding 部分区域会看得见内容)。
- hidden：内容会被修剪，其余内容不可见。
- scroll：内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容（时刻出现滚动条的框）
- auto：如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。（内容超出才会显示滚动条）
- inherit：规定应该从父元素继承 overflow 属性的值。

注意点：

- 子元素超出父元素得高度，不一定是父元素出现得滚动条，可能是更上层元素出现滚动条。
- body 元素设置看不到滚动条对其自身超出视口宽高的时候也是有效的

## line-height

值得类型

- normal: 默认。设置合理的行间距。
- number：设置数字，此数字会与当前的字体尺寸相乘来设置行间距。
- length：设置固定的行间距。
- %：设置固定的行间距。
- inherit：规定应该从父元素继承 overflow 属性的值。

注意点：

- 设置行高和字体高度相同可以设置值为 1 或者 100%，同时设置 display: inline-block;

## 修改滚动条的样式

可以通过一下伪元素去设置滚动条的相关样式

- ::-webkit-scrollbar 滚动条样式
- ::-webkit-scrollbar-thumb 设置滚动条滑动块的样式
- ::-webkit-scrollbar-button 滚动条上下按钮的样式
- ::-webkit-scrollbar-track-piece 除滑动块以外的滚动条部分的样式。
- ::-webkit-scrollbar-corner 横、竖滚动条交界的角落区域样式。
