import { Chart } from "../index";

const data = [
  {
    name: "衬衫",
    value: 10,
  },
  {
    name: "雪纺衫",
    value: 20,
  },
  {
    name: "裤子",
    value: 36,
  },
  {
    name: "高跟鞋",
    value: 10,
  },
  {
    name: "袜子",
    value: 20,
  },
];
const maxValue = Math.max(...data.map((v) => v.value));
const cap = maxValue * 0.15;
const chartsData = data;

const option = {
  grid: {
    top: "20%",
    bottom: "20%",
    left: "15%",
    right: "5%",
  },
  tooltip: {},
  yAxis: [
    {
      type: "category",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: data.map((v) => v.name),
    },
  ],
  xAxis: {
    show: false,
  },
  series: [
    {
      type: "bar",
      barWidth: "50%",
      data: chartsData,
      z: 2,
      itemStyle: {
        color: "#67CBFFFF",
      },
      label: {
        show: true,
      },
    },
    {
      type: "pictorialBar",
      barGap: "-100%",
      barWidth: "50%",
      symbolPosition: "end",
      symbolSize: [cap, "120%"],
      symbolOffset: [2, 0],
      symbolRotate: -15,
      symbol: "rect",
      itemStyle: {
        color: "#2F91FE",
      },
      z: 3,
      data: chartsData,
    },
    {
      type: "bar",
      barGap: "-100%",
      barWidth: "50%",
      data: new Array(chartsData.length).fill({ value: maxValue }),
      itemStyle: {
        color: "#E6E9F2FF",
      },
      label: {
        show: true,
        position: "right",
      },
      z: 1,
    },
  ],
};

export const Chart2 = () => {
  console.log(option);
  return <Chart option={option}></Chart>;
};
