import { Chart } from "../index";
import echarts from "../charts";
const pathSymbols =
  "image://data:image/png;base64,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";

const offsetX = 11;
const offsetY = 5.5;
// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint;
    // console.log(shape);
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - offsetX, shape.y - offsetY];
    const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
    const c3 = [xAxisPoint[0], xAxisPoint[1]];
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath();
  },
});
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [xAxisPoint[0], xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
    const c4 = [shape.x + offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
    const c3 = [shape.x, shape.y - offsetX];
    const c4 = [shape.x - offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
echarts.graphic.registerShape("CubeLeft", CubeLeft);
echarts.graphic.registerShape("CubeRight", CubeRight);
echarts.graphic.registerShape("CubeTop", CubeTop);
const MAX = [18, 18, 18, 18, 18, 18];
const VALUE = [0, 12, 15, 18, 6, 13];
const option = {
  title: {
    text: "",
    top: 32,
    left: 18,
    textStyle: {
      color: "#00F6FF",
      fontSize: 24,
    },
  },
  grid: {
    left: 1,
    right: 1,
    bottom: 20,
    top: 40,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["包装", "通信", "饮料", "饮料", "软件", "物流"],
    axisLine: {
      show: false,
    },
    offset: 15,
    axisLabel: {
      fontSize: 14,
      color: "#90AFD0",
      interval: 0,
    },
    axisTick: {
      show: false,
      // 不显示坐标轴刻度线
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [
    {
      type: "custom",
      silent: true,
      // 图形是否不响应和触发鼠标事件
      renderItem: function (params, api) {
        const location = api.coord([api.value(0), api.value(1)]);
        return {
          type: "group",
          children: [
            {
              type: "CubeLeft",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: "RGBA(9, 31, 64, 1)",
              },
            },
            {
              type: "CubeRight",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: "RGBA(18, 44, 80, 1)",
              },
            },
            {
              type: "CubeTop",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: "RGBA(34, 57, 91, 1)",
              },
            },
          ],
        };
      },
      data: MAX,
    },
    {
      type: "custom",
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)]);
        return {
          type: "group",

          children: [
            {
              type: "CubeLeft",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(25, 74, 128, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(25, 74, 128, .8)",
                  },
                ]),
              },
            },
            {
              type: "CubeRight",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(56, 117, 182, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(56, 117, 182, .8)",
                  },
                ]),
              },
            },
            {
              type: "CubeTop",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(107, 160, 218, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(107, 160, 218, .8)",
                  },
                ]),
              },
            },
          ],
        };
      },
      data: VALUE,
    },
    {
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "top",
        },
      },
      itemStyle: {
        color: "transparent",
      },
      data: VALUE,
    },
    {
      name: "",
      type: "pictorialBar",
      barGap: "-100%",
      symbolPosition: "end",
      symbolOffset: [0, 3],
      data: [
        {
          value: 1,
          symbol: pathSymbols,
          symbolSize: [48, 22],
        },
        {
          value: 1,
          symbol: pathSymbols,
          symbolSize: [48, 22],
        },
        {
          value: 1,
          symbol: pathSymbols,
          symbolSize: [48, 22],
        },
        {
          value: 1,
          symbol: pathSymbols,
          symbolSize: [48, 22],
        },
        {
          value: 1,
          symbol: pathSymbols,
          symbolSize: [48, 22],
        },
        {
          value: 1,
          symbol: pathSymbols,
          symbolSize: [48, 22],
        },
      ],
    },
  ],
};

export const Chart2 = () => {
  return <Chart option={option}></Chart>;
};
