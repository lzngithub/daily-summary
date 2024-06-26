# DOM

文档对象模型（document-object-model），全局对象 document 是对 Document 接口的实现,它建模了文档的内容和结构，并提供给编程语言一套完整的操纵文档的 API

Node：指代节点，是 DOM 模型的组成单元。
Element：指代元素节点

## 节点

有 12 种，但部分已经废弃，主要用的是下面几种

类型分类：

- 文档（9）
- 元素（nodeType === 1）
- 属性、
- 文本（2）、
- 注释节点（8）

关系分类：父、子、兄弟节点

## 方法

### 获取元素:

dom 选择器，返回结果是动态的，源自 DOM2 标准

- document.getElementById(id)
- document/element.getElementsByTagName(tagName)
- document/element.getElementsByClassName(className)
- document.getElementsByName(name)

css 选择器，返回结果是静态的，源自 Selectors API 规范

- document/element.querySelector()
- document/element.querySelectorAll()

### 查找节点：

父元素

- element.parentNode/Element(): 查找父节点
- element.ownerDocument(): 查找所属文档的根节点对象

兄弟元素

- nextSibling: 前兄弟节点
- nextElementSibling: 前元素兄弟节点
- previousSibling: 后兄弟节点
- previousElementSibling: 后兄弟元素节点

子元素

- childNodes: 所有子节点对象
- children: 所有子元素节点
- firstChild: 第一个子节点
- firstElementChild: 第一个子元素节点
- lastChild: 第一个子节点
- lastElementChild: 第一个子元素节点
- hasChildNodes(): 判断是否包含子节点对象
- childElementCount(): 获取子元素节点数量

### 创建节点

- document.createElement()：创建元素节点
- document.createTextNode()：创建文本节点
- element.innerHTML = domString: 或取或者替换元素的 HTML 片段

### 插入节点：

- document.write(html): 将任意字符串插入到文档中（老）
- parentNode.appendChild(node): 在最后插入子节点（老）
- parentNode.insertBefore(node, nextSibling): 在之前节点插入（老）
- parentNode.prepend(...nodes or strings): 在第一个子节点之前插入。
- parentNode.append(...nodes or strings): 在最后一个子节点之后插入。
- nextSibling.before(...nodes or strings): 在本节点之前同级插入。
- previousSibling.after(...nodes or strings): 在本节点之后同级插入。
- element.textContent(string): 插入纯文本
- element.innerHTML: 将内容“作为 HTML 代码插入”
- insertAdjacentHTML/Text/Element(where, html): 在 where 处插入东西
  - "beforebegin" —— 将 html 插入到 elem 之前，
  - "afterbegin" —— 将 html 插入到 elem 开头，
  - "beforeend" —— 将 html 插入到 elem 末尾，
  - "afterend" —— 将 html 插入到 elem 之后。

详细解释 document.write(string)的用法：

1. 该方法在文档已经关闭后调用的话，会默认调用 document.open()方法，该方法会晴空现有文档的一切内容。
2. 该方法写在 script 标签中（此时文档还没有关闭），则表现为写入的内容会追加在对应的 script 标签后面。
3. 参数不接受节点，只接受字符串。

### 删除节点：

- parentNode.removeChild(oldChild): 删除指定子节点（老）
- node.remove(): 移除节点，但不兼容 ie

### 替换节点：

- parentNode.replaceChild(newChild, oldChild): 替换一个子节点（老）

### 克隆节点：

- node.cloneNode(deep): 从已有节点克隆, deep 为 true 表示深拷贝，常用。默认为 false。

### 总结

常用下面节点就可以了

- 创建新节点的方法：

  - document.createElement(tag) —— 用给定的标签创建一个元素节点，
  - document.createTextNode(value) —— 创建一个文本节点（很少使用），
  - elem.cloneNode(deep) —— 克隆元素，如果 deep==true 则与其后代一起克隆。

- 插入和移除节点的方法：文本字符串被“作为文本”插入。

  - node.append(...nodes or strings) —— 在 node 末尾插入，
  - node.prepend(...nodes or strings) —— 在 node 开头插入，
  - node.before(...nodes or strings) —— 在 node 之前插入，
  - node.after(...nodes or strings) —— 在 node 之后插入，
  - node.replaceWith(...nodes or strings) —— 替换 node。
  - node.remove() —— 移除 node。

