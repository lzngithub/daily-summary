// 接口数据类型
type originDataType = {
  nodes?: {
    properties: object;
    type: string;
    id: number;
    name: string;
  }[];
  edges?: {
    properties: object;
    type: string;
    id: string;
    source: number;
    target: number;
  }[];
};

export { originDataType };
