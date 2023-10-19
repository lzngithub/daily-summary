import * as d3 from "d3";

// 股权树
class D3Tree {
  constructor(options) {
    // 树的源数据
    this.originTreeData = options.data;
    // 宿主元素选择器
    this.el = options.el;
    this.nodeClickEvent =
      options.nodeClickEvent ||
      function (event, node) {
        const { data } = node;
        if (data?.id && data?.id !== options.data.id) {
          window.open(`/source/detail?id=${data.id}&type=company`);
        }
      };
    // 一些配置项
    this.config = {
      // 节点的横向距离
      dx: 230,
      // 节点的纵向距离
      dy: 150,
      // svg的viewBox的宽度
      width: 0,
      // svg的viewBox的高度
      height: 0,
      // 节点的矩形框宽度
      rectWidth: 200,
      // 节点的矩形框高度
      rectHeight: 72,
    };
    this.svg = null;
    this.gAll = null;
    this.gLinks = null;
    this.gNodes = null;
    // 给树加坐标点的方法
    this.tree = null;
    // 投资公司树的根节点
    this.rootOfDown = null;
    // 股东树的根节点
    this.rootOfUp = null;

    this.drawChart({
      type: "fold",
    });
  }

  // 初始化树结构数据
  drawChart(options) {
    // 宿主元素的d3选择器对象
    let host = d3.select(this.el);
    // 宿主元素的DOM，通过node()获取到其DOM元素对象
    let dom = host.node();
    // 宿主元素的DOMRect
    let domRect = dom.getBoundingClientRect();
    // svg的宽度和高度
    this.config.width = domRect.width;
    this.config.height = domRect.height;

    let oldSvg = d3.select("svg");
    // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
    if (!oldSvg.empty()) {
      oldSvg.remove();
    }

    const svg = d3
      .create("svg")
      .attr("viewBox", () => {
        let parentsLength = this.originTreeData.parents
          ? this.originTreeData.parents.length
          : 0;
        return [
          -this.config.width / 2,
          // 如果有父节点，则根节点居中，否则根节点上浮一段距离
          parentsLength > 0 ? -this.config.height / 2 : -this.config.height / 3,
          this.config.width,
          this.config.height,
        ];
      })
      .style("user-select", "none")
      .style("cursor", "move");

    // 包括连接线和节点的总集合
    const gAll = svg.append("g").attr("id", "all");
    svg
      .call(
        d3
          .zoom()
          .scaleExtent([0.2, 5])
          .filter((e) => {
            // isWheelEvent为是否滚轮事件
            const isWheelEvent = e instanceof WheelEvent;
            return !isWheelEvent && e;
          })
          .on("zoom", (e) => {
            gAll.attr("transform", () => {
              return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`;
            });
          })
      )
      .on("dblclick.zoom", null); // 取消默认的双击放大事件

    this.gAll = gAll;
    // 连接线集合
    this.gLinks = gAll.append("g").attr("id", "linkGroup");
    // 节点集合
    this.gNodes = gAll.append("g").attr("id", "nodeGroup");
    // 设置好节点之间距离的tree方法
    this.tree = d3.tree().nodeSize([this.config.dx, this.config.dy]);

    this.rootOfDown = d3.hierarchy(this.originTreeData, (d) => d.children);
    this.rootOfUp = d3.hierarchy(this.originTreeData, (d) => d.parents);
    this.tree(this.rootOfDown);
    [this.rootOfDown.descendants(), this.rootOfUp.descendants()].forEach(
      (nodes) => {
        nodes.forEach((node) => {
          node._children = node.children || null;
          if (options.type === "all") {
            //如果是all的话，则表示全部都展开
            node.children = node._children;
          } else if (options.type === "fold") {
            //如果是fold则表示除了父节点全都折叠
            // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
            if (node.depth) {
              node.children = null;
            }
          }
        });
      }
    );

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

    this.svg = svg;
    this.update();
    // 将svg置入宿主元素中
    host.append(function () {
      return svg.node();
    });
  }

  // 更新数据
  update(sources) {
    let source = sources;
    if (!source) {
      source = {
        x0: 0,
        y0: 0,
      };
      // 设置根节点所在的位置（原点）
      this.rootOfDown.x0 = 0;
      this.rootOfDown.y0 = 0;
      this.rootOfUp.x0 = 0;
      this.rootOfUp.y0 = 0;
    }

    let nodesOfDown = this.rootOfDown.descendants().reverse();
    let linksOfDown = this.rootOfDown.links();
    let nodesOfUp = this.rootOfUp.descendants().reverse();
    let linksOfUp = this.rootOfUp.links();

    this.tree(this.rootOfDown);
    this.tree(this.rootOfUp);

    const myTransition = this.svg.transition().duration(500);

    /***  绘制子公司树  ***/
    const node1 = this.gNodes
      .selectAll("g.nodeOfDownItemGroup")
      .data(nodesOfDown, (d) => {
        return d.data.id;
      });

    const node1Enter = node1
      .enter()
      .append("g")
      .attr("class", "nodeOfDownItemGroup")
      .attr("transform", (d) => {
        return `translate(${source.x0},${source.y0})`;
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .style("cursor", "pointer");

    // 外层的矩形框
    node1Enter
      .append("rect")
      .attr("width", (d) => {
        console.log(d, "ddddddd");
        if (d.depth === 0) {
          return (d.data.name.length + 2) * 16;
        }
        return this.config.rectWidth;
      })
      .attr("height", (d) => {
        if (d.depth === 0) {
          return 30;
        }
        return this.config.rectHeight;
      })
      .attr("x", (d) => {
        if (d.depth === 0) {
          return (-(d.data.name.length + 2) * 16) / 2;
        }
        return -this.config.rectWidth / 2;
      })
      .attr("y", (d) => {
        if (d.depth === 0) {
          return -15;
        }
        return -20;
        // return this.config.rectHeight / 2;
      })
      .attr("rx", 5)
      .attr("stroke-width", 1)
      .attr("stroke", (d) => {
        if (d.depth === 0) {
          return "#5682ec";
        }
        return "#ffffff";
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#7A9EFF";
        }
        return "#DDEFFF";
      })
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });

    // 文本主标题
    node1Enter
      .append("text")
      .attr("class", "main-title")
      .attr("x", (d) => {
        return 0;
      })
      .attr("y", (d) => {
        if (d.data?.name?.length > 11) {
          return -4;
        }
        return 14;
      })
      .attr("text-anchor", (d) => {
        return "middle";
      })
      .text((d) => {
        if (d.depth === 0) {
          return d.data.name;
        } else {
          return d.data?.name?.length > 11
            ? d.data.name.substring(0, 11)
            : d.data.name;
        }
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#FFFFFF";
        }
        return "#1e84f6";
      })
      .style("font-size", (d) => (d.depth === 0 ? 16 : 14))
      .style("font-family", "黑体")
      .style("font-weight", "bold")
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });
    // 副标题
    node1Enter
      .append("text")
      .attr("class", "sub-title")
      .attr("x", (d) => {
        return 0;
      })
      .attr("y", (d) => {
        if (d.data?.name?.length > 11) {
          return 20;
        }
        return 20;
        // return 5
      })
      .attr("text-anchor", (d) => {
        return "middle";
      })
      .text((d) => {
        if (d.depth !== 0) {
          let subTitle = d.data.name.substring(11);
          if (subTitle.length > 10) {
            return subTitle.substring(0, 10) + "...";
          }
          return subTitle;
        }
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#FFFFFF";
        }
        return "#1e84f6";
      })
      .style("font-size", (d) => 14)
      .style("font-family", "黑体")
      .style("font-weight", "bold")
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });

    // 认缴金额
    node1Enter
      .append("text")
      .attr("class", "money")
      .attr("x", (d) => {
        return 0;
      })
      .attr("y", (d) => {
        return 40;
      })
      .attr("text-anchor", (d) => {
        return "middle";
      })
      .text((d) => {
        if (d.depth !== 0) {
          let money = d.data.invest_amount || "--";

          return `认缴金额：${money}`;
        }
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#FFFFFF";
        }
        return "#808080";
      })
      .style("font-size", (d) => 14)
      .style("font-family", "黑体")
      .style("font-weight", "normal")
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });

    // 占比-下面的
    node1Enter
      .append("text")
      .attr("class", "percent")
      .attr("x", (d) => {
        return 12;
      })
      .attr("y", (d) => {
        return -40;
      })
      .text((d) => {
        if (d.depth !== 0) {
          return d.data.percent;
        }
      })
      .attr("fill", "#1e84f6")
      .style("font-family", "黑体")
      .style("font-size", (d) => 14);

    // 增加展开按钮
    const expandBtnG = node1Enter
      .append("g")
      .attr("class", "expandBtn")
      .attr("transform", (d) => {
        return `translate(${0},${this.config.rectHeight / 2})`;
      })
      .style("display", (d) => {
        // 如果是根节点，不显示
        if (d.depth === 0) {
          return "none";
        }
        // 如果没有子节点，则不显示
        if (!d._children) {
          return "none";
        }
      })
      .on("click", (e, d) => {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
        }
        this.update(d);
      });

    expandBtnG
      .append("circle")
      .attr("r", 8)
      .attr("fill", "#7A9EFF")
      .attr("cy", 8);

    expandBtnG
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("y", 13)
      .style("font-size", 16)
      .style("font-family", "微软雅黑")
      .text((d) => {
        return d.children ? "-" : "+";
      });

    const link1 = this.gLinks
      .selectAll("path.linkOfDownItem")
      .data(linksOfDown, (d) => d.target.data.id);

    const link1Enter = link1
      .enter()
      .append("path")
      .attr("class", "linkOfDownItem")
      .attr("d", (d) => {
        let o = {
          source: {
            x: source.x0,
            y: source.y0,
          },
          target: {
            x: source.x0,
            y: source.y0,
          },
        };
        return this.drawLink(o);
      })
      .attr("fill", "none")
      .attr("stroke", "#63B4FF")
      .attr("stroke-width", 1)
      .attr("marker-end", "url(#markerOfDown)");

    // 有元素update更新和元素新增enter的时候
    node1
      .merge(node1Enter)
      .transition(myTransition)
      .attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
      })
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // 有元素消失时
    node1
      .exit()
      .transition(myTransition)
      .remove()
      .attr("transform", (d) => {
        return `translate(${source.x0},${source.y0})`;
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    link1.merge(link1Enter).transition(myTransition).attr("d", this.drawLink);

    link1
      .exit()
      .transition(myTransition)
      .remove()
      .attr("d", (d) => {
        let o = {
          source: {
            x: source.x,
            y: source.y,
          },
          target: {
            x: source.x,
            y: source.y,
          },
        };
        return this.drawLink(o);
      });

    /***  绘制股东树  ***/

    nodesOfUp.forEach((node) => {
      node.y = -node.y;
    });

    const node2 = this.gNodes
      .selectAll("g.nodeOfUpItemGroup")
      .data(nodesOfUp, (d) => {
        return d.data.id;
      });

    const node2Enter = node2
      .enter()
      .append("g")
      .attr("class", "nodeOfUpItemGroup")
      .attr("transform", (d) => {
        return `translate(${source.x0},${source.y0})`;
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .style("cursor", "pointer");

    // 外层的矩形框
    node2Enter
      .append("rect")
      .attr("width", (d) => {
        if (d.depth === 0) {
          return (d.data.name.length + 2) * 16;
        }
        return this.config.rectWidth;
      })
      .attr("height", (d) => {
        if (d.depth === 0) {
          return 40;
        }
        return this.config.rectHeight;
      })
      .attr("x", (d) => {
        if (d.depth === 0) {
          return (-(d.data.name.length + 2) * 16) / 2;
        }
        return -this.config.rectWidth / 2;
      })
      .attr("y", (d) => {
        if (d.depth === 0) {
          return -15;
        }
        return -60;
        // return -this.config.rectHeight / 2;
      })
      .attr("rx", 5)
      .attr("stroke-width", 1)
      .attr("stroke", (d) => {
        if (d.depth === 0) {
          return "#1e84f6";
        }
        return "#ffffFF";
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#1e84f6";
        }
        return "#DDEFFF";
      })
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });
    // 文本主标题
    node2Enter
      .append("text")
      .attr("class", "main-title")
      .attr("x", (d) => {
        return 0;
      })
      .attr("y", (d) => {
        if (d.depth === 0) {
          return 10;
        }
        if (d.data.name.length > 11) {
          return -38;
        }
        return -28;
      })
      .attr("text-anchor", (d) => {
        return "middle";
      })
      .text((d) => {
        if (d.depth === 0) {
          return d.data.name;
        } else {
          return d.data.name.length > 11
            ? d.data.name.substring(0, 11)
            : d.data.name;
        }
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#FFFFFF";
        }
        return "#1e84f6";
      })
      .style("font-size", (d) => (d.depth === 0 ? 16 : 14))
      .style("font-family", "黑体")
      .style("font-weight", "bold")
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });
    // 副标题
    node2Enter
      .append("text")
      .attr("class", "sub-title")
      .attr("x", (d) => {
        return 0;
      })
      .attr("y", (d) => {
        if (d.data.name.length > 11) {
          return -20;
        }
        return -20;
        // return 5
      })
      .attr("text-anchor", (d) => {
        return "middle";
      })
      .text((d) => {
        if (d.depth !== 0) {
          let subTitle = d.data.name.substring(11);
          if (subTitle.length > 10) {
            return subTitle.substring(0, 10) + "...";
          }
          return subTitle;
        }
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#FFFFFF";
        }
        return "#1e84f6";
      })
      .style("font-size", (d) => 14)
      .style("font-family", "黑体")
      .style("font-weight", "bold")
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });

    // 持股数
    node2Enter
      .append("text")
      .attr("class", "percent")
      .attr("x", (d) => {
        return 0;
      })
      .attr("y", (d) => {
        return 2;
      })
      .text((d) => {
        if (d.depth !== 0) {
          return `持股数：${d.data.stock_amount || "--"}`;
        }
      })
      .attr("text-anchor", (d) => {
        return "middle";
      })
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return "#FFFFFF";
        }
        return "#808080";
      })
      .style("font-family", "黑体")
      .style("font-size", (d) => 14)
      .on("click", (e, d) => {
        this.nodeClickEvent(e, d);
      });

    // 控股比例-上部分
    node2Enter
      .append("text")
      .attr("class", "percent")
      .attr("x", (d) => {
        return 12;
      })
      .attr("y", (d) => {
        return 50;
      })
      .text((d) => {
        if (d.depth !== 0) {
          return d.data.percent;
        }
      })
      .attr("fill", "#1e84f6")
      .style("font-family", "黑体")
      .style("font-size", (d) => 14);

    // 增加展开按钮
    const expandBtnG2 = node2Enter
      .append("g")
      .attr("class", "expandBtn")
      .attr("transform", (d) => {
        return `translate(${0},${-this.config.rectHeight / 2})`;
      })
      .style("display", (d) => {
        // 如果是根节点，不显示
        if (d.depth === 0) {
          return "none";
        }
        // 如果没有子节点，则不显示
        if (!d._children) {
          return "none";
        }
      })
      .on("click", (e, d) => {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
        }
        this.update(d);
      });

    expandBtnG2
      .append("circle")
      .attr("r", 8)
      .attr("fill", "#7A9EFF")
      .attr("cy", -8);

    expandBtnG2
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr("y", -3)
      .style("font-size", 16)
      .style("font-family", "微软雅黑")
      .text((d) => {
        return d.children ? "-" : "+";
      });

    const link2 = this.gLinks
      .selectAll("path.linkOfUpItem")
      .data(linksOfUp, (d) => d.target.data.id);

    const link2Enter = link2
      .enter()
      .append("path")
      .attr("class", "linkOfUpItem")
      .attr("d", (d) => {
        let o = {
          source: {
            x: source.x0,
            y: source.y0,
          },
          target: {
            x: source.x0,
            y: source.y0,
          },
        };
        return this.drawLink(o);
      })
      .attr("fill", "none")
      .attr("stroke", "#63B4FF")
      .attr("stroke-width", 1)
      .attr("marker-end", "url(#markerOfUp)");

    // 有元素update更新和元素新增enter的时候
    node2
      .merge(node2Enter)
      .transition(myTransition)
      .attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
      })
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // 有元素消失时
    node2
      .exit()
      .transition(myTransition)
      .remove()
      .attr("transform", (d) => {
        return `translate(${source.x0},${source.y0})`;
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    link2.merge(link2Enter).transition(myTransition).attr("d", this.drawLink);

    link2
      .exit()
      .transition(myTransition)
      .remove()
      .attr("d", (d) => {
        let o = {
          source: {
            x: source.x,
            y: source.y,
          },
          target: {
            x: source.x,
            y: source.y,
          },
        };
        return this.drawLink(o);
      });

    // node数据改变的时候更改一下加减号
    const expandButtonsSelection = d3.selectAll("g.expandBtn");

    expandButtonsSelection
      .select("text")
      .transition()
      .text((d) => {
        return d.children ? "-" : "+";
      });

    this.rootOfDown.eachBefore((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    this.rootOfUp.eachBefore((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // 直角连接线
  drawLink({ source, target }) {
    const halfDistance = (target.y - source.y) / 2;
    const halfY = source.y + halfDistance;
    return `M${source.x},${source.y} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`;
  }

  // 展开所有的节点
  expandAllNodes() {
    this.drawChart({
      type: "all",
    });
  }

  // 将所有节点都折叠
  foldAllNodes() {
    this.drawChart({
      type: "fold",
    });
  }
}

export default D3Tree;
