import { Chart } from "../index";

const data = [
  { value: 60, name: "Visit" },
  { value: 40, name: "Inquiry" },
  { value: 20, name: "Order" },
  { value: 80, name: "Click" },
  { value: 100, name: "Show" },
];

const option = {
  series: [
    {
      name: "",
      type: "funnel",
      label: {
        position: "center",
        color: "#fff",
      },
      data: data,
    },
  ],
};

export const Chart1 = () => {
  return <Chart option={option}></Chart>;
};
