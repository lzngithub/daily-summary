import styles from './index.less';
import { Tabs } from 'antd';
import ReactQuill from '@/components/ReactQuill';
import Slate from '@/components/Slate';

export default function IndexPage() {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: `react-quill`,
            key: '1',
            children: <ReactQuill></ReactQuill>,
          },
          {
            label: `slate`,
            key: '2',
            children: <Slate></Slate>,
          },
          {
            label: `Tab 3`,
            key: '3',
            children: `Content of Tab Pane 3`,
          },
        ]}
      />
    </div>
  );
}
