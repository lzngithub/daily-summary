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

## css兼容性处理

postcss-loader: 做css兼容处理
postcss-present-env: 帮助postcss-loader找到package.json中browserslist中的浏览器兼容性配置

```bash
npm i -D postcss-loader postcss-present-env
```

在package.json中增加配置

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

在根目录新建postcss.config.js配置文件

```js
//编辑postcss-loader插件配置的文件
module.exports = {
  plugins: [
      require('postcss-preset-env')
  ]
}
```

在webpack.config.js中配置
```js
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

## 压缩css

webpack5用css-minimizer-webpack-plugin，5之前用optimize-css-assets-webpack-plugin

安装
```bash
npm i -D css-minimizer-webpack-plugin
```

配置
```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};
```



## webpack热更新

借助webpack-dev-server插件

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

eslint-webpack-plugin: 查找和修复代码中的问题，依赖于eslint
eslint-config-airbnb-base: 成熟的代码风格，依赖于eslint-plugin-import

安装

```bash
npm i -D eslint eslint-webpack-plugin eslint-config-airbnb-base eslint-plugin-import
```

配置

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [new ESLintPlugin({
    fix: true
  })],
};
```

package.json

```json
"eslintConfig": {
  "extends": "airbnb-base"
}
```

## js 处理

使用babel

* babel-loader：加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
* @babel/core: babel核心包
* @babel/preset-env：基础的ES语法分析包，各种转译规则的统一设定，目的是告诉loader要以什么规则来转化成对应的js版本

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
      loader: 'babel-loader'
    }
  ]
}
```

## webpack 性能优化

1. 开发环境

* 优化打包速度
* 热模块替换-HMR(hot module replacement)
* 优化代码调试
* source-map

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
import { addNumber, prit } from './add';
import './index.less';

if (module.hot) {
  module.hot.accept('./add.js', () => {
    prit('inner');
  });
}
prit('out');
console.log(addNumber(1, 2));
```

### source-map

通过