# JavaScript

JavaScript 分为三部分 ECMAScript DOM BOM 三个部分

## ECMAScript

js 基本语法规则

## DOM

DOM 全称是 Document Object Model，也就是文档对象模型。是针对 XML 的基于树的 API。描述了处理网页内容的方法和接口，是 HTML 和 XML 的 API，DOM 把整个页面规划成由节点层级构成的文档。

## BOM

BOM 是 Browser Object Model，浏览器对象模型。刚才说过 DOM 是为了操作文档出现的接口，那 BOM 顾名思义其实就是为了控制浏览器的行为而出现的接口。

浏览器可以做什么呢？比如跳转到另一个页面、前进、后退等等，程序还可能需要获取屏幕的大小之类的参数。所以 BOM 就是为了解决这些事情出现的接口。比如我们要让浏览器跳转到另一个页面，只需要 location.href = "http://www.xxxx.com";这个 location 就是 BOM 里的一个对象。

BOM 区域

- 1 区（浏览器的标签页，地址栏，搜索栏，书签栏，窗口放大还原关闭按钮，菜单栏等等）
- 2 区（滚动条 scroll bar）
- 3 区（浏览器的右键菜单）
- 4 区（document 加载时的状态栏，显示 http 状态码等）

Window 对象包含属性：document、location、navigator、screen、history、frames

## 区别和联系

从 window.document 已然可以看出，DOM 的最根本的对象是 BOM 的 window 对象的子对象。

由于 BOM 的 window 包含了 document，因此可以直接使用 window 对象的 document 属性，通过 document 属性就可以访问、检索、修改 XHTML 文档内容与结构。因为 document 对象又是 DOM（Document Object Model）模型的根节点。

可以说，BOM 包含了 DOM(对象)，浏览器提供出来给予访问的是 BOM 对象，从 BOM 对象再访问到 DOM 对象，从而 js 可以操作浏览器以及浏览器读取到的文档。
