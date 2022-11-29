const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  /**
   * 入口
   */
  entry: "./src/index.js",
  /**
   * 输出
   */
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  /**
   * 模块
   */
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ],
  },
  /**
   * 插件
   *
   */
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  /**
   * 模式
   *
   */
  mode: "development",
};
