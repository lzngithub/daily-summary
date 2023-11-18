# mode

webpack

webpack 中有三种不同的模式，通过 mode 字段去定义模式，webpack 的打包模式更好的服务于不同环境的需求。

## 模式类型

- production: 默认值，生成模式，会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。会自动开启打包优化功能。
- development: 开发模式，会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。
- none: 不使用任何默认优化选项.

## 配置

```js
{
  mode: 'none',
}
```

## 为项目配置不同的模式

有两种方式：

- 配置文件根据环境不同导出不同的配置
- 一个环境对应一个配置文件

### 根据环境导出不同配置

```js
var config = {
  entry: "./app.js",
  //...
};

module.exports = (env, argv) => {
  if (env === "development") {
    config.devtool = "source-map";
    config.mode = "development";
  }

  if (env === "production") {
    config.mode = "production";
    //...
  }

  return config;
};
```

运行命令的时候就要传递变量了

```shell
yarn webpack --env production
```

### 不同的配置文件

不同模式对应不同的配置文件，通过命令去区分运行不同的配置文件

```shell
yarn webpack --config webpack.config.prod.js
```

推荐使用这种方式去区分不同的打包模式，更加清晰明了。

在进行选项融合的时候，配置重新会直接覆盖，而不是融合，这个时候可以使用一个工具 webpack-merge 去进行融合

```js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
});
```

## 为代母注入全局成员

通过 webpack 内置的插件 DefinePlugin，该插件会自动导入，同时在 production 模式下会默认注入 process.env.NODE_ENV 常量

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_URL': '"http: //****.com"'
    });
  ]
}
```
