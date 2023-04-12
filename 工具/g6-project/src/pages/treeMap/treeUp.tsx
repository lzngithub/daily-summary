// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useMemo, useRef } from 'react';
import styles from './index.less';
import G6 from '@antv/g6';
import { data } from './data';

const defaultEdgeStyle = {
  stroke: 'rgba(216, 216, 216, 1)',
};
const colors = [
  {
    darker: 'rgba(8, 53, 126, 1)',
    lighter: 'rgba(40, 123, 255, 1)',
    text: '密切融合 >80',
    color: '#fff',
  },
  {
    darker: 'rgba(102, 161, 255, 1)',
    lighter: 'rgba(102, 161, 255, 1)',
    color: '#fff',
    text: '充分融合 60-80',
  },

  {
    darker: 'rgba(47, 107, 204, 1)',
    lighter: 'rgba(171, 203, 255, 1)',
    text: '一般融合 30-60',
    color: 'rgba(38, 38, 38, 1)',
  },

  {
    darker: 'rgba(47, 107, 204, 1)',
    lighter: 'rgba(219, 234, 255, 1)',
    text: '尚未融合 <30',
    color: 'rgba(38, 38, 38, 1)',
  },
];
const getColor = (num) => {
  if (typeof num !== 'number') {
    return {
      // 灰色
      darker: 'rgba(216, 216, 216, 1)',
      lighter: 'rgba(233, 239, 245, 1)',
    };
  }
  const n = Number(num);
  if (n < 30) return colors[3];
  if (n < 60) return colors[2];
  if (n < 80) return colors[1];
  return colors[0];
};
function getWidth(str, fontSize) {
  let currentWidth = 0;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  if (str) {
    str.split('').forEach((letter) => {
      if (pattern.test(letter)) {
        currentWidth += fontSize;
      } else {
        currentWidth += G6.Util.getLetterWidth(letter, fontSize);
      }
    });
  }

  return currentWidth;
}

