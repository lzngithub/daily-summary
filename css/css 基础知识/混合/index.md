# css 混合模式（blend-mode）

css3 新增的属性，处理两个元素覆盖部分如何混合的问题。

被应用于下面两个属性

## mix-blend-mode

混合元素，混合元素和父元素

## background-blend-mode

混合背景, 可以是背景图片与背景图片的混合，也可以是背景图片和背景色的混合.

## 混合函数

```text
R = fB(Rs, Rd)
G = fB(Gs, Gd)
B = fB(Bs, Bd)
```

红绿蓝通道互不影响

- 源图层: source
- 目标图层: destination

主要的混合函数有下面这些

- normal：正常，默认
- multiply：正片叠底, Chs \* Chd,大于 1 则为 1, 其中一个有白则不变,有黑则变为黑
- screen：滤色, 1-[(1-Chs)*(1-Chd)]=Chs+Chd-(Chs\*Chd), 顶层和底层的像素分量分别做反向处理，然后相乘，得到的结果在取反，得到的结果反而会更亮,
- overlay：叠加
- darken：变暗, min(Chs, Chd)
- lighten：变亮, max(a, b)
- color-dodge：颜色减淡, b/(1-a)
- color-burn：颜色加深, 1-(1-b)/a
- hard-light：强光
- soft-light：柔光
- difference：差值, |Chs - Chd|, 相同变黑色,其中一个白色变补色,其中一个黑色的话就不变
- exclusion：排除, Chs + Chd - 2·Chs·Chd, 其中一个为黑色的话,为另位一个颜色,其中一个为白色的话变补色
- hue：色相
- saturation：饱和度
- color：颜色
- luminosity：亮度
- initial：初始
- inherit：继承
- unset：复原

## multiply

- 加蒙版

## difference

可以利用同色变为黑色做文字描边效果

总结:

- 降暗混合模式:daken multiply color-burn
- 加亮混合模式:screen lighten color-dodge

## 注意点

隔离 isolation 的作用是创建一个堆叠上下文（Stacking Context），主要用于与 mix-blend-mode 属性一起使用时，将混合模式只应用于某一个元素或某一组元素；当和 background-blend-mode 属性一起使用时，可以只混合一个指定元素栈的背景，它允许使一组元素从它们后面的背景中独立出来，只混合这组元素的背景.

值

- auto: 默认值
- isolate: 该关键字定义一个新的元素栈环境会被创建。只混合这部分背景

## 应用

1. 背景和字体颜色互换

```html
<div class="wrapper">hello world!</div>
```

```css
* {
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  background-image: linear-gradient(to right, #fff 50%, #000 50%);
}
.wrapper {
  color: #fff;
  mix-blend-mode: difference;
}
```
