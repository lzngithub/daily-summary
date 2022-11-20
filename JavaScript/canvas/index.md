# canvas

html5 新增，是一个运行js脚本的html元素

## 例子

```html
<canvas id="can" width="300" height="300">
    你的浏览器不支持canvas，请升级你的浏览器
</canvas>
```

```js
function draw() {
    let can = document.getElementById('can')
    if (!can.getContext) return
    var ctx = can.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
    //绘制矩形
    ctx.fillRect(10, 10, 55, 50); // x,y,width,height
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 55, 50);
}
draw()
```
结果：
 
![结果](./photo/example.png)

## 基本api

在w3c school 中，将canvas提供的绘制API大致分为以下几种：

* 颜色、样式、阴影
* 线条样式
* 矩形
* 路径
* 转换
* 文本
* 图像绘制
* 像素操作
* 合成
* 其他

## 注意事项

1. canvas结束标签不可以省略，因为省略的话，中间部分就会被认为是替代的内容。
2. 不设置宽高时，默认width：300， height：150
3. 不要通过css去设置元素的宽高，有可能出现画布扭曲