import { Chart } from "../index";
import echarts from "../charts";

const data = [
  {
    name: "国际、国内、省内替代技术",
    data: "79",
    unit: null,
  },
  {
    name: "首台套、首批次、首版次",
    data: "67",
    unit: null,
  },
  {
    name: "专利",
    data: "71",
    unit: null,
  },
  {
    name: "新产品、新技术、新工艺",
    data: "79",
    unit: null,
  },
];

const echartData = data.map((item) => ({
  ...item,
  value: Number(item.data),
}));

// 数据整理
let total = echartData.reduce((a, b) => {
  return a + b.value;
}, 0);

const option = {
  tooltip: {
    show: true,
    trigger: "item",
    // trigger: "item",
    // formatter: "{b}: {c} ({d}%)",
  },
  graphic: {
    elements: [
      {
        type: "image",
        z: 3,
        style: {
          image: "",
          width: 90,
          height: 90,
        },
        left: "center",
        top: "36%",
        position: [100, 100],
      },
    ],
  },
  title: {
    text: `{count|${total}}{unit|个}\n{project|  成果}`,
    left: "44%",
    top: "53%",
    textStyle: {
      rich: {
        count: {
          fontSize: 24,
          fontWeight: 600,
        },
        unit: {
          fontSize: 12,
        },
        project: {
          fontSize: 12,
        },
      },
    },
  },
  legend: {
    left: "center",
    top: "5%",
    width: "80%",
    icon: "circle",
    itemWidth: 10,
    itemGap: 13,
    textStyle: {
      fontSize: 14,
    },
    formatter: function (name) {
      let res = echartData.filter((v) => v.name === name);
      return `${name}  ${res[0].value}个`;
    },
  },
  toolbox: {
    show: false,
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: [0, "60%"],
      center: ["50%", "60%"],
      label: {
        show: false,
      },
      hoverAnimation: false,
      emptyCircleStyle: {
        // 无数据的时候使用占位圆的样式
        color: "#94E4FF1A",
      },
    },
    {
      name: "",
      type: "pie",
      radius: ["40%", "55%"],
      center: ["50%", "60%"],
      label: {
        normal: {
          show: false,
        },
      },
      hoverAnimation: false,
      hoverOffset: 5,
      data: echartData,
    },
    {
      name: "",
      type: "pie",
      radius: [0, "35%"],
      center: ["50%", "60%"],
      label: {
        show: false,
      },
      emptyCircleStyle: {
        // 无数据的时候使用占位圆的样式
        color: "transparent",
        borderColor: "#00BDFFFF",
        borderType: "dashed",
      },
      hoverAnimation: false,
    },
  ],
};

export const Chart1 = () => {
  return <Chart option={option}></Chart>;
};
