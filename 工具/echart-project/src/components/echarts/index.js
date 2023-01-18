import echarts from "./charts";
import westeros from "./theme/westeros";
import chalk from "./theme/chalk";
import { useEffect, useRef, useState } from "react";

export const Chart = (props) => {
  const { option, size = "small" } = props;
  const chartRef = useRef(null);
  const domRef = useRef(null);
  const [style, setStyle] = useState({
    height: "600px",
    width: "100%",
  });

  useEffect(() => {
    // 注册主题
    echarts.registerTheme("westeros", westeros);
    // 初始化图表
    chartRef.current = echarts.init(domRef.current, "westeros");
  }, []);

  useEffect(() => {
    if (option && chartRef) {
      chartRef.current.setOption(option);
    }
  }, [option]);

  useEffect(() => {
    const styleObject = {
      small: { height: "300px", width: "30%" },
      large: { height: "600px", width: "100%" },
    };
    setStyle(styleObject[size]);
  }, [size]);

  useEffect(() => {
    if (domRef.current && chartRef.current) {
      chartRef.current.resize();
    }
  }, [style]);

  useEffect(() => {
    if (domRef.current && chartRef.current) {
      window.addEventListener("resize", chartRef.current.resize);
    }
    return () => {
      window.removeEventListener("resize", chartRef.current.resize);
    };
  }, []);

  return <div ref={domRef} className="card" style={style}></div>;
};
