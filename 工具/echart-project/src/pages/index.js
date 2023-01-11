import echarts from "../components/echarts";

import { useEffect, useRef } from "react";

const option = {
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
};

export const Chart = () => {
  const chartRef = useRef(null);
  const domRef = useRef(null);

  useEffect(() => {
    console.log("init");
    console.log(domRef);
    chartRef.current = echarts.init(domRef.current);
    chartRef.current.setOption(option);
  }, []);

  return (
    <div ref={domRef} style={{ height: "300px" }}>
      999
    </div>
  );
};
