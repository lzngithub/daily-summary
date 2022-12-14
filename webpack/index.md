# webpack

基本概念

## 安装 weback

运行下面脚本

```bash
mkdir webpack-template
cd webpack-template
npm init -y
npm i webpack webpack-cli -D
```

- -y 是 yes 的意思，省了敲回车的步骤
- webpack-cli 不是打包必须的，它可以处理 webpack 的命令参数，让我们更方便

## 打包

webpack 默认打包入口文件时'/src/index.js'，因为，新建

- /src/index.js

```js
import add from "./add";
console.log(add(1, 2));
```

- /src/add.js

```js
export default function add(a, b) {
  return a + b;
}
```

运行下面命令

```bash
npx webpack
```

## 通过配置文件打包

项目根目录新建 webpack.config.js

```js
const { path } = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

运行命令：

```bash
npx webpack --config webpack.config.js
```

## 修改运行命令

- 修改 package.json 文件的 scripts 字段

```json
"scripts": {
    "start": "npm run dev",
    "dev": "webpack --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

- 运行命令变为

```bash
npm start
```

## webpack 基础

五大概念：

- 入口
- 输出
- 模块
- 插件
- 模式

对应的配置文件中的那些选项

```js
const path = require("path");

module.exports = {
  /**
   * 入口
   */
  entry: "./src/index.js",
  /**
   * 输出
   */
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  /**
   * 模块
   */
  module: {},
  /**
   * 插件
   *
   */
  plugins: [],
  /**
   * 模式
   *
   */
  mode: "development",
};
```

## 打包 html 资源

需要用到插件 html-webpack-plugin，在打包文件夹下面生成一个 html 文件

安装

```bash
npm install --save-dev html-webpack-plugin
```

配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [new HtmlWebpackPlugin({
  template: './public/index.html' // 以该文件为模板创建html文件
})],
```

增加 html 模板文件，方便后面通过 img 标签引入图片

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div></div>
    <img src="./1.webp" alt="" width="300" height="200" />
  </body>
</html>
```

## 处理 css 资源

使用 css-loader, style-loader

安装

```bash
npm i style-loader css-loader -D
```

配置

```js
module: {
    rules: [
      {
        test: /\.css$/i, // 匹配文件的正则
        use: ["style-loader", "css-loader"], // 用到的loader
      },
    ],
},
```

## 处理 less

```bash
npm i less-loader -D
```

配置

```js
module: {
    rules: [
      {
        test: /\.less$/i, // 匹配文件的正则
        use: ["style-loader", "css-loader", "less-loader"], // 用到的loader
      },
    ],
},
```

- sass 等同理

## 处理图片资源

css 中图片的引入 webpack5 会自动处理，因为只需要考虑 img 标签引入的就可以了

html-loader：为 html 引入图片所需要

```bash
npm i html-loader -D
```

配置

```js
module: {
    rules: [
      {
        test: /\.html$/i, // 匹配文件的正则
        use: ["html-loader"], // 用到的loader
      },
    ],
},
```

## 处理其他资源

配置

```js
{
  test: /\.(avi|mp3|ttf|woff2?)$/,
  type: "asset/resource",
  generator: {
    filename: "resources/[hash:10][ext][query]",
  },
},
```

## 将 css 单独提取出来

插件 mini-css-extract-plugin

安装

```bash
npm i -D mini-css-extract-plugin
```

配置

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins: [new MiniCssExtractPlugin()]

rules: [
  {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
  {
    test: /\.less$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
  },
],

```

## css 兼容性处理

postcss-loader: 做 css 兼容处理
postcss-present-env: 帮助 postcss-loader 找到 package.json 中 browserslist 中的浏览器兼容性配置

```bash
npm i -D postcss-loader postcss-present-env
```

在 package.json 中增加配置

```json
"browserslist": {
  "development": [
    "last 1 chrome version",  // 兼容最近的一个chrome版本
    "last 1 firefox version",
    "last 1 safari version"
  ],
  "production":[
      ">0.2%", // 兼容99.8%的浏览器，条件取并集
      "not dead", // 不要已经丢弃的浏览器
      "not op_mini all" //不要所有的欧朋浏览器
  ]
}
```

在根目录新建 postcss.config.js 配置文件

```js
//编辑postcss-loader插件配置的文件
module.exports = {
  plugins: [require("postcss-preset-env")],
};
```

在 webpack.config.js 中配置

```js
process.env.NODE_ENV = 'development'; // 定义nodejs环境变量：决定使用browserslist的哪个环境
rules: [
  {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'],
  },
  {
    test: /\.less$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"],
  },
],
```

## 压缩 css

webpack5 用 css-minimizer-webpack-plugin，5 之前用 optimize-css-assets-webpack-plugin

安装

```bash
npm i -D css-minimizer-webpack-plugin
```

配置

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
```

## webpack 热更新

借助 webpack-dev-server 插件

安装

```bash
npm i webpack-dev-server -D
```

配置

```js
devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
},
```

启动命令改为

```bash
npx webpack server
```

## 代码检查

eslint-webpack-plugin: 查找和修复代码中的问题，依赖于 eslint
eslint-config-airbnb-base: 成熟的代码风格，依赖于 eslint-plugin-import

安装

```bash
npm i -D eslint eslint-webpack-plugin eslint-config-airbnb-base eslint-plugin-import
```

配置

```js
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  plugins: [
    new ESLintPlugin({
      fix: true,
    }),
  ],
};
```

package.json

```json
"eslintConfig": {
  "extends": "airbnb-base"
}
```

## js 处理

使用 babel

- babel-loader：加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
- @babel/core: babel 核心包
- @babel/preset-env：基础的 ES 语法分析包，各种转译规则的统一设定，目的是告诉 loader 要以什么规则来转化成对应的 js 版本

安装

```bash
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

配置

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
    },
  ];
}
```

## webpack 性能优化

1. 开发环境

- 优化打包速度
- 热模块替换-HMR(hot module replacement)
- 优化代码调试
- source-map

### HMR

webapck.config.js

```js
devServer: {
  static: {
    directory: path.join(__dirname, 'dist'),
  },
  compress: true,
  port: 9000,
  open: true,
  hot: true,
},
```

```js
import { addNumber, prit } from "./add";
import "./index.less";

if (module.hot) {
  module.hot.accept("./add.js", () => {
    prit("inner");
  });
}
prit("out");
console.log(addNumber(1, 2));
```

### source-map（错误定位）

通过配置项 devtool 开启

```js
devtool: 'nosources-source-map',
```

对应的值参考 webapck 官网：https://webpack.docschina.org/configuration/devtool/

总结：

- 开发环境用：eval-source-map:会生成正确文件索引，初始构建会慢，会在重新构建时提供比较快的速度
- 生产环境用：nosources-source-map: 会有目录结构的映射，但不包含源码，方便定位问题，但不会暴露源码内容

### oneOf

对于打包的每一个文件，都会把全部 rules 规则都匹配一次，对符合规则的则用对应的 loader 进行处理，这样会比较慢，采用 oneOf 则会在命中第一个规则之后则不会再进行匹配。

例子：

```js
rules: [{
  // css文件第一个匹配成功后后面则不会再匹配
  oneOf: [
    {
      test: /\.css$/i,
      use: commonCssLoader,
    },
    {
      test: /\.less$/i,
      use: [...commonCssLoader, 'less-loader'],
    },
  ]
}],
```

### webapck 缓存

- hash: 每次 wepack 构建时会生成一个唯一的 hash 值。问题: 因为 js 和 css 同时使用一个 hash 值。如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
- chunkhash：根据 chunk 生成的 hash 值。如果打包来源于同一个 chunk，那么 hash 值就一样。问题: js 和 css 的 hash 值还是一样的因为 css 是在 js 中被引入的，所以同属于一个 chunk
- contenthash: 根据文件的内容生成 hash 值。不同文件 hash 值一定不一样

### 分包

将多次引用和一些静态资源包进行分包处理

通过 splitChunks 字段开启

```js
optimization: {
    splitChunks: {
      chunks: 'async', // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
      minSize: 30000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxInitialRequests: 4, // 入口文件做代码分割最多分成 4 个 js 文件
      cacheGroups: {
        // 缓存组配置，默认有vendors和default
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 匹配需拆分chunk的目录
          priority: -10, // 拆分优先级
          name: 'venders',
        },
        lodashVenodr: {
          // 将体积较大的lodash单独提取包，指定页面需要的时候再异步加载
          test: /lodash/,
          priority: -10,
          name: 'lodashVenodr',
          chunks: 'all',
        },
        default: {
          minChunks: 2, // 覆盖外层minChunks,用于提取被引用指定次数的公共模块，这里默认2次
          priority: -20,
          name: 'common',
          reuseExistingChunk: true, // 是否重用已存在的chunk
        },
      },
    },
  },
```
