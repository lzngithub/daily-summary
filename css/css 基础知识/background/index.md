# background

## background 主要属性

- 添加背景图片：background-image
- 调整背景图片大小：background-size
- 制定背景图片原始区域：background-origin
- 切割背景：background-clip
- 设置背景图像的定位：background-position
- 背景图片是否重复：background-repeat
- 背景颜色：background-color
- 背景图片是否固定：background-attachment

合并写法,注意一点,就是背景定位和背景大小要这样写,即: background-position/background-size;

```css
backgound: 顺序不定;
```

例子:

```css
/* image position size */
background: url("./a.png") center/100%;
```

## background-color

设置背景颜色，没什么好说的

```css
background-color: red;
```

## background-image

设置背景图片，在绘制时，图像以 z 方向堆叠的方式进行。先指定的图像会在之后指定的图像上面绘制。因此指定的第一个图像“最接近用户”。

语法：

```css
background-image: 关键字none或者一个<image>值, 可以是渐变;
```

支持多背景

## background-origin

规定了指定背景图片 background-image 属性的原点位置的背景相对区域。

- border-box: 背景图片的摆放以 border 区域为参考
- padding-box: 背景图片的摆放以 padding 区域为参考(默认)
- content-box: 背景图片的摆放以 content 区域为参考

语法：

```css
background-origin: padding-box;
```

## background-clip

设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面,就是指定背景图片或者颜色的显示区域

- border-box: 显示区域为 border+padding+content(默认)
- padding-box：显示区域为 padding+content
- content-box: 显示区域为 content
- text： 作为文字的前景色，但只有部分浏览器支持，同时需要文字颜色要设置为透明

## background-position

属性为每一个背景图片设置初始位置。这个位置是相对于由 background-origin 定义的位置图层的。

是 backround-position-x 和 background-position-y 的简写

- top left right bottom center
- 0%-100%
- 50px

例子:

```css
background-position: top                     /**top: 0%       left: 50% */
background-position: 25% 75%                 /**top: 25%      left: 75% */
background-position: bottom 50px right 100px /**bottom: 50px  right: 100px */
```

## background-size

设置背景图片大小

- cover contain auto(默认)
- 100% 100%
- 100px 100px

```css
background-size: cover;
background-size: 50% 50%;
background-size: 50px 50px;
```

## background-repeat

属性定义背景图像的重复方式

- repeat: x y 方向都重复，空间不够会裁剪，填满没有缝隙
- no-repeat：不重复（默认）
- repeat-x: x 方向重复
- repeat-y: y 方向重复
- round: 压缩或者拉伸，重复，没有缝隙，看最后的一个空间是多放一个还是少放一个（浏览器决定）
- space: 不压缩，均匀分配空间，重复，空间多出会有缝隙

## background-attachment

属性决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。

- fixed：背景相对于视口固定
- local：此关键属性值表示背景相对于元素的内容固定
- scroll：此关键属性值表示背景相对于元素本身固定，而不是随着它的内容滚动(默认)

## 总结

- background-clip 对背景颜色和背景图片都起作用
- background-origin 只对背景图片起作用
- background-position 跟 background-origin 有关
