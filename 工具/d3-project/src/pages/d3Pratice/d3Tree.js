import * as d3 from "d3";

// 股权树
class D3Tree {
  constructor(options) {
    const { data, el } = options;
    console.log(data, el);
    this.el = el;
    this.data = data;
    this.draw();
  }
  draw() {
    console.log("draw");
    const host = d3.select(this.el);
    const dom = host.node();
    console.log(host);
    let oldSvg = d3.select("svg");
    // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
    if (!oldSvg.empty()) {
      oldSvg.remove();
    }
    const svg = d3.create("svg");
    svg
      .attr("viewBox", "0 0 600 600")
      .append("circle")
      .attr("id", "circle")
      .attr("cx", 50)
      .attr("cy", 50) //坐标系的区域
      .attr("r", 50); //箭头坐标
    console.log(svg);
    host.append(function () {
      return svg.node();
    });
  }
}

export default D3Tree;
