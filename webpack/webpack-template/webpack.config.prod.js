const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 引入语法检查
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[contenthash:10][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        // 对图片资源进行处理
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader',
      },
      {
        test: /\.(avi|mp3|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'resources/[hash:10][ext][query]',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  /**
   * 插件
   *
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/[contenthash:10].css',
    }),
    // new ESLintPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false, // 自动打开
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'async', // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
      minSize: 30000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxInitialRequests: 4, // 入口文件做代码分割最多分成 4 个 js 文件
      cacheGroups: {
        // 缓存组配置，默认有vendors和default
        vendors: { // 第三方模块
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
        default: { // 公共模块
          minChunks: 2, // 覆盖外层minChunks,用于提取被引用指定次数的公共模块，这里默认2次
          priority: -20,
          name: 'common',
          reuseExistingChunk: true, // 是否重用已存在的chunk
        },
      },
    },
  },
  // nosources-source-map: 会有目录结构的映射，但不包含源码，方便定位问题，但不会暴露源码内容
  devtool: 'nosources-source-map',
  mode: 'production',
};
