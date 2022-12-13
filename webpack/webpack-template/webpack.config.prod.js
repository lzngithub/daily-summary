const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 引入语法检查
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.NODE_ENV = 'production';

module.exports = {
  
  entry: './src/index.js',
  
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[contenthash:10][ext][query]'
    // clean: true,
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
    new ESLintPlugin({
      fix: true,
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  // nosources-source-map: 会有目录结构的映射，但不包含源码，方便定位问题，但不会暴露源码内容
  devtool: 'nosources-source-map', 
  mode: 'production',
};
