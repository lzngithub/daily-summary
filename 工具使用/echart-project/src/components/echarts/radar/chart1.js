import { Chart } from "../index";
import echarts from "../charts";

const data = {
  name: "综合指数",
  data: "78.7",
  childList: [
    {
      name: "产业链指数",
      data: "79",
      unit: null,
    },
    {
      name: "人才链指数",
      data: "67",
      unit: null,
    },
    {
      name: "创新链指数",
      data: "71",
      unit: null,
    },
    {
      name: "资金链指数",
      data: "79",
      unit: null,
    },
  ],
};

const dataValue = data.childList.map((item) => item.data);

const maxData = Math.max(...dataValue);

const indicator = data.childList.map((item) => ({
  name: item.name,
  max: maxData,
}));

const option = {
  title: {
    text: data.data,
    subtext: data.name,
    right: "5%",
    top: "5%",
    textStyle: {
      color: "#FCB321FF",
      fontSize: 28,
    },
    subtextStyle: {
      color: "#FFFFFFFF",
      // fontSize: 14,
    },
  },
  radar: {
    indicator,
    radius: 100,
    axisName: {
      backgroundColor: "transparent",
      borderRadius: 3,
      padding: [3, 5],
    },
    // 坐标轴的线
    axisLine: {
      show: true,
      lineStyle: {
        type: "dashed", // 虚线
        color: "#9CD1FFFF",
      },
    },
    // 分割线
    splitLine: {
      show: false,
    },
    // 分隔区域
    splitArea: {
      areaStyle: {
        color: ["#E3F4FA ", "#D1EFFA ", "#C3EDFC ", "#B7EAFC ", "#AEE8FD"],
      },
    },
  },
  series: {
    type: "radar",
    data: [
      {
        value: dataValue,
        symbol: "circle",
        symbolSize: 8,
        label: {
          show: true,
          color: "#FFFFFFFF",
        },
        itemStyle: {
          color: "#FFFFFFFF",
          borderColor: "#0EED8EFF",
          borderWidth: 3,
        },
        lineStyle: {
          color: "#00FFEBFF",
        },
        areaStyle: {
          color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
            {
              color: "#00EEFF2B",
              offset: 0,
            },
            {
              color: "#00D7FFAB",
              offset: 1,
            },
          ]),
        },
      },
    ],
  },
};

export const Chart1 = () => {
  return <Chart option={option}></Chart>;
};
