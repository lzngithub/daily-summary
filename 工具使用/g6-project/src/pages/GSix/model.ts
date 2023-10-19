import { useEffect, useState } from 'react';
import { filterDataMethod } from './utils';
import { originData } from './data';
import { GraphData } from '@antv/g6';

export default () => {
  const [data, setData] = useState<GraphData | undefined>(undefined);

  useEffect(() => {
    setData(filterDataMethod(originData));
  }, [originData]);

  return { data, setData };
};
