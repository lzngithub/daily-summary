# webpack基础（webpack5）

前端打包工具主要有webpack、rollup和parcel，webpack打包工具适合工程，rollup适合各种库的打包，parcel可以0配置进行打包。

## 安装 weback

```bash
mkdir webpack-template
cd webpack-template
# 初始化npm包，-y 是 yes 的意思，省了敲回车的步骤
npm init -y
# - webpack-cli 不是打包必须的，但它可以处理 webpack 的命令参数，让我们用起webpack更方便
npm i webpack webpack-cli -D
```

## 打包
* webpack 默认打包入口文件时'/src/index.js'

新建文件/src/index.js

```js
console.log('this is index');
```

运行打包命令

```bash
npx webpack
```
运行后根目录下新增dist/mian.js则证明成功打包了

## 配置文件

通过配置文件去进行项目打包，项目根目录新建 webpack.config.js

```js
const path = require("path");

module.exports = {
  // 入口文件
  entry: "./src/index.js",
  // 输出的配置
  output: {
    filename: "main.js", // 输出文件名称
    path: path.resolve(__dirname, "dist"), // 绝对路径
    clean: true,
  },
};
```
* __dirname：获得当前执行文件所在目录的完整目录名，同理还有__filename
* path.resolve([...path])：将相对路径转为绝对路径, 执行顺序从左到右，构建成决定路径后将不再执行
* clean: true 每次打包删除上次打包文件

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

## webpack 基础概念

五大基础概念：

- 入口: 打包入口文件，可以有多个
- 输出：输出包的配置，包括输出路径，输出文件名等
- 模块：处理非js资源
- 插件：额外的功能，比部压缩，分包等
- 模式：两个模式，开发模式和生生产模式

对应的配置文件中的那些选项

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js", //入口
  output: { // 输出
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {}, // 模块
  plugins: [], // 插件
  mode: "development", // 模式
};
```

## 打包 html 资源

需要用到插件 html-webpack-plugin，在打包文件夹下面生成一个 html 文件

安装

```bash
npm install -S html-webpack-plugin
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
    <title>Webpack</title>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

## 处理 css 资源

使用 css-loader, style-loader

安装
```bash
npm i style-loader css-loader -D
```

增加./src/index.css
```css
html body {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
```

在./src/index.js中引入
```js
import './index.css'
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

* test: 文件匹配规则，可用正则
* use：对匹配上的文件采用什么loader进行处理，顺序从右到左
* css-loader：处理css资源
* style-loader：将css-loader处理好的资源通过js脚本创建style标签插入到html中

## 处理 less

```bash
npm i less-loader -D
```

增加./src/index.less文件
```less
html body {
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
}
```

在./src/index.js中引入
```js
import './index.less'
```

配置
```js
module: {
    rules: [
      {
        test: /\.css$/i, // 匹配文件的正则
        use: ["style-loader", "css-loader"], // 用到的loader
      },
      {
        test: /\.less$/i, // 匹配文件的正则
        use: ["style-loader", "css-loader", "less-loader"], // 用到的loader
      },
    ],
},
```

* less-loader：处理less资源成css资源
- 处理sass 等同理，引入对饮loader进行配置

## 处理图片资源

css中的url()会通过css-loader处理，<img>标签的资源需要引入html-loader进行处理

安装
```bash
npm i html-loader -D
```

增加图片资源和在html中通过img标签引入

```html
<img src="./1.webp" width="300px" height="200px">
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

* html-loader：处理html文件的资源，包括img等

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


