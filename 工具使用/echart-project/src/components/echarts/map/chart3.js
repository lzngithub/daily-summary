import { Chart } from "../index";
import echarts from "../charts";
import mapJSON from "./data/zhejiang";

// 地图的纹理普通状态
const img = new Image();
const bgPatternSrc = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAD6ADAAQAAAABAAAADwAAAAAHNtsJAAAApUlEQVQoFZ2SXRKDIAyEE0i5RI/Y8/elijGrHaQgP9N9cDLgl11j+Pl6K0FeSEWOsvmIkXhd0rU7Ku/H4GZgvEBwMuUIcPkFAbth1AZIjumMjTZ3aoHMpI/QgXtgCGbVcp4AEbSOPQnWcA+0b0TUXJfzCLQhlTrhP0A0EipWLnXH7/hONZ0Vhct3Nd1NgLTpzbQnQV4/FjuXrZxKPdX8FTgCJFXaATOiT5wDK+FFAAAAAElFTkSuQmCC`;
img.src = bgPatternSrc;

echarts.registerMap("area3", mapJSON);
var option = {
  // 地图的阴影底图
  geo: [
    {
      itemStyle: {
        borderWidth: 3,
        borderColor: "#7CE8FF",
        areaColor: {
          image: img,
          repeat: "repeat",
        },
      },
      label: {
        show: true,
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "bold",
      },
      emphasis: {
        label: {
          show: true,

          color: "#ffffff",
          fontSize: 15,
        },
        itemStyle: {
          areaColor: "#38C8FF",
          borderColor: "#7CE8FF",
          borderWidth: 3,
          // shadowOffsetY: 5,
        },
      },
      select: {
        label: {
          show: true,
          color: "#ffffff",
          fontSize: 15,
        },
        itemStyle: {
          areaColor: "#38C8FF",
          borderColor: "#7CE8FF",
          borderWidth: 3,
        },
      },
      center: null,
      roam: false,
      layoutCenter: null,
      layoutSize: null,
      map: "area3",
      selectedMode: false,
    },
  ],
  tooltip: {
    trigger: "item",
    axisPointer: {
      type: "shadow",
    },
    triggerOn: "mousemove",
    position: "right",
    appendToBody: true,
    extraCssText: `
      border: none;
      background: #fff;
      padding: 5;
    `,
    formatter: (e) => {
      return null;
    },
  },
};

export const Chart3 = () => {
  return <Chart option={option}></Chart>;
};
