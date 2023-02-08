# ESlint

## 配置项

### root

- 当前目录是不是根目录

```js
root: true, // 当前目录为根目录，不再向上级去寻找eslint配置文件
```

### parser parserOptions

- parser：解析器，配置解析项目的规则

```js
/*
  默认： esprima
  @typescript-eslint/parser - ts 解析器
  @babel/eslint-parser      - babel 解析器
*/
module.exports = {
  parser: "@typescript-eslint/parser",
};
```

- parser：解析器选项，搭配 parser，指定你想要支持的 JavaScript 语言选项。

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  // @typescript-eslint/parser的解析器选项参考：https://typescript-eslint.io/architecture/parser/
  parserOptions: {
    ecmaVersion: 6, //  默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
    sourceType: "module", //  设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    ecmaFeatures: {
      // 配置你想使用的额外的语言特性
      globalReturn: false, // 允许在全局作用域下使用 return 语句
      jsx: true, // 启用 jsx
      impliedStrict: false, // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
      experimentalObjectRestSpread: false, // 启用实验性的 object rest/spread properties 支持
    },
  },
};
```

### env

- env: 环境，设置脚本在哪种环境中运行。

```js
module.exports = {
  env: {
    // 常用
    browser: true,             // 浏览器全局变量
    node: true,                // Node.js 全局变量和 Node.js 作用域
    commonjs: true,            // CommonJS 全局变量和 CommonJS 作用域 (启用此环境用于使用 Browserify/WebPack 的 browser-only 代码)
    shared-node-browser: true, // Node.js 和 Browser 通用的全局变量
    es6: true,                 // 启用除 modules 以外的所有 ECMAScript 6 特性  (这会自动将 `ecmaVersion` 解析器选项设置为 6)
    es2017: true,              // 添加所有 ECMAScript 2017 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 8
    es2020: true,              // 添加所有 ECMAScript 2020 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 11
    es2021: true,              // 添加所有 ECMAScript 2021 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 12
    worker: true,              // web workers 全局变量

    // 不常用
    amd: true,                 // 根据 amd 规范定义 `require()` 和 `define()` 作为全局变量
    mocha: true,               // 添加所有 Mocha 测试全局变量
    jasmine: true,             // 为版本 1.3 和 2.0 添加所有 Jasmine 测试全局变量
    jest: true,                // Jest 全局变量
    phantomjs: true,           // PhantomJS 全局变量
    protractor: true,          // Protractor 全局变量
    qunit: true,               // QUnit 全局变量
    jquery: true,              // jQuery 全局变量
    greasemonkey: true,        // GreaseMonkey 全局变量
    prototypejs: true,         // Prototype.js 全局变量
    shelljs: true,             // ShellJS 全局变量
    meteor: true,              // Meteor 全局变量
    mongo: true,               // MongoDB 全局变量
    applescript: true,         // AppleScript 全局变量
    nashorn: true,             // Java 8 Nashorn 全局变量
    serviceworker: true,       // Service Worker 全局变量
    atomtest: true,            // Atom 测试助手全局变量
    embertest: true,           // Ember 测试助手全局变量
    webextensions: true,       // WebExtensions 全局变量
  }
}
```

### globals

- globals: 全局变量，当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。

```js
module.exports = {
  globals: {
    // 自己定义的全局变量
    logger: "readonly", //readonly: 可读不可写,    writable: 可读可写
  },
};
```

### rules

- rules: 规则，如果不配置规则，则 eslint 也不会生效。

```js
// off 或者 0: 关闭规则
// warn 或者 1: 开启规则，使用警告级别的错误
// error 或者 2: 关闭规则，使用错误级别的错误
module.exports = {
  rules: {
    // 需要添加分号
    semi: 2,
    // 保存代码时缩进2个空格
    indent: ["error", 2],
  },
};
```

### plugins extends

- plugins: 插件，为 eslint 新增一些检查规则，举个例子：eslint-plugin-react 就会对 react 项目做了一些定制的 eslint 规则， eslint-plugin-react-hooks 就是针对 react/hooks 的定制的一系列规则。此时只是让 eslint 能够识别这些规则，但是这些规则还没有加到项目中，此时就需要我们就可以手动的在 rules 添加要使用的规则，如：

```js
//.eslintrc.js
module.exports = {
  plugins: ["eslint-plugin-react"],
  rules: {
    "eslint-plugin-react/jsx-boolean-value": 2,
  },
};
```

- extends: 继承，继承社区整理好的配置规则，如： eslint-plugin-react 为了方便其他人使用，它默认实现了两种最佳实践 all 以及 recommened，这样我们就可以直接使用它配置好的规则。

```js
//.eslintrc.js
module.export = {
  plugins: ["eslint-plugin-react"],
  extends: ["eslint-plugin-react/recommended"],
  rules: {
    // 也可以在当前项目中修改继承的一些配置项
    "eslint-plugin-react/jsx-boolean-value": 2,
  },
};
```

## 调试 eslint

- 怎么调都调不好的情况下，重装一下 eslint 可能就好了，玄学
