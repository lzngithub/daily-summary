// import logo from './logo.svg'
import { useEffect, useRef } from "react";
import d3Tree from "./d3Tree";
import "./index.css";
import { data } from "./data.js";

function D3Chart() {
  const domRef = useRef();

  useEffect(() => {
    if (data) {
      new d3Tree({ el: domRef.current, data });
    }
  }, []);

  return <div ref={domRef} className="tree"></div>;
}

export default D3Chart;
