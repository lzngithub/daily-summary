# webpack-dev-server

提供对开发者友好的开发服务器，可以更加专注于编码，提供了自动打包编译、自动刷新浏览器、跨域代理、热更新等功能。

安装，然后通过以下命令在根目录下开启一个一个开发服务器

```js
yarn webpack-dev-server --open
```

会自动使用 webpack 打包，存放在内存中，开启浏览器，监听文件变动自动打包。

## 基本配置

安装

```shell
yarn add webpack-dev-server --dev
```

配置

```js
{
  devServer: {
  }
}
```

## 静态资源访问

因为开发阶段要频繁打包，因此一些静态资源就不适合用插件频繁 copy 到打包目录，影响效率，因此开发环境下，可以通过在开发服务器下配置静态资源路径去替换这个插件的操作。

```js
{
  devServer: {
    contentBase: "./public"; // 静态资源路径，也可以是数组表示多个。
  }
  plugins: [
    // new CopyWebpackPlugin(['public']); // 注释掉，或者在生产环境再配置。
  ];
}
```

## 配置代理

跨域配置代理

```js
{
  devServer: {
    contentBase: "./public", // 静态资源路径，也可以是数组表示多个。
    proxy: {
      '/api': {
        // http://localhost:8080/api/user -> http://***.com/api/user
        target: 'http://***.com',
        // http://localhost:8080/api/user -> http://***.com/user
        pathRewrite: {
          '^/api':'',
        },
        // 开启跨域请求代理
        changeOrigin:true
      }
    }
  }
}
```

## HMR

HMR,Hot Module Replace,模块热替换，只将修改的模块替换到应用中，而不用整个应用全部刷新，主要解决整体刷新导致页面状态丢失的问题，提高了开发效率。热更新集成在了 webpack-dev-server 中。

### 基本使用

可通过以下命令开启：

```shell
webpack-dev-server --hot
```

或者通过配置开启（推荐）

```js
const webpack = require('webpack')
{
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

HMR 不是开箱即用的，需要手动处理模块热替换逻辑

- 样式文件可以直接开箱即用，以内 style-loader 已经做了热模块替换逻辑。
- js 文件不能开箱即用，因为 js 文件导出的类型可以是函数，可能是字符串，没有一个统一的格式，所以 webpack 没有进行封装统一处理，需要开发者手动处理热模块替换逻辑。
- 一般的框架都提供了热更新的逻辑，因此可以有的时候你会发现你做的项目已经实现了热更新的逻辑了。

### 自定义热更新逻辑

通过 hot 提供的 api 再文件里面去写热更新逻辑

```js
module.hot.accept("./index.js", () => {
  // 这里手动写热更新的逻辑。
});
```

## 其他配置

```js
{
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    compress: true,
    port: 9000,
    open: true,
},
}
```
