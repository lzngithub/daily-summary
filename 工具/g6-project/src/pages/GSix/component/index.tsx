/***
 * 节点的配置项简称为cfg
 *
 *  */

import G6, { GraphData, IG6GraphEvent, INode, IShape, Item } from '@antv/g6';
import { useEffect, useMemo } from 'react';
import { cloneDeep } from 'lodash';

import chanpinIcon from '@/assets/g6/chanpin.png';
// import qiyeIcon from '@/assets/g6/qiye.png';

// const iconList: {
//   [key: string]: string;
// } = {
//   企业: qiyeIcon,
//   产品: chanpinIcon,
//   其他: qiyeIcon,
// };

const colorList: {
  [key: string]: string;
} = {
  企业: '#4A7AF7',
  产品: '#28CCB6',
  其他: '#4A7AF7',
};

interface Iprops {
  data: GraphData | undefined;
}


function refreshDragedNodePosition(e: IG6GraphEvent) {
  // 固定拖拽的节点
  if (e.item) {
    const model = e.item.get('model');
    model.fx = e.x; // 固定坐标
    model.fy = e.y; // 固定坐标
    model.x = e.x; // 位置信息
    model.y = e.y; // 位置信息
  }
}

const Charts: React.FunctionComponent<Iprops> = (props) => {
  const { data } = props;
  const originData = useMemo(() => cloneDeep(data), [data]);
  const init = useMemo(() => {
    return () => {
      const container = document.getElementById('container');
      const width = container?.offsetWidth;
      const height = container?.offsetHeight;
      if (container) {
        G6.registerNode('card-node', {
          draw(cfg, group) {
            // 如果 cfg 中定义了 style 需要同这里的属性进行融合
            group?.addShape('circle', {
              attrs: {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                x: 0,
                y: 0,
                r: 20,
                fill: colorList[cfg?.types as string],
                cursor: 'pointer',
              },
              name: 'fill-circle',
              // 设置 draggable 以允许响应鼠标的图拽事件
              draggable: true,
            });
            group?.addShape('image', {
              attrs: {
                x: -10,
                y: -10,
                width: 20,
                height: 20,
                img: chanpinIcon,
                cursor: 'pointer',
              },
              name: 'image-shape',
            });
            group?.addShape('text', {
              attrs: {
                x: 0,
                y: 40,
                textAlign: 'center',
                text: cfg?.name,
                fill: '#262626',
              },
              name: 'image-shape',
            });
            const keyShape = group?.addShape('circle', {
              attrs: {
                x: 0,
                y: 0,
                r: 23,
                fill: 'transparent',
                cursor: 'pointer',
                stroke: 'transparent',
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: 'stroke-circle',
            });
            group?.sort();
            return keyShape as IShape;
          },
          update: undefined,
          setState(name, value, item) {
            // 获取元素的group 等价于item.get('group')
            const group = item?.getContainer();
            const shape = group?.find((e) => e.get('name') === 'stroke-circle');
            // const shape = group?.get('children')[0]; // 顺序根据 draw 时确定
            if (name === 'hover') {
              let stroke = value ? '#a0b8f7' : 'transparent';
              shape?.attr('stroke', stroke);
            }
          },
        });
        G6.registerEdge(
          'run-edge',
          {
            afterDraw: (cfg, group) => {
              if (cfg !== undefined && group !== undefined) {
                // 获取图形组中的第一个图形，在这里就是边的路径图形
                const shape = group.get('children')[0];
                // 获取路径图形的中点坐标
                const midPoint = shape.getPoint(0.5);
                const width =
                  cfg !== undefined && cfg.label
                    ? (cfg.label as string).length * 20
                    : 30;
                const keyShape = group?.addShape('rect', {
                  attrs: {
                    width: width,
                    height: 16,
                    fill: '#ffffff',
                    x: midPoint.x - width / 2,
                    y: midPoint.y - 8,
                    radius: 8,
                    stroke: '#A0B8F7',
                  },
                });

                group?.addShape('text', {
                  attrs: {
                    x: midPoint.x,
                    y: midPoint.y + 7,
                    textAlign: 'center',
                    text: cfg.label,
                    fill: '#262626',
                  },
                  name: 'image-shape',
                });
                return keyShape;
              }
            },
            update: undefined,
            setState: (name, value, item) => {
              // 获取元素的group 等价于item.get('group')
              const shape = item?.get('keyShape');
              // const shape = group?.get('children')[0]; // 顺序根据 draw 时确定
              if (name === 'hover') {
                if (value) {
                  let index = 0;
                  shape.animate(
                    () => {
                      index++;
                      if (index > 9) {
                        index = 0;
                      }
                      const res = {
                        lineDash: [4, 2, 1, 2],
                        lineDashOffset: -index,
                      };
                      return res;
                    },
                    {
                      repeat: true,
                      duration: 3000,
                    },
                  );
                } else {
                  shape.stopAnimate();
                  shape.attr('lineDash', null);
                }
              }
            },
          },
          'line',
        );
        const graph = new G6.Graph({
          container: 'container',
          width,
          height,
          fitView: true,
          fitViewPadding: 50,
          animate: true,
          modes: {
            // 支持的 behavior
            default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
          },
          defaultNode: {
            type: 'card-node',
          },
          defaultEdge: {
            type: 'run-edge',
            style: {
              stroke: '#A0B8F7',
              endArrow: {
                path: G6.Arrow.triangle(),
                fill: '#A0B8F7',
              },
            },
          },
          layout: {
            linkDistance: 400,
            type: 'gForce',
            gravity: 1, // 中心力的大小，越大布局越紧凑
            nodeStrength: 4000, // 节点作用力
            edgeStrength: 200, // 边引力大小
            preventOverlap: true, // 阻止重叠
            nodeSize: 10, //节点大小
            maxIteration: 500, // 最大迭代次数
            workerEnabled: true,
            gpuEnabled: true,
          },
        });
        // 注册事件
        graph.on('node:drag', (e) => {
          refreshDragedNodePosition(e);
          graph.layout()
        });
        graph.on('node:dragend', (e) => {
          // 拖拽结束之后重新布局一次
          if (e.item) {
            const model = e.item.get('model');
            model.x = null; // 位置信息
            model.y = null; // 位置信息
          }
        });
        graph.on('node:mouseenter', function (ev) {
          const node: Item = ev.item as INode;
          graph.setItemState(node, 'hover', true);
          const edges = node.getEdges();
          edges.forEach((edge) => graph.setItemState(edge, 'hover', true));
        });
        graph.on('node:mouseleave', function (ev) {
          const node: Item = ev.item as INode;
          graph.setItemState(node, 'hover', false);
          const edges = node.getEdges();
          edges.forEach((edge) => graph.setItemState(edge, 'hover', false));
        });
        graph.data(data);
        graph.render();
      }
    };
  }, [data]);
  useEffect(() => {
    init();
  }, [originData]);

  return <div id="container" style={{ width: '100%', height: '100%' }}></div>;
};

export { Charts };
