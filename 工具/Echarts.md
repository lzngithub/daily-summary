# Echarts

## 定位

echarts 是基于 JavaScript 开源的可视化图表组库

## 背景起源

Echarts：Enterprise Charts，商业级数据图表，百度团队开源，后捐赠给Apache基金会，因此叫Apache Echarts。

## 基础使用（react项目）

### 1. 获取Echarts，

* npm获取
```bash
npm i echarts
```

* cdn获取

```bash
https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js
```

* github上获取

github链接：https://github.com/apache/echarts

* 定制获取

官网链接：https://echarts.apache.org/zh/builder.html

### 2. 引入Echarts

```js
import * as echarts from 'echarts';

export const Cecharts = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
  return <div id="main" style={{width: '300px', height: '300px'}}></div>
}
```