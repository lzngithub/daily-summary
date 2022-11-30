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
```s

## devServer

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
