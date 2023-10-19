import { Chart } from "../index";

const option = {
  series: [
    {
      type: "gauge",
      data: [
        {
          value: 50,
          name: "Percent",
        },
      ],
    },
  ],
};

export const Chart1 = () => {
  return <Chart option={option}></Chart>;
};
