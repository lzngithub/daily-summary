const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'development';

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader',
];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[contenthash:10].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: commonCssLoader,
          },
          {
            test: /\.less$/i,
            use: [...commonCssLoader, 'less-loader'],
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
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // 压缩css
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/[contenthash:10].css',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
  cache: {
    type: 'memory',
  },
  // eval-source-map:会生成正确文件索引，初始构建会慢，会在重新构建时提供比较快的速度
  devtool: 'eval-source-map',
  mode: 'development',
};
