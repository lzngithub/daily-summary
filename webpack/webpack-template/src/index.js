import './index.less';

import './pageA';
import './pageB';

console.log('this is index');

if (module.hot) {
  module.hot.accept('./pageA.js', () => {
    console.log('pageA is change');
  });
}
