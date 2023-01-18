import "./index.css";
import { RadarChart } from "../components/echarts/radar";
import { PieChart } from "../components/echarts/pie";
import { BarChart } from "../components/echarts/bar";
import { MapChart } from "../components/echarts/map";
import { FunnelChart } from "../components/echarts/funnel"; // 漏斗图

export const Chart = () => {
  return (
    <div className="wrapper">
      <BarChart></BarChart>
      <RadarChart></RadarChart>
      <PieChart></PieChart>
      <MapChart></MapChart>
      <FunnelChart></FunnelChart>
    </div>
  );
};
