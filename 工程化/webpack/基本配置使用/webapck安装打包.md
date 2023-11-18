# webpack 基础（webpack5）

前端打包工具主要有 webpack、rollup 和 parcel，webpack 打包工具适合工程，rollup 适合各种库的打包，parcel 可以 0 配置进行打包。

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

- webpack 默认打包入口文件时'/src/index.js'

新建文件/src/index.js

```js
console.log("this is index");
```

运行打包命令

```bash
npx webpack
```

运行后根目录下新增 dist/mian.js 则证明成功打包了

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

- **dirname：获得当前执行文件所在目录的完整目录名，同理还有**filename
- path.resolve([...path])：将相对路径转为绝对路径, 执行顺序从左到右，构建成决定路径后将不再执行
- clean: true 每次打包删除上次打包文件

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
- 模块：处理非 js 资源
- 插件：额外的功能，比部压缩，分包等
- 模式：两个模式，开发模式和生生产模式

对应的配置文件中的那些选项

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js", //入口
  output: {
    // 输出
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {}, // 模块
  plugins: [], // 插件
  mode: "development", // 模式
};
```
