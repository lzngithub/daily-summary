# AST 及其应用

AST 是 Abstract Syntax Tree 的简称，是前端工程化绕不过的一个名词。它涉及到工程化诸多环节的应用，比如:

- 如何将 Typescript 转化为 Javascript (typescript)
- 如何将 SASS/LESS 转化为 CSS (sass/less)
- 如何将 ES6+ 转化为 ES5 (babel)
- 如何将 Javascript 代码进行格式化 (eslint/prettier)
- 如何识别 React 项目中的 JSX (babel)
- GraphQL、MDX、Vue SFC 等等

而在语言转换的过程中，实质上就是对其 AST 的操作，核心步骤就是 AST 三步走：

- Code -> AST (Parse)
- AST -> AST (Transform)
- AST -> Code (Generate)

AST 是 Abstract Syntax Tree 的缩写，这玩意儿的全称叫抽象语法树，它可以用来描述我们代码的语法结构。

不同的语言拥有不同的解析器，比如 Javascript 的解析器和 CSS 的解析器就完全不同。

对相同的语言，也存在诸多的解析器，也就会生成多种 AST，如 babel 与 espree。

## AST 的生成

AST 的生成这一步骤被称为解析(Parser)，而该步骤也有两个阶段: 词法分析(Lexical Analysis)和语法分析(Syntactic Analysis)

### 词法分析 (Lexical Analysis)

词法分析用以将代码转化为 Token 流，维护一个关于 Token 的数组，

词法分析后的 Token 流也有诸多应用，如:

- 代码检查，如 eslint 判断是否以分号结尾，判断是否含有分号的 token
- 语法高亮，如 highlight/prism 使之代码高亮
- 模板语法，如 ejs 等模板也离不开

### 语法分析 (Syntactic Analysis)

语法分析将 Token 流转化为结构化的 AST，方便操作，那拿到了代码的 ast 信息我们能做什么呢？

- 代码分析与转换。AST 可以将我们的代码解析成一棵 ast 树，我们自然可以将这棵树进行处理和转换，这个最经典的应用莫过于 babel 了，将我们的高级语法 ES6 转换为 ES5 后，然后再把 ast 树转换成代码输出。除此之外，webpack 的处理 ES6 的 import 和 export 也是依赖了 ast 的能力，以及我们的 jsx 的语法转换等。
- 语法检查和错误提示。我们把语法解析成 ast 树之后，自然就可以按照一定的语法规则去检查它的语法是否正确，一旦错误就可以抛出错误，提醒开发者去修正。比如我们使用的 vscode 就是利用 AST 提供实时的语法检查和错误提示。而在前端项目中，应用的最广的语法检查工具就是 ESlint 了，基本就是前端项目必备。
- 静态类型检查。这个其实跟第二点有点像，不过第二点是侧重于语法检查，而这个是针对类型检查的，比如我们的 Typescript 会利用 ast 进行类型检查和推断。
- 代码重构。基于 AST 树，我们可以对代码进行自动重构。比如提取函数、变量级、函数移动等。

## AST 的应用

其实在实际开发中，我们也可以利用做很多的事情，比如实现自动埋点、自动国际化、依赖分析和治理等等，有兴趣的小伙伴可以自行去探索。

就是我们 webpack 强大的 Tree-Shaking 能力。

### Tree-Shaking

Tree-shaking 翻译过来的意思就是摇树。这棵树可以把它比喻为现实中的树，可以这样理解，摇树就是把发黄、没有作用还要汲取养分的叶子给给摇掉。把这个搬到 javascript 程序里面来就是，移除 Javascript 上下文中的未引用代码（dead-code）。

废话不多说，直接看例子：

```js
// test.js
function add(a, b) {
  return a + b;
}
function multiple(a, b) {
  return a * b;
}
let firstNum = 3,
  secondNum = 4;
add(firstNum, secondNum);
```

在这段代码中，我们定义了两个函数 add 和 multiple，两个变量 firstNum 和 secondNum，然后调用了 add 方法并将 firstNum 和 secondNum 作为参数传入。
很明显，multiple 方法是没有被调用到的，打包的时候其实是可以被删除掉的，以减少我们打包后的代码体积。
那么，如何删除 multiple 呢？这时候就该我们的 ast 就登场了！要实现这个功能，分三步走。

1. 解析源代码生成 ast（抽象语法树）
2. 遍历 ast，记录相关信息
3. 根据遍历 ast 得到的信息，生成新代码
