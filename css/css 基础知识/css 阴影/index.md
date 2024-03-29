# shadow

主要能做阴影的有下面三个属性

- 盒子阴影
- 文字阴影
- 过滤阴影

## 盒子阴影

语法：设置几个参数：阴影的类型，偏移方向，扩散半径，模糊半径，颜色

盒子阴影：box-shadow：offset-x, offset-y, blur-radius, spread-radius, color， inset

- offset-x：水平偏移量，正值方向向右，负值向左
- offset-y：垂直偏移量，正值方向向下，负值向上
- blur-radius：模糊半径，值越大，模糊面积越大，阴影就越大越淡，不能为负值。默认为 0，此时阴影的边缘就跟直线一样。但是是在扩散半径的基础上模糊的。
- spread-radius: 扩散半径，取正值时，阴影扩大；取负值时，阴影开始的位置往反方向取偏移。默认为 0 则不偏移。
- inset：加了这个关键字则为内部阴影，不加则默认外部阴影，内部阴影层在背景之上，内容之下
- color: 模糊颜色，默认取浏览器决定的值。

注意的点：

- 当有多个阴影的时候，从最后一个阴影开始绘制。
- 阴影大小是可以计算的，offset-x 或者 offset-y 可以看成是定义阴影位置，扩散半径是定义阴影的原始大小，模糊半径则是发散的大小的

```css
box-shadow: 0 0 10px 10px;
```

上面右边的影音扩散为 0 + 10 + 10 = 20；

```css
box-shadow: 10px 0 10px 10px;
```

上面左边的影音扩散为 -10 + 10 + 10 = 10；
上面右边的影音扩散为 10 + 10 + 10 = 30；

## 文字阴影

文字阴影需要设置的参数比盒子阴影要少一些，只有偏移量，模糊半径和颜色组成。

文字阴影：text-shadow: offset-x, offset-y, blur-radius, color;

- 对比盒子阴影没有扩散半径和阴影类型了，所以不能放大和缩小字体。

## 过滤阴影

这个函数有点类似于 box-shadow 属性。box-shadow 属性在元素的整个框后面创建一个矩形阴影，而 drop-shadow() 过滤器则是创建一个符合图像本身形状 (alpha 通道) 的阴影。

过滤阴影：filter: drop-shadow(offset-x, offset-y, blur-radius, spread-radius color)

比盒子阴影少了 inset 参数，同时 spread-radius 很多浏览器都暂时不支持

## 例子

1 按钮点击凹陷的例子

```html
<div class="button"></div>
```

```css
body {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
}

.button {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.4), -7px -7px 12px rgba(255, 255, 255, 0.9);
}

.button:active {
  box-shadow: inset 7px 7px 12px rgba(0, 0, 0, 0.4), inset -7px -7px 12px rgba(255, 255, 255, 0.9);
}
```
