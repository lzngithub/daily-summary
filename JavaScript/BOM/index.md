# BOM

浏览器对象模型(browser-object-model), 实体对象为window

分为六个部分

document lacation navigation screen history

## navigator

代表浏览器当前信息，但由于历史原因，navigator中大部分属性其实不能帮助我们识别浏览器了，一般用userAgent这个字符串来识别，该字符串包含有用来描述浏览器信息的内容。

## history

对象可以用来操作浏览器向前或向后翻页

length 属性，可以获取到当成访问的链接数量
state 属性，当期保留的状态值
back() ，可以用来回退到上一个页面，作用和浏览器的回退按钮一样
forward() ，可以跳转下一个页面，作用和浏览器的前进按钮一样

go() ，可以用来跳转到指定的页面 它需要一个整数作为参数
0:刷新当前页面
1:表示向前跳转一个页面 相当于forward()
2:表示向前跳转两个页面
-1:表示向后跳转一个页面
-2:表示向后跳转两个页面

pushState() : 打开一个指定的地址
replaceState() : 打开一个新的地址，并且使用 replace

## location

封装了地址栏的信息

常见的属性

href: 当前window对应的超链接URL, 整个URL；
protocol: 当前的协议；
host: 主机地址；
hostname: 主机地址(不带端口)；
port: 端口；
pathname: 路径；
search: 查询字符串；
hash: 哈希值；
username：URL中的username（很多浏览器已经禁用）；
password：URL中的password（很多浏览器已经禁用）；

方法
assign(): 跳转到其他页面
replace(): 替换当前页，不会生成立时记录，不能使用回退按钮回退
reload(): 刷新，传递参数true则会强制清空缓存刷新页面

## screen

屏幕对象


window.innerWidth: 浏览器内容显示区域的宽度，不包括控制台的部分

