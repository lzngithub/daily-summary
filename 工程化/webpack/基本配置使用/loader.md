# loader

意味 webpack 默认只能处理 js 文件，所以要处理 css 文件，图片文件等资源需要使用 loader 模块。

loader：加载器，处理不同文件，是文件内容输入，转换，输出，输出内容必须为一段合法的 js 代码，或者是供其他 loader 使用的内容。

## 基础使用

```js
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
    ],
  },
```

## 常用的一些 cssloader

- style-loader：用于将 css 编译完成的样式，挂载到页面 style 标签上。
- css-loader: 用于识别.css 文件, 处理 css 必须配合 style-loader 共同使用，只安装 css-loader 样式不会生效。
- sass-loader： css 预处理器，识别.scss 文件。
- postcss-loader: 用于补充 css 样式各种浏览器内核前缀，太方便了，不用我们手动写啦。
- babel-loader： 将 Es6+ 语法转换为 Es5 语法。
- ts-loader： 用于配置项目 typescript。
- html-loader：我们有时候想引入一个 html 页面代码片段赋值给 DOM 元素内容使用，这时就用到 html-loader。
- file-loader: 用于处理文件类型资源，如 jpg，png 等图片。返回值为 publicPath 为准。
- url-loader: url-loader 也是处理图片类型资源，只不过它与 file-loader 有一点不同，url-loader 可以设置一个根据图片大小进行不同的操作，如果该图片大小大于指定的大小，则将图片进行打包资源，否则将图片转换为 base64 字符串合并到 js 文件里。
- html-withimg-loader：我们在编译图片时，都是使用 file-loader 和 url-loader，这两个 loader 都是查找 js 文件里的相关图片资源，但是 html 里面的文件不会查找所以我们 html 里的图片也想打包进去，这时使用 html-withimg-loader
- vue-loader：用于编译.vue 文件，如我们自己搭建 vue 项目就可以使用 vue-loader。
- eslint-loader: 用于检查代码是否符合规范，是否存在语法错误。

loader 大致可以分为三类：

- 编译转换类型：css-loader 等
- 文件操作类型：file-loader 等
- 代码质量检查类型： eslint-loader 等

## 自定义 loader

比如可以自定义一个处理 markdown 文件的 loader，理解 loader 的本质。

```js
// 和webpack配置文件同级的markdown-loader.js
// 引入处理markdown文件的插件
const marked = require("marked");

module.exports = (soure) => {
  // source 为文件输入内容
  const html = marked(soure);
  // html 为输出内容，输出为html字符串，供html-loader使用，html-loader 再转化为合法的js代码
  return html;
};
```

```js
module: {
    rules: [
      {
        test: /\.md$/i,
        use: ['html-loader', './markdown-loader'], // 可以通过相对路径引用，也可以发布到npm上安装再引用
      },
    ],
  },
```

以上就是自定义一个简单的 loader。

## loader 匹配优化

对于打包的每一个文件，都会把全部 rules 规则都匹配一次，对符合规则的则用对应的 loader 进行处理，这样会比较慢，采用 oneOf 则会在命中第一个规则之后则不会再进行匹配。

例子：

```js
module.exports = {
  modules: {
    rules: [
      {
        // css文件第一个匹配成功后后面则不会再匹配
        oneOf: [
          {
            test: /\.css$/i,
            use: commonCssLoader,
          },
          {
            test: /\.less$/i,
            use: [...commonCssLoader, "less-loader"],
          },
        ],
      },
    ],
  },
};
```
