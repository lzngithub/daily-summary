# css 混合模式（blend-mode）

css3 新增的属性，处理两个元素覆盖部分如何混合的问题。

被应用于下面两个属性

## mix-blend-mode

混合元素，混合元素和父元素

## background-blend-mode

混合背景, 可以是背景图片与背景图片的混合，也可以是背景图片和背景色的混合.

## 混合函数

主要的混合函数有下面这些

- normal：正常，默认
- multiply：正片叠底
- screen：滤色
- overlay：叠加
- darken：变暗
- lighten：变亮
- color-dodge：颜色减淡
- color-burn：颜色加深
- hard-light：强光
- soft-light：柔光
- difference：差值
- exclusion：排除
- hue：色相
- saturation：饱和度
- color：颜色
- luminosity：亮度
- initial：初始
- inherit：继承
- unset：复原

## 注意点

隔离 isolation 的作用是创建一个堆叠上下文（Stacking Context），主要用于与 mix-blend-mode 属性一起使用时，将混合模式只应用于某一个元素或某一组元素；当和 background-blend-mode 属性一起使用时，可以只混合一个指定元素栈的背景，它允许使一组元素从它们后面的背景中独立出来，只混合这组元素的背景.

值

- auto: 默认值
- isolate: 该关键字定义一个新的元素栈环境会被创建。只混合这部分背景
