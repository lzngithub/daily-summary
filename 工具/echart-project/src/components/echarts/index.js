import echarts from "./charts";
import westeros from "./theme/westeros";
import chalk from "./theme/chalk";
import { useEffect, useRef } from "react";

export const Chart = (props) => {
  const { option } = props;
  const chartRef = useRef(null);
  const domRef = useRef(null);

  useEffect(() => {
    echarts.registerTheme("westeros", westeros);
    chartRef.current = echarts.init(domRef.current, "westeros");
    chartRef.current.setOption(option);
  }, [option]);

  useEffect(() => {
    if (domRef.current && chartRef.current) {
      window.addEventListener("resize", chartRef.current.resize);
    }
    return () => {
      window.removeEventListener("resize", chartRef.current.resize);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className="card"
      style={{ height: "300px", width: "30%" }}
    ></div>
  );
};
