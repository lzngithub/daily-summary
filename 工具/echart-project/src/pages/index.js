import "./index.css";
import { RadarChart } from "../components/echarts/radar";
import { PieChart } from "../components/echarts/pie";
import { BarChart } from "../components/echarts/bar";
import { MapChart } from "../components/echarts/map";
import { FunnelChart } from "../components/echarts/funnel"; // 漏斗图
import { GaugeChart } from "../components/echarts/gauge"; // 仪表盘

export const Chart = () => {
  return (
    <div className="wrapper">
      <BarChart></BarChart>
      <RadarChart></RadarChart>
      <PieChart></PieChart>
      <MapChart></MapChart>
      <FunnelChart></FunnelChart>
      <GaugeChart></GaugeChart>
    </div>
  );
};
