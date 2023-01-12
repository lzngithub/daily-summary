import { Chart } from "../index";
import echarts from "../charts";

const option = {
  backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      color: "#182950CC",
      offset: 0,
    },
    {
      color: "#13203DFF",
      offset: 1,
    },
  ]),
  title: {
    text: "78.7",
    subtext: "综合指数",
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
  legend: {},
  radar: {
    indicator: [
      { text: "Indicator1", max: 150 },
      { text: "Indicator2", max: 150 },
      { text: "Indicator3", max: 150 },
      { text: "Indicator4", max: 150 },
    ],
    radius: 100,
    axisName: {
      color: "#FFFFFFFF",
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
  series: [
    {
      type: "radar",
      data: [
        {
          value: [140, 93, 50, 90],
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
  ],
};

export const Chart1 = () => {
  return <Chart option={option}></Chart>;
};
