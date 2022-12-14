// eslint-disable-next-line import/no-import-module-exports
import './index.less';

// eslint-disable-next-line import/no-import-module-exports
import './pageA';
// eslint-disable-next-line import/no-import-module-exports
import './pageB';

console.log('this is index');

if (module.hot) {
  module.hot.accept('./pageA.js', () => {
    console.log('pageA is change');
  });
}
