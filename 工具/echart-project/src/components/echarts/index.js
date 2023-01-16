import echarts from "./charts";
import { useEffect, useRef } from "react";

export const Chart = (props) => {
  const { option } = props;
  const chartRef = useRef(null);
  const domRef = useRef(null);

  useEffect(() => {
    console.log("init");
    chartRef.current = echarts.init(domRef.current, "dark");
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
