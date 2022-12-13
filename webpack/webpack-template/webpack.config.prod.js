const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 引入语法检查
const ESLintPlugin = require('eslint-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
  /**
   * 入口
   */
  entry: './src/index.js',
  /**
   * 输出
   */
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  /**
   * 模块
   */
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
      filename: 'css/index.css',
    }),
    new ESLintPlugin({
      fix: true,
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  /**
   * 模式
   *
   */
  // nosources-source-map: 会有目录结构的映射，但不包含源码，方便定位问题，但不会暴露源码内容
  devtool: 'nosources-source-map', 
  mode: 'production',
};
