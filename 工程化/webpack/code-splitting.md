# code-splitting

都放在一个文件体积过大，运行效率低，响应效率慢，首次加载慢，解决办法，代码分割（code-splitting），也叫分包。

## 实现方式

两种方式

- 不同的打包入口（不适合 spa 应用）
- esm 动态导入（通过路由生成不同文件就是这种）

## 不同的打包入口

```js
{
  entry: {
    "index": './index.js',
    "other": './other.js'
  },
  output: {
    filename: '[name],bundle.js',
  }
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.js',
      filename: 'index.html',
      chunks: ['index.js'], //指定引入的js文件
    }),
    new HtmlWebpackPlugin({
      template: './src/other.js',
      filename: 'other.html',
      chunks: ['other.js'],
    })
  ]
}
```

缺点：公共模块会重复打包，需要开启公共模块提取

```js
{
  optimization: {
    splitChunks: {
      chunks: "all";
    }
  }
}
```

## 动态导入

通过 esm 的动态导入，实现按需加载，更加灵活。

```js
const hash = location.hash || "index";

if (hash === "index") {
  import("./index.js").then(({ default: index }) => {
    document.appendChild(index);
  });
} else if (hash === "other") {
  import("./other.js").then(({ default: other }) => {
    document.appendChild(other);
  });
}
```

还可以通过魔法字符串将两个模块打包到一起

```js
const hash = location.hash || "index";

if (hash === "index") {
  import(/* webpackChunkName: 'components' */ "./index.js").then(
    ({ default: index }) => {
      document.appendChild(index);
    }
  );
} else if (hash === "other") {
  import(/* webpackChunkName: 'components' */ "./other.js").then(
    ({ default: other }) => {
      document.appendChild(other);
    }
  );
}
```

## css 模块的分割

通过 MiniCssExtractPlugin 插件 css 代码分割成不同文件的。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
{
  plugins: [
    new MiniCssExtractPlugin()
  ],
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  }
}
```

webpack 默认压缩 js 文件，因此 css 文件单独提取出来后，需要进行压缩，通过 optimize-css-assets-webpack-plugin 插件。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
{
  plugins: [
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  }
}
```

css 压缩插件会把 css 默认插件覆盖掉，需要手动添加回来，名字是 tarser-webpack-plugin

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TarserWebpackPlugin = require('tarser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
{
  plugins: [
    new MiniCssExtractPlugin(),
    new TarserWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  }
}
```

css、js 压缩插件也可以配置到 optimization 的 minimizer 中

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TarserWebpackPlugin = require('tarser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
{
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimizer: [
      new TarserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  }
}
```
