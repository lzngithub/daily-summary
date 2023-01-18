import { Chart } from "../index";

const data = [
  {
    name: "国内外顶尖人才",
    value: 10,
    unit: null,
  },
  {
    name: "国家级领军人才",
    value: "20",
    unit: null,
  },
  {
    name: "省级领军人才",
    value: "30",
    unit: null,
  },
  {
    name: "市级领军人才",
    value: "40",
    unit: null,
  },
  {
    name: "高级人才",
    value: "50",
    unit: null,
  },
  {
    name: "新引进大学生",
    value: "60",
    unit: null,
  },
];

const option = {
  series: [
    {
      type: "funnel",
      top: "5%",
      bottom: "5%",
      left: "30%",
      width: "80%",
      min: 0,
      max: 120,
      sort: "ascending",
      gap: 6,
      label: {
        show: true,
        position: "inside",
        color: "rgba(255, 255, 255, 1)",
        verticalAlign: "bottom",
        formatter: (params) => {
          console.log(params);
          return params.data.value;
        },
      },
      itemStyle: {
        borderWidth: 0,
        shadowColor: "rgba(255, 255, 255, 0.2)",
        shadowOffsetX: 4,
        shadowOffsetY: 0,
      },
      data: data,
    },
    {
      type: "funnel",
      top: "5%",
      bottom: "5%",
      left: "-15%",
      width: "20%",
      min: 0,
      max: 120,
      sort: "ascending",
      gap: 6,
      funnelAlign: "right",
      label: {
        color: "#222",
        position: "right",
      },
      labelLine: {
        show: false,
      },
      // 主体是透明的
      itemStyle: {
        color: "transparent",
        borderWidth: 0,
      },
      data: data,
    },
  ],
};
export const Chart2 = () => {
  return <Chart option={option}></Chart>;
};
