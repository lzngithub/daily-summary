// import logo from './logo.svg'
import { useEffect, useRef } from "react";
import d3Tree from "./d3Tree";
import "./index.css";
import { data } from "./data.js";

export default function D3Pratice() {
  const domRef = useRef();
  useEffect(() => {
    if (data) {
      new d3Tree({ el: domRef.current, data });
    }
  }, []);

  return <div ref={domRef} className="tree"></div>;
}
