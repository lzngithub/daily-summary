#svg

## svg 标签

基本属性

- width
- height
- style

## rect

基本属性

- x
- y
- width
- height

表现属性,可通过 style 设置,也可单独设置,也可通过 class 设置

- stoke: 描边
- stroke-width: 描边宽度
- fill: 填充颜色

## line 线段

- x1
- y1
- x2
- y2

## circle 圆

- cx: 圆心 x 坐标
- cy: 圆心 y 坐标
- r:半径

## ellipse 椭圆

- cx: 圆心 x 坐标
- cy: 圆心 y 坐标
- rx: x 半径
- ry: y 半径

## plygon 多边形

- points: 点集合,形式: “x1, y1 x2, y2 x3, y3 ...”

## plygonline 折线,不闭合

- points: 点集合,形式: “x1, y1 x2, y2 x3, y3 ...”

## path 路径

- m:moveto
- l:lineto
- h:h200,水平画线
- v:v200,垂直画线
- Q:Q200, 200 400, 400: 二次贝塞尔曲线
- T:T400, 400: 二次贝塞尔曲线
- C:C200, 200 300, 300 400, 400: 三次贝塞尔曲线
- S:S200, 200 400, 400 : 三次贝塞尔曲线
- Z: 闭合
- A: 圆弧
