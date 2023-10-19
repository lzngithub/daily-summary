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

    //箭头(下半部分)
    svg
      .append("marker")
      .attr("id", "markerOfDown")
      .attr("markerUnits", "userSpaceOnUse")
      .attr("viewBox", "0 -5 10 10") //坐标系的区域
      .attr("refX", 50) //箭头坐标
      .attr("refY", 0)
      .attr("markerWidth", 10) //标识的大小
      .attr("markerHeight", 10)
      .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr("stroke-width", 2) //箭头宽度
      .append("path")
      .attr("d", "M0,-5L10,0L0,5") //箭头的路径
      .attr("fill", "#63B4FF"); //箭头颜色

    //箭头(上半部分)
    svg
      .append("marker")
      .attr("id", "markerOfUp")
      .attr("markerUnits", "userSpaceOnUse")
      .attr("viewBox", "0 -5 10 10") //坐标系的区域
      .attr("refX", -40) //箭头坐标
      .attr("refY", 0)
      .attr("markerWidth", 10) //标识的大小
      .attr("markerHeight", 10)
      .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr("stroke-width", 2) //箭头宽度
      .append("path")
      .attr("d", "M0,-5L10,0L0,5") //箭头的路径
      .attr("fill", "#63B4FF"); //箭头颜色

    const group = svg.append("g").attr("transform", "translate(640,300)");

    const dataSet = d3.hierarchy(this.data);
    console.log(dataSet);
    //创建树布局
    const tree = d3.tree().size([600, 600]).nodeSize([150, 130]);
    //所有的节点
    const nodes = tree(dataSet);

    group
      .selectAll(".link")
      .data(nodes.links())
      .join("path")
      .attr("class", "link")
      .attr("d", (d) => {
        return this.drawLink(d);
      })
      .attr("fill", "none")
      .attr("stroke", "#5682ec")
      .attr("marker-end", "url(#markerOfDown)");

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

    //所有的节点
    const nodesOfUp = tree(dataSet);
    console.log(nodesOfUp.descendants());
    nodesOfUp.descendants().forEach((node) => {
      node.y = -node.y;
    });
    group
      .selectAll(".linkUp")
      .data(nodesOfUp.links())
      .join("path")
      .attr("class", "linkUp")
      .attr("d", (d) => {
        return this.drawLink(d);
      })
      .attr("fill", "none")
      .attr("stroke", "#5682ec")
      .attr("marker-end", "url(#markerOfUp)");

    const nodeUpGroups = group
      .selectAll(".nodeUp")
      .data(nodesOfUp.descendants())
      .join("g")
      .attr("calss", (d) => {
        return "nodeUp" + (d.children ? " nodeUp--internal" : " nodeUp--leaf");
      })
      .attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
      });

    nodeUpGroups
      .append("rect")
      .attr("width", 100)
      .attr("height", 50)
      .attr("x", -50)
      .attr("y", -25)
      .attr("fill", "#7A9EFF");

    nodeUpGroups
      .append("text")
      .attr("dy", ".33em")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .text((d) => d.data.name);
  }

  // 直角连接线
  drawLink({ source, target }) {
    const halfDistance = (target.y - source.y) / 2;
    const halfY = source.y + halfDistance;
    return `M${source.x},${source.y} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`;
  }
}

export default D3Tree;
