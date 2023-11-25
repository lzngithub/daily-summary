# ES Module

主要学习 es module 的一些使用。

## 在 html 中使用 esm

在 html 文件中的 script 标签可以通过设置 type=module 去设置模块化

- 默认使用严格模式
- 独立作用域
- esm 是通过 cors 模式请求 js 文件，所以服务端要支持 cors
- esm 引入模块是延迟执行的，相当于 defer

## 导出导入

导出通过 export 关键字， 导入通过 import from

```js
// module.js
let name = "liang";
function fn() {}

export { name, fn };

// app.js
import { name, fn } from "./module.js";
```

通过 as 关键字重命名

```js
// module.js
let name = "liang";
function fn() {}

export { name, fn as newFn };

// app.js
import { name, newFn as fn } from "./module.js";
```

默认导入导出， 关键字 default

```js
let name = "liang";
function fn() {}

export { name, fn as default };
// 或者可以通过下面这种方法简写
export default fn;

// app.js
import { name, default as fn } from "./module.js";
// 或者可以通过下面这种方法简写
import fn, {name} from "./module.js";
```

导入和导出可以合并在一起写，方便统一管理一些模块

```js
// index.js
export { fn, name } from "./module.js";
```

## 导入导出需要注意的点

- import from 是静态导入，所以只能放在文件最开始的行;
- 如果需要动态导入，需要用 import 方法，使用方法如下：
  ```js
  import("./module.js").then((data) => {
    console.log(data);
  });
  ```
- 导出的值的地址的引用，只读，为了要保护内部变量
- 导出路径不能省略文件名，不能省略 index.js 这种，不能省略前面的斜线。

## 补充知识

通过 npm 安装的包，可以铜鼓 unpkg 这个网站去引用对应的 cdn 的包，在地址栏上输入 unpkg.com/\*\*\* 就能拿到完整地址，例如：

```text
https://unpkg.com/lodash@4.17.21/lodash.js
```

还有挺多浏览器不支持 es module 的，可以通过 script 标签甚至 nomodule 来判断当不支持 es module 时运行的代码。

可以这样去引用一些 polyfill 去支持 es module

```html
<script
  nomodule
  src="https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"
></script>
<script
  nomodule
  src="https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"
></script>
```
