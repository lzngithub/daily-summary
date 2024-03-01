# vite 入门

vite 新的前端构建工具，对比其他打包工具会快很多，同时，是伴随着 vue3 发展起来的，所以和 vue3 配套使用非常的适合，同时现在也是适配 react 和 angular 项目了。

## vite 历史

- 2015 年，esmodule 出现;
- 2017 年，浏览器支持原生 esmodule;
- 2019 年，尤雨溪创建@vue/dev-server
- 2020 年，vite0.1
- 2021.2.16，vite@2.0.0
- 2022.7.13，vite@3.0.0
- 2022.12，vite@4.0.0
- 2023.11.16，vite@5.0.0

以上为 vite 发展的粗略的历史。

## vite 的一些特点

- 开箱即用，
- 开发环境，使用依赖解析和预构建，将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。
- Vite 天然支持引入 .ts 文件，Vite 使用 esbuild 将 TypeScript 转译到 JavaScript，约是 tsc 速度的 20~30 倍。
- vite 生产环境打包是交给 rollup 打包器进行处理。

## 简单使用 vite

项目安装 vite

```shell
npm i vite -D
```

vite 起开发服务器命令

```shell
npx vite
```

## 配置文件

当以命令行方式运行 vite 时，Vite 会自动解析 项目根目录 下名为 vite.config.js 的文件。

```js
// vite.config.js
export default {
  // 配置选项
};
```

## 总结

先简单学习一下 vite 用法，后续继续补充。