- 这里还有“旧式”的方法：这些方法都返回 node。

  - parent.appendChild(node)
  - parent.insertBefore(node, nextSibling)
  - parent.removeChild(node)
  - parent.replaceChild(newElem, node)

- 在 html 中给定一些 HTML，elem.insertAdjacentHTML(where, html) 会根据 where 的值来插入它：

  - "beforebegin" —— 将 html 插入到 elem 前面，
  - "afterbegin" —— 将 html 插入到 elem 的开头，
  - "beforeend" —— 将 html 插入到 elem 的末尾，
  - "afterend" —— 将 html 插入到 elem 后面。

- 要在页面加载完成之前将 HTML 附加到页面：
  - document.write(html)：页面加载完成后，这样的调用将会擦除文档。多见于旧脚本。

## 特性和属性

当浏览器加载页面时，它会“读取”（或者称之为：“解析”）HTML 并从中生成 DOM 对象。对于元素节点，大多数标准的 HTML 特性（attributes）会自动变成 DOM 对象的属性（properties）。

例如，如果标签是 <body id="page">，那么 DOM 对象就会有 body.id="page"。

但特性—属性映射并不是一一对应的！

### DOM 属性

我们已经见过了内建 DOM 属性。它们数量庞大。但是从技术上讲，没有人会限制我们，如果我们觉得这些 DOM 还不够，我们可以添加我们自己的。

DOM 节点是常规的 JavaScript 对象。我们可以更改它们。

DOM 属性和方法的行为就像常规的 Javascript 对象一样：

- 它们可以有很多值。
- 它们是大小写敏感的（要写成 elem.nodeType，而不是 elem.NoDeTyPe）。

### HTML 特性

在 HTML 中，标签可能拥有特性（attributes）。当浏览器解析 HTML 文本，并根据标签创建 DOM 对象时，浏览器会辨别 标准的 特性并以此创建 DOM 属性。

当一个元素有 id 或其他 标准的 特性，那么就会生成对应的 DOM 属性。但是非 标准的 特性则不会。

所以，如果一个特性不是标准的，那么就没有相对应的 DOM 属性。那我们有什么方法来访问这些特性吗？

当然。所有特性都可以通过使用以下方法进行访问：

- elem.hasAttribute(name) —— 检查特性是否存在。
- elem.getAttribute(name) —— 获取这个特性值。
- elem.setAttribute(name, value) —— 设置这个特性值。
- elem.removeAttribute(name) —— 移除这个特性。

HTML 特性有以下几个特征：

- 它们的名字是大小写不敏感的（id 与 ID 相同）。
- 它们的值总是字符串类型的。

#### 非标准的特性，dataset

当编写 HTML 时，我们会用到很多标准的特性。但是非标准的，自定义的呢？首先，让我们看看它们是否有用？用来做什么？

有时，非标准的特性常常用于将自定义的数据从 HTML 传递到 JavaScript，或者用于为 JavaScript “标记” HTML 元素。它们还可以用来设置元素的样式。

所有以 “data-” 开头的特性均被保留供程序员使用。它们可在 dataset 属性中使用。

```html
<style>
  .order[data-order-state="new"] {
    color: green;
  }
  .order[data-order-state="pending"] {
    color: blue;
  }
  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">A new order.</div>

<script>
  // 读取
  alert(order.dataset.orderState); // new
  // 修改
  order.dataset.orderState = "pending"; // (*)
</script>
```

### 基本方法

- Element.getAttributeNames(): 获取全部属性名称
- Element.getAttribute(attr): 后去指定属性
- Element.removeAttribute(attr): 移除这个特性。
- Element.hasAttribute(attr): 检查是否存在这个特性。
- Element.setAttribute(attr, value): 设置指定属性的值
- element.id: 设置或者返回元素的 id
- element.style: 设置或返回元素的样式属性
- element.className: 设置或者返回元素的 class 属性
- element.classList: 一个包含 elem 所有类的可迭代的类数组对象。这个对象有几个方法，方便我们改变元素的类。
  - element.classList.contains(class): 检查是否有某个类
  - add(class): 添加某个类
  - remove(class): 移除某个类
  - toggle(class): 切换某个类，如果有就删除，没有就添加

