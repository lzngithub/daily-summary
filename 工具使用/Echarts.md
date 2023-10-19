# Echarts

## 定位

echarts 是基于 JavaScript 开源的可视化图表组库

## 背景起源

Echarts：Enterprise Charts，商业级数据图表，百度团队开源，后捐赠给 Apache 基金会，因此叫 Apache Echarts。

## 基础使用（react 项目）

### 1. 获取 Echarts，

- npm 获取

```bash
npm i echarts
```

- cdn 获取

```bash
https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js
```

- github 上获取

github 链接：https://github.com/apache/echarts

- 定制获取

官网链接：https://echarts.apache.org/zh/builder.html

### 2. 引入 Echarts

```js
import * as echarts from "echarts";

export const Cecharts = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("main"));
  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
  return <div id="main" style={{ width: "300px", height: "300px" }}></div>;
};
```

## 使用技巧

### 折线图不是按照 x 轴顺序去连接的

这种折线图叫做双数值轴折线图，x 轴和 y 轴都为数值轴，data 结构为下面这样

```js
data: [
        [10, 40],
        [50, 100],
        [40, 20]
      ],
```

### 柱状图重叠

通过 barGap 设置为负值可以使柱状图进行重叠，同时可以通过 stack 设置同一个值进行堆叠。

例如：

```js
series: [
  {
    barGap: "-100%",
  },
];
```

```js
series: [
  {
    stack: "ad",
  },
  {
    stack: "ad",
  },
];
```

### spitLine 设置成虚线

```js
splitLine: {
  lineStyle: {
    type: [10, 10], // 设置特别的虚线
  },
},
```
