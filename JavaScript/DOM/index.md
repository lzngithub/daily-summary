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

查找节点：
element.parentNode/Element(): 查找父节点
element.ownerDocument(): 查找所属文档的根节点对象

nextSibling: 前兄弟节点
nextElementSibling: 前元素兄弟节点
previousSibling: 后兄弟节点
previousElementSibling: 后兄弟元素节点

childNodes: 所有子节点对象
children: 所有子元素节点
firstChild: 第一个子节点
firstElementChild: 第一个子元素节点
lastChild: 第一个子节点
lastElementChild: 第一个子元素节点
hasChildNodes(): 判断是否包含子节点对象
childElementCount(): 获取子元素节点数量

创建节点：
document.createElement()：创建元素节点
document.createTextNode()：创建文本节点
node.cloneNode(deep): 从已有节点克隆, deep 为 true 表示深拷贝，常用。默认为 false。
element.innerHTML = domString: 或取或者替换元素的 HTML 片段

插入节点：

- write(): 将任意字符串插入到文档中
- parentNode.appendChild(node): 在最后插入子节点
- parentNode.insertBefore(node, nextSibling): 在之前节点插入
- parentNode.prepend(...nodes or strings): 在第一个子节点之前插入。
- parentNode.append(...nodes or strings): 在最后一个子节点之后插入。
- nextSibling.before(...nodes or strings): 在本节点之前同级插入。
- previousSibling.after(...nodes or strings): 在本节点之后同级插入。

删除节点：

- parentNode.removeChild(oldChild): 删除指定子节点
- node.remove(): 移除节点，但不兼容 ie

替换节点：

- parentNode.replaceChild(newChild, oldChild): 替换一个子节点

克隆节点：
node.cloneNode(deep): 克隆一个节点

## 属性

### 基本方法

- Element.getAttributeNames(): 获取全部属性名称
- Element.getAttribute(attr): 后去指定属性
- Element.setAttribute(attr, value): 设置指定属性的值
- element.id: 设置或者返回元素的 id
- element.style: 设置或返回元素的样式属性
- element.className: 设置或者返回元素的 class 属性
- element.classList: 一个包含 elem 所有类的可迭代的类数组对象。这个对象有几个方法，方便我们改变元素的类。
  - element.classList.contains(class): 检查是否有某个类
  - add(class): 添加某个类
  - remove(class): 移除某个类
  - toggle(class): 切换某个类，如果有就删除，没有就添加

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
element.depatchEvent(type, listence): 移除事件

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
ondrop: 拖动过程中
ondragleave: 拖动离开

> 浏览器默认阻止 ondrop 事件，因此要在 ondragover 中阻止浏览器默认行为
> 拖拽事件的判断标准是以鼠标坐标为准的，而不是以被拖拽元素为准的
> 拖拽元素事件只有三个
> dataTransfer 用于保存一些在拖拽过程中的数据

- 在 ondragstart 中赋值，e.dataTransfer.setData('text/html', e.target.id)
- 在 ondrop 中赋值， e.target.appendChild(document.getElementById(e.dataTransfer.getData('text/html')))