在大多数情况下，最好使用 DOM 属性。仅当 DOM 属性无法满足开发需求，并且我们真的需要特性时，才使用特性，例如：

- 我们需要一个非标准的特性。但是如果它以 data- 开头，那么我们应该使用 dataset。
- 我们想要读取 HTML 中“所写的”值。对应的 DOM 属性可能不同，例如 href 属性一直是一个 完整的 URL，但是我们想要的是“原始的”值。

### 元素的位置和尺寸

#### 位置

位置是相对于参照物的，一个元素，有相对于定位父元素，相对于视口，相对于文档三种关系位置。

- 相对于定位父元素：elem.offsetLeft/offsetTop ，相对于参照父节点的左/上边距。elem.offsetParent 获取元素的定位父元素。
- 相对于浏览器视口：elem.getBoundingClientRect().left/top/right/bottom 分别表示元素盒子（含边框）四角到视口左或上边的距离。
- 相对于文档：没有直接获取的方式，用处不大，如果真要获取，可以通过滚动举例加上相对于视口的距离来计算（不一定正确）

#### 尺寸

- HTMLElement.clientWidth: 只读，返回元素视口的宽度，包含 padding +（padding 包裹部分，这个部分不包含滚动部分）
- HTMLElement.offsetWidth：只读，返回元素的布局宽度，等于 clientWidth + scollorbar + border
- HTMLElement.srcollWidth: 只读，元素内容宽度(有滚动的时候包括滚动部分) + padding，俗称滚动宽度
- HTMLElement.style.width: 只能获取块级元素通过内联样式设置的 width 属性
- HTMLElement.getBoundingClientRect().width: 获取到任何都没元素的布局宽度，包括行内元素的

需要注意的点

- 滚动条是在 border 和 padding 中间的，同时滚动条会占据 style.width 的一部分宽度
- 在 box-sizing：content-box;下 padding 包裹的部分也不一定等于 style.width，因为滚动条会占据 style.width 一部分的宽度。

### 注意的点

- 隐藏元素的方法：1. node.hidden = true(不会占位) 2. ele.style.display = 'none'(不会占位) 3. ele.style.visibility = 'hidden' (会占位)
- 通过 ele.style 可以获取通过 style 设置的元素样式，不会或者通过 css 或者的元素的样式。
- 通过 getComputedStyle(elem) 获取最终 css 样式

## 事件

element.addEventListener(type, listener, useCaptrue): 注册事件
element.onclick=function() {}: 绑定事件
element.onclick(): 触发事件
element.removeEventListener(type, listence): 移除事件

### 事件类型

onload: 页面加载完成
onbeforeunload：页面关闭前
onunload: 页面关闭
onclick: 用户点击
onchange: 用户改变内容
onmouseover: 鼠标进入元素
onmouseout: 鼠标离开元素
onmousedown: 鼠标按下
onmouseup: 鼠标抬起
onmousemove: 鼠标移动
onmousewheel: 鼠标滚轮时
onscroll: 元素滚动时
ondbclick: 双击

拖拽元素事件
ondrag: 鼠标拖动元素
ondragstart: 拖动开始
ondragend: 拖动结束

ondragenter: 拖动进入
ondragover: 在里面
ondrop: 拖动放下
ondragleave: 拖动离开

> 浏览器默认阻止 ondrop 事件，因此要在 ondragover 中阻止浏览器默认行为
> 拖拽事件的判断标准是以鼠标坐标为准的，而不是以被拖拽元素为准的
> 拖拽元素事件只有三个
> dataTransfer 用于保存一些在拖拽过程中的数据

- 在 ondragstart 中赋值，e.dataTransfer.setData('text/html', e.target.id)
- 在 ondrop 中赋值， e.target.appendChild(document.getElementById(e.dataTransfer.getData('text/html')))

* 捕获和冒泡是阶段，addEventListener 的第三个参数是决定该事件是在哪个阶段触发执行的。默认 false，冒泡的时候触发
* 冒泡是可以被 e.stopPropagation()和 e.stopImmediatePropagation()阻止的
* 事件捕获是不能被阻止的，但可以设置事件不在捕获阶段触发就可以了
* 事件监听 addEventListener，移除事件监听 removeEventListener

事件冒泡应用

1. 事件代理或者说事件委托，通过在父元素上绑定事件，利用冒泡去触发做相应的逻辑。
