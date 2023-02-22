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
  content: "";
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
