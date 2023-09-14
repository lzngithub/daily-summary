# 富文本

## draft-js

- 不是开箱即用的，需要二次封装

相关资料

- draft-js 官网：https://draftjs.org/
- draft-js 中文文档：https://github.com/mqyqingfeng/draft-js-doc-translation
- draft-js 基础使用：https://zhuanlan.zhihu.com/p/612512816

## quill

react 项目配置 react-quill 使用会方便一些，同时 quill 相关的 api 也是可以使用的

特点

- 简单易用，文档清晰
- 默认包含了常用的功能，下载即用
- 扩展性好，可自定义模块

可以实现的功能：

- 预设默认值
- 插入纯文本或者带格式文本
- 可以自定义主题
- 可以自定义工具栏
- 可以自定义编辑区域

相关资料

- quill 官网：https://quilljs.com/docs/quickstart/
- quill 中文文档：https://www.kancloud.cn/liuwave/quill/1409423
- react-quill api：https://github.com/gtgalone/react-quilljs#readme
- react-quill 基础使用：https://juejin.cn/post/7195124289501134905

## Slate

slate.js 是一个功能强大的富文本编辑器框架， 提供的是底层能力，需要大量的二次开发。

如果不是富文本定制性要求不建议使用，所有逻辑都是通过一系列的插件实现的。

配合 slate-react 去使用

- slate 官网：https://www.slatejs.org/examples/richtext
- 富文本的例子：https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
- 中文文档：https://rain120.github.io/athena/zh/slate/walkthroughs/01-installing-slate.html
