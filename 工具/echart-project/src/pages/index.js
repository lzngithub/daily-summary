import "./index.css";
import { SimpleChart } from "../components/echarts/bar/simple.js";
import { SimpleRadar } from "../components/echarts/radar/simple.js";

export const Chart = () => {
  return (
    <div className="wrapper">
      <SimpleChart></SimpleChart>
      <SimpleRadar></SimpleRadar>
    </div>
  );
};