const TreeUp: React.FC = () => {
  const clickNode = useRef(null); // 单击选中的节点
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  // 处理数据
  const chartData = useMemo(() => {
    const formatData = (v: any, level: number) => {
      // level 从1开始，一共三层
      if (level === 2) {
        return {
          id: v.id,
          name: v.name,
          nodeType: v.type,
          fusion: v.fusion,
          children: v.childList.length
            ? [v.childList?.map((i: any) => formatData(i, level + 1))]
            : null,
          level,
        };
      }
      return {
        id: v.id,
        name: v.name,
        nodeType: v.type,
        fusion: v.fusion,
        children: v.childList?.map((i: any) => formatData(i, level + 1)),
        level,
      };
    };
    const chartData = formatData(data, 1);
    console.log(chartData);
    return chartData;
  }, []);
  const initGraph = (chartData) => {
    G6.registerNode('root', {
      setState(name, value, item) {
        const group = item.get('group');
        const model = item.getModel();
        const outer = group.find((e) => e.get('name').indexOf('outer') >= 0);
        const inner = group.find((e) => e.get('name').indexOf('inner') >= 0);
        if (name === 'click') {
          const num = model.fusion;
          // 改变选中的shape的样式
          if (value) {
            // outer.attr({ fill: getColor(num).lighter, stroke: getColor(num).darker });
            outer.attr({ fill: '#fff', stroke: getColor(num).lighter });
            inner.attr({
              fill: getColor(num).lighter,
              stroke: getColor(num).lighter,
            });
          } else {
            // 恢复未选中的初始状态
            inner.attr({
              fill: getColor(num).lighter,
              stroke: getColor(num).lighter,
            });
            outer.attr({
              fill: getColor(num).lighter,
              stroke: getColor(num).lighter,
            });
          }
        }
      },
      draw: (cfg, group) => {
        const size = [188, 54];
        const outerSize = [200, 66];
        const keyShape = group.addShape('rect', {
          draggable: true,
          name: 'node-keyshape',
        });
        group.addShape('rect', {
          attrs: {
            width: outerSize[0],
            height: outerSize[1],
            x: -outerSize[0] / 2, // 0：原本画的位置
            y: -outerSize[1] / 2,
            fill: getColor(cfg.fusion).lighter,
            stroke: getColor(cfg.fusion).darker,
            radius: cfg.nodeType === 1 ? 4 : outerSize[1] / 2,
          },
          draggable: true,
          name: `outer@${cfg.name}@${cfg.id}`,
        });
        group.addShape('rect', {
          attrs: {
            width: size[0],
            height: size[1],
            x: -size[0] / 2,
            y: -size[1] / 2,
            fill: getColor(cfg.fusion).darker,
            radius: cfg.nodeType === 1 ? 4 : size[1] / 2,
          },
          draggable: true,
          name: `inner@${cfg.name}@${cfg.id}`,
        });
        group.addShape('text', {
          attrs: {
            text: `${cfg.name}`,
            fill: getColor(cfg.fusion).color,
            fontSize: 16,
            x: -getWidth(cfg.name, 16) / 2,
            y: 0,
          },
          draggable: true,
          name: `baseName@${cfg.name}@${cfg.id}`,
        });
        group.addShape('text', {
          attrs: {
            text: cfg?.fusion === 0 ? `(0)` : `(${cfg.fusion})`,
            fill: getColor(cfg.fusion).color,
            fontSize: 16,
            x: cfg?.fusion
              ? -getWidth(cfg?.fusion === 0 ? `(0)` : `(${cfg.fusion})`, 16) / 2
              : 0,
            y: 20,
          },
          draggable: true,
          name: `info@${cfg.name}@${cfg.id}`,
        });
        return keyShape;
      },
    });

    G6.registerNode(
      'node',
      {
        setState(name, value, item) {
          const group = item.get('group');
          const model = item.getModel();
          const rectShape = group.find(
            (e) => e.get('name').indexOf('baseRect') >= 0,
          );
          // console.log('xxxxxc', name, item, value, rectShape)
          if (name === 'click') {
            const num = model.fusion;
            // 改变选中的shape的样式
            if (value) {
              rectShape.attr({
                fill: getColor(num).lighter,
                stroke: getColor(num).darker,
                lineDash: [2, 2],
                lineWidth: 5,
              });
            } else {
              // 恢复未选中的初始状态
              rectShape.attr({
                fill: getColor(num).lighter,
                stroke: getColor(num).darker,
                lineWidth: 0,
              });
            }
          }
        },
        draw: (cfg, group) => {
          const size = [174, 46];
          const keyShape = group.addShape('rect', {
            draggable: true,
            name: 'base',
          });
          group.addShape('rect', {
            attrs: {
              width: size[0],
              height: size[1],
              x: -size[0] / 2,
              y: -size[1] / 2,
              fill: getColor(cfg.fusion).lighter,
              radius: cfg.nodeType === 1 ? 0 : size[1] / 2,
            },
            draggable: true,
            name: `baseRect@${cfg.name}@${cfg.id}`,
          });
          group.addShape('text', {
            attrs: {
              text: `${cfg.name}`,
              fill: getColor(cfg.fusion).color,
              fontSize: 16,
              x: -getWidth(cfg.name, 16) / 2,
              y: 0,
            },
            draggable: true,
            name: `baseName@${cfg.name}@${cfg.id}`,
          });
          group.addShape('text', {
            attrs: {
              text: cfg?.fusion !== 0 ? `(${cfg.fusion})` : `(0)`,
              fill: getColor(cfg.fusion).color,
              fontSize: 16,
              x: -getWidth(cfg.fusion ? `(${cfg.fusion})` : `(0)`, 16) / 2,
              y: 20,
            },
            draggable: true,
            name: `info@${cfg.name}@${cfg.id}`,
          });
          return keyShape;
        },
        update: undefined,
      },
      'rect',
    );

    G6.registerNode(
      'thirdNode',
      {
        setState(name, value, item) {
          const group = item.get('group');
          const model = item.getModel();
          // 点击的shape的名字
          const allRectShape = group.findAll(
            (e) => e.get('name').indexOf('baseRect') >= 0,
          );
          if (name === 'click') {
            allRectShape.forEach((v, index) => {
              // 决定颜色的数字
              const num = model[index].fusion;
              // 改变选中的shape的样式
              if (
                v.get('name').split('@')[2] ===
                `${clickNode.current?.split('@')[2]}`
              ) {
                v.attr({
                  fill: getColor(num).lighter,
                  stroke: getColor(num).darker,
                  lineDash: [2, 2],
                  lineWidth: 4,
                });
              } else {
                // 其他的shape恢复未选中的初始状态
                v.attr({
                  fill: getColor(num).lighter,
                  stroke: getColor(num).darker,
                  lineWidth: 0,
                });
              }
            });
          }
        },
        draw: (cfg, group) => {
          const size = [164, 46];
          const keyShape = group.addShape('rect', {
            draggable: true,
            name: 'node-keyshape',
          });
          console.log(cfg, 'cfg');
          for (let i = 0; i < cfg.length; i++) {
            group.addShape('rect', {
              attrs: {
                width: size[0],
                height: size[1],
                x: -size[0] / 2,
                y: -i * (size[1] + 5) - size[1] / 2,
                fill: getColor(cfg[i].fusion).lighter,
                radius: cfg[i].nodeType === 1 ? 0 : size[1] / 2,
              },
              draggable: true,
              name: `baseRect@${cfg[i].name}@${cfg[i].id}`,
            });
            group.addShape('text', {
              attrs: {
                text: `${cfg[i].name}`,
                fill: getColor(cfg[i].fusion).color,
                fontSize: 16,
                // x: - size[0] / 2 + 10,
                x: -getWidth(cfg[i].name, 16) / 2,
                y: -i * (size[1] + 5),
              },
              draggable: true,
              name: `baseName@${cfg[i].name}@${cfg[i].id}`,
            });
            group.addShape('text', {
              attrs: {
                text: cfg[i]?.fusion !== 0 ? `(${cfg[i].fusion})` : `(0)`,
                fill: getColor(cfg[i].fusion).color,
                fontSize: 16,
                // x: - size[0] / 2 + 10,
                x:
                  -getWidth(
                    cfg[i]?.fusion === 0 ? `(0)` : `(${cfg[i].fusion})`,
                    16,
                  ) / 2,
                y: -i * (size[1] + 5) + 20,
              },
              draggable: true,
              name: `info@${cfg[i].name}@${cfg[i].id}`,
            });
          }
          return keyShape;
        },
        update: undefined,
      },
      'rect',
    );

    G6.registerEdge('flow-line', {
      draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const { style } = cfg;
        const shape = group.addShape('path', {
          attrs: {
            stroke: style.stroke,
            endArrow: {
              path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
              fill: '#91d5ff',
              d: -20,
            },
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
              ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
              ['L', endPoint.x, endPoint.y],
            ],
          },
        });

        return shape;
      },
    });

    G6.Util.traverseTree(chartData, (subtree) => {
      switch (subtree.level) {
        case 1:
          subtree.type = 'root';
          break;
        case 2:
          subtree.type = 'node';
          break;
        default:
          subtree.type = 'thirdNode';
          break;
      }
    });
    return new G6.TreeGraph({
      container: containerRef.current,
      width: containerRef.current.scrollWidth,
      height: containerRef.current.scrollHeight,
      layout: {
        type: 'compactBox',
        direction: 'BT',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 40;
        },
        getHGap: function getHGap() {
          return 90;
        },
      },
      defaultNode: {
        type: 'node',
      },
      defaultEdge: {
        type: 'flow-line',
        style: defaultEdgeStyle,
      },
      modes: {
        default: ['zoom-canvas', 'drag-canvas'],
      },
    });
  };
  useEffect(() => {
    if (!containerRef.current || !chartData) {
      return;
    }
    if (graphRef.current) {
      // chartData变化时，销毁原视图
      graphRef.current.destroy();
    }
    graphRef.current = initGraph(chartData);
    graphRef.current.data(chartData);
    graphRef.current.render();
    graphRef.current.fitCenter();
    // 交互事件
    // 默认选中第一个节点，效果===单击
    graphRef.current.setItemState(chartData.id, 'click', true);
    graphRef.current.on('node:click', (evt) => {
      const { item, target } = evt;
      const targrtName = target?.get('name');
      console.log(targrtName);
      clickNode.current = targrtName;
      const clickNodes = graphRef.current.findAllByState('node', 'click');
      clickNodes.forEach((cn) => {
        graphRef.current.setItemState(cn, 'click', false);
      });
      graphRef.current.setItemState(item, 'click', true);
    });
  }, [containerRef.current, chartData, clickNode.current]);

  return <div ref={containerRef} className={styles.content}></div>;
};

export { TreeUp };
