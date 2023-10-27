# 业务场景解决方案

## 左边列表滚动二级标题粘性定位

- position: sticky; 需要配合 top 等使用;
- 参考系是父级设置了 overflow 属性的元素,如果找不到则为视口;
- 滚动的时候是正常布局,当 top 到达设定的值之后则会固定住,当父元素离开参考元素范围则会随着一起离开.

基本代码:

```css
div {
  position: sticky;
  top: 0;
}
```

## 定时器离开 tab 页后间隔时间不对

问题:定时器在 tab 页被隐藏之后,设置间隔时间不对,原因是谷歌浏览器为了性能,当 tab 页被隐藏的时候,定时器间隔时间则会变成最短也要 1s;然后当有两个定时器其中一个设置间隔时间比较短的时候,就有可能发生错乱.

解决问题:当检测到 tab 被隐藏的时候,停止动画.

```js
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    console.log(document.visibilityState, "暂停动画");
  } else {
    console.log(document.visibilityState, "启动动画");
  }
});
```

## 谷歌浏览器下的字号最小为 12px

解决办法:通过 transform: scale() 缩放去变小

- 注意形变只针对块盒或者行块盒起效果.

## 文字描边效果

方式 1:通过文字阴影设置

```css
div {
  text-shadow: 0 2px #fff, 0 -2px #fff, -2px 2px #fff, 2px 2px #fff, -2px 0 #fff,
    2px 0 #fff;
  color: transparent;
}
```

缺点: 描边不圆滑,同时文字设置透明效果不对.

方式 2: 谷歌浏览器下的非标准属性

```css
div {
  -webkit-text-stroke: 2px #fff;
  color: transparent;
}
```

## 输入框下拉菜单动画效果

问题在于下拉框高度不定,然后初始值给设置为 0,设置过度,输入框聚焦后高度设置为 auto,没有效果,因为过度生效只针对有具体数值的属性:

1. max-height:0 =》 max-height: 1000px;

缺点: 过度时间不对.

2.
