# DOM

文档对象模型（document-object-model），全局对象document是对Document接口的实现

Node：指代节点
Element：指代元素节点

## 节点

类型分类：文档、元素、属性、文本、注释节点

关系分类：父、子、兄弟节点

## 方法

获取节点: 
document.getElementById  
getElementsByTagName  
getElementsByClassName  
getElementsByName

document/element.querySelector()
document/element.querySelectorAll()

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
createElement()：创建元素节点
createTextNode()：创建文本节点
innerHTML():创建和添加

插入节点：
write(): 将任意字符串插入到文档中
parentNode.appendChild(): 在最后插入子节点
parentNode.insertBefore(newItem, exsitingItem): 在之前节点插入

删除节点：
parentNode.removeChild(oldChild): 删除指定子节点

替换节点：
parentNode.replaceChild(newChild, oldChild): 替换一个子节点

克隆节点：
node.cloneNode(deep): 克隆一个节点

## 属性

Element.getAttributeNames(): 获取全部属性名称
Element.getAttribute(attr): 后去指定属性
Element.setAttribute(attr, value): 设置指定属性的值
element.id: 设置或者返回元素的id
element.style: 设置或返回元素的样式属性
element.className: 设置或者返回元素的class属性
element.classList: 换回元素的类名

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

> 浏览器默认阻止ondrop事件，因此要在ondragover中阻止浏览器默认行为
> 拖拽事件的判断标准是以鼠标坐标为准的，而不是以被拖拽元素为准的
> 拖拽元素事件只有三个
> dataTransfer用于保存一些在拖拽过程中的数据

* 在ondragstart中赋值，e.dataTransfer.setData('text/html', e.target.id)
* 在ondrop中赋值， e.target.appendChild(document.getElementById(e.dataTransfer.getData('text/html')))






