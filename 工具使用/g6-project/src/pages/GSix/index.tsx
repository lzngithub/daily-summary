import { useModel } from '@umijs/max';
import styles from './index.less';

import { Charts } from './component';

const GSix: React.FC = () => {
  const { data } = useModel('GSix.model');
  return (
    <div className={styles.content}>
      <Charts data={data}></Charts>
    </div>
  );
};

export default GSix;
