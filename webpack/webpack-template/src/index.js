/* eslint-disable import/no-import-module-exports */
import { addNumber, prit } from './add';
import './index.less';

if (module.hot) {
  module.hot.accept('./add.js', () => {
    prit('inner');
  });
}
prit('out');
console.log(addNumber(1, 2));
