# js 的引入方式总结

基于向 HTML 页面引入 JavaScript 的几种方式，分析 HTML 中 JavaScript 脚本的执行顺序问题。

## 关于 JavaScript 脚本执行的阻塞性

JavaScript 在浏览器中被解析和执行时具有阻塞的特性，也就是说，当 JavaScript 代码执行时，页面的解析、渲染以及其他资源的下载都要停下来等待脚本执行完毕。这一点是没有争议的。原因也不难理解：浏览器需要一个稳定的 DOM 结构，而 JavaScript 可能会修改 DOM(改变 DOM 结构或修改某个 DOM 节点)，如果在 JavaScript 执行的同时还继续进行页面的解析，那么整个解析过程将变得难以控制，解析出错的可能也变得很大。

然而这里还有一个问题需要注意，对于外部脚本，还涉及到一个脚本下载的过程，在早期的浏览器中，JavaScript 文件的下载不仅会阻塞页面的解析，甚至还会阻塞页面其他资源的下载(包括其他 JavaScript 脚本文件、外部 CSS 文件以及图片等外部资源)。从 IE8、firefox3.5、safari4 和 chrome2 开始允许 JavaScript 并行下载，同时 JavaScript 文件的下载也不会阻塞其他资源的下载(旧版本中，JavaScript 文件的下载也会阻塞其他资源的下载)。

## 关于脚本的执行顺序

浏览器是按照从上到下的顺序解析页面，因此正常情况下，JavaScript 脚本的执行顺序也是从上到下的，即页面上先出现的代码或先被引入的代码总是被先执行，即使是允许并行下载 JavaScript 文件时也是如此。

- 正常引入：即在页面中通过 script 标签引入脚本代码或者引入外部脚本
- 通过 document.write 方法向页面写入 script 标签或代码
- 通过动态脚本技术，即利用 DOM 接口创建 script 元素，并设置元素的 src，然后再将元素添加进 DOM 中。
- 通过 Ajax 获取脚本内容，然后再创建 script 元素，并设置元素的 text，再将元素添加进 DOM 中。
- 直接把 JavaScript 代码写在元素的事件处理程序中或直接作为 URL 的主体，示例如下：

```html
<!--直接写在元素的事件处理程序中-->
<input type="button" value="点击测试一下" οnclick="alert('点击了按钮')" />
<!--作为URL的主体-->
<a href="javascript:alert('dd')">JS脚本作为URL的主体</a>
```

这种情况对于我们讨论的脚本执行顺序没有什么影响，因此我们这里只讨论前四种情况：

## 通过 script 标签引入

分三种情况

1.同步加载：同步加载文件通常使用 script 标签，并且没有设置 async 和 defer 属性。这种方式会阻塞页面加载，直到文件被完全加载和执行完成。

```js
<script src="file.js"></script>
```

2.异步加载：异步加载文件通常使用 script 标签，并且设置了 async 或 defer 属性。这种方式不会阻塞页面加载，而是在文件下载完成后，立即执行文件中的代码。

```js
<script src="file.js" async></script>
<script src="file.js" defer></script>
```

- async 和 defer 的下载都不会阻塞 html 的解析;
- async 的执行会阻塞 html 的解析，同时多个 async 的脚本的执行时无序的，先下载完成先执行;
- defer 的执行不会阻塞 html 的解析，他的执行是有序的且是再 html 解析完成后的;

## 通过 document.write 方法向页面写入 script 标签或代码

```js
<script src='/delayfile.php?url=http://localhost/js/load/1.js&delay=2' type='text/javascript'></script>
<script type="text/javascript">
document.write('<script type="text/javascript" src="/delayfile.php?url=http://localhost/js/load/2.js"><\/script>');
alert("我是内部脚本");
</script>
```

输出顺序为 document.write 引入的外部脚本是最后执行的。

## 通过动态脚本技术

```js
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  //绑定加载完毕的事件
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        callback && callback();
      }
    };
  } else {
    script.onload = function () {
      callback && callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
```

是异步加载的。

## 通过 Ajax 注入脚本

```js
var xhr = (function () {
  function createXhr() {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      var xhrVersions = [
          "MSXML2.XMLHttp",
          "MSXML2.XMLHttp.3.0",
          "MSXML2.XMLHttp.6.0",
        ],
        i,
        len;
      for (i = 0, len = xhrVersions.length; i < len; i++) {
        try {
          xhr = new ActiveXObject(xhrVersions[i]);
        } catch (e) {}
      }
    } else {
      throw new Error("无法创建xhr对象");
    }
    return xhr;
  }
  function get(url, async, callback) {
    var xhr = createXhr();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          callback && callback(xhr.responseText);
        } else {
          alert("请求失败，错误码为" + xhr.status);
        }
      }
    };
    xhr.open("get", url, async);
    xhr.send(null);
  }
  return {
    get: get,
  };
})();
```

这个也是异步的
