# plugins

增强 webpack 自动化能力，解决资源加载外的其他自动化的功能，自如压缩代码，清除打包输出目录，拷贝静态文件到输出目录等功能;

## plugins 实现原理

webpack 为了更好的扩展性，再 webapck 打包的过程中给出许多钩子函数，plugin 实现原理则是调用这些钩子函数，去增加 webpack 的功能。

## 自定义一个钩子函数

```js
// 在webapck配置文件中直接定义一个plugin
class MyPlugin {
  apply(compiler) {
    console.log("MyPlugin插件启动");

    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation为此次打包的上下文
      // 在这里写具体的逻辑
    });
  }
}
```

## 常见的 plugins

- clean-webapck-plugin：清除打包目录文件
- html-webpack-plugin: 根据模板文件自动生成 html 文件，并且将输出文件 JS 自动插入到 html 中，免去了需要手动更新版本号的烦恼。
- copy-webpack-plugin: 将文件从某一目录复制到另一目录，可以用于 public 下的静态文件，比如和 html 同级的 JS 文件，无需参与编译但是需要输出到 dist 目录,一般在生产环境用到这个插件。
- clean-webpack-plugin: 用于清除打包的输出文件夹，试想如果每次打包出的文件都带有不同版本号，不及时清除文件夹，那么是不是会越来越大。本插件可以帮助我们自动清除，避免手动操作。
- CommonsChunkPlugin：抽取公共模块，减小包占用的内存空间，例如 vue 的源码、 jQuery 的源码等。
- webpack.DefinePlugin：定义某些变量的值，在打包时用变量值替代变量。
- MiniCssExtractPlugin：抽离 css 到独立的文件中，否则将会以内嵌的方式嵌在 html 中。
- PurgeCSSPlugin: 删除没有引用到的选择器及其样式，需要配置判断引用文件，如 html，js。起到 css tree-shaking 的效果。需要注意的是，不会删除重复的选择器样式，这个属于压缩的任务。
- webpack.ProvidePlugin：配置全局模块，避免多次引入的麻烦。
- BundleAnalyzerPlugin：文件分析插件，可以用于打包后资源的依赖及大小分析。
- ImageminPlugin：压缩图片
- CompressionPlugin：启用传输压缩，比如将资源压缩为 GZIP 格式。需要服务端进行配合。
- webpack.NoEmitOnErrorsPlugin：遇到编译报错不输出。比如我们启用热加载开发时，改错资源引用将导致页面实时报错，配置该插件可以让遇到错误的编译不再输出资源文件，页面也不会更新报错。打包时也是如此，遇到错误将跳过输出。
- OptimizeCssAssetsPlugin：压缩 css，会去除重复的类名样式。
- UglifyJsPlugin：压缩 JS。
- webpack.HotModuleReplacementPlugin：热加载插件，配合热加载设置，提高开发效率。
- TerserPlugin：压缩 JS，和 UglifyJsPlugin 插件相比，能更好的处理 ES6 以上语法。
- optimization.splitChunks：提取多入口的公共文件，避免重复打包。或者提取某一模块文件（如 node_modules），配合页面缓存来提高页面加载速度。

## 常用的 plugin 配置

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

{
  plugins: [
    new CleanWebpackPlugin(),          // 每次打包先清空dist目录
    new HtmlWebpackPlugin({
      title: 'title',
      meta: {
        viewport: 'width=device-width',
      }
      template: './src/index.html'     // 模版文件
    }),
    new CopyWebpackPlugin(['public']), // 接受一个数组，表示拷贝的目录或者路径。
  ]
}
```
