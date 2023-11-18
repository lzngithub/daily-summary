# source map

解决源代码和运行代码不一致的问题，可以方便进行生产环境的调试，依赖于 surce.map 文件的映射，因为 source map 不影响生产环境的代码运行，新版本的 webpack 已经把引用 source map 的注视给去掉了，需要配置。

## 配置

配置：

```js
{
  devtool: "source-map";
}
```

对应的值参考 webapck 官网：https://webpack.docschina.org/configuration/devtool/

## 模式

- eval：使用 eval 去执行代码，构建速度快，不生成 source map 文件，只能定位错误文件名，但不能定位具体信息。
- eval-source-map：使用 eval 去执行代码，也可以映射出源文件的行和列;
- cheap-eval-source-map: 定位少了列，包含行信息。
- cheap-moudle-eval-source-map: 得到 loader 处理前的源代码。

* cheap-source-map: 没有用 eval 去执行模块
* inline-source-map: 把 source-map 文件放入到 js 代码中（不可取，会让 js 文件变大）
* hidden-source-map: 会生成 source-map 文件，但是不会在 js 代码中引用，常用于第三方包，用户需要自己调试的时候用到。
* nosources-source-map: 提供错误行列信息，但点进去没有源代码，保护在生产环境中的代码不暴露出去

规律：

- eval： 使用 eval 去执行模块代码
- cheap：不包含列信息，包含行信息
- module：得到 loader 处理前的源代码

## 选择合适的模式

开发环境可以选择 cheap-module-eval-source-map

- 一般代码编写每行字符数不会过多，定位到行就够用了;
- 代码经过 loader 处理过后的差异会比较大，所以需要定位到 loader 处理前的信息;
- 首次打包速度会慢一些，但重复打包速度比较快。

生产环境，选择不生成 source-map，就 none，因为会暴露源代码，调试是开发阶段的事情。如果需要用，可以考虑 nosources-source-map。
