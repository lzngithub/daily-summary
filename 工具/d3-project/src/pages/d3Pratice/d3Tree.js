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
    let oldSvg = d3.select("svg");
    // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
    if (!oldSvg.empty()) {
      oldSvg.remove();
    }
    const svg = d3
      .select(this.el)
      .append("svg")
      .attr("width", 1280)
      .attr("height", 600);
    const group = svg.append("g").attr("transform", "translate(640,50)");

    const dataSet = d3.hierarchy(this.data);
    console.log(dataSet);
    //创建树布局
    const tree = d3.tree().size([600, 600]).nodeSize([150, 100]);
    //所有的节点
    const nodes = tree(dataSet);
    console.log(nodes);
    console.log(nodes.descendants()); // 返回所有节点

    group
      .selectAll(".link")
      .data(nodes.links())
      .join("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.x)
          .y((d) => d.y)
      )
      .attr("fill", "none")
      .attr("stroke", "#5682ec");

    const nodeGroups = group
      .selectAll(".node")
      .data(nodes.descendants())
      .join("g")
      .attr("calss", (d) => {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
      });

    nodeGroups
      .append("rect")
      .attr("width", 100)
      .attr("height", 50)
      .attr("x", -50)
      .attr("y", -25)
      .attr("fill", "#7A9EFF");

    nodeGroups
      .append("text")
      .attr("dy", ".33em")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .text((d) => d.data.name);
  }
}

export default D3Tree;
