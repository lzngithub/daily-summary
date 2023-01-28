import lodash from 'lodash';
import { originDataType } from './type';
import { EdgeConfig, GraphData, NodeConfig } from '@antv/g6';

// 处理源数据为图表需要的数据
const filterDataMethod = (origin: originDataType): GraphData => {
  const copyOrign = lodash.cloneDeep(origin);
  const target: GraphData = {};
  // 处理节点
  if (copyOrign.nodes) {
    const nodes: NodeConfig[] = [];
    copyOrign.nodes.forEach((item) => {
      let node: NodeConfig = {
        id: item.id.toString(),
        name: item.name,
        types: item.type,
      };
      nodes.push(node);
    });
    target.nodes = nodes;
  }
  // 处理边
  if (copyOrign.edges) {
    const edges: EdgeConfig[] = [];
    copyOrign.edges.forEach((item) => {
      let edge: EdgeConfig = {
        id: item.id,
        label: item.type,
        source: item.source.toString(),
        target: item.target.toString(),
      };
      edges.push(edge);
    });
    target.edges = edges;
  }

  return target;
};

export { filterDataMethod };
