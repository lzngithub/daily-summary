# react-router

React-Router 是 React 生态的基础路由库，它通过管理 URL，实现组件的切换和状态的变化。react-router 是基于 history 模块提供的 api 进行开发的，结合的形式本文记为 包装方式。要了解其设计模式，需先了解前端路由底层实现方式。

## 前端路由

Ajax 的诞生，让浏览器可以实现异步加载数据，能够极大的提高交互体验。同时前端路由的概念也随之而产生。

随着单页应用时代的到来，为之服务的前端路由系统也相继出现，比如 react-router 就是 react 生态的路由库。

- 实现思路：检测 url 变化，截获变化后的 url，进行路由匹配。
- 实现方式：两种方式都不会刷新页面，hash-route 和 html5-route，各种前端路由库都是由这两种方式和框架特性相结合去实现的。

### hash-route

实现原理：改变地址的 hash 值，监听 hash 变化，截取 hash，做对应的的操作，比如根据重新渲染组件。

为什么 hash 可以做，因为 hash 变化不会引起页面刷新。

简单实现

```js
// 监听hash值变化的事件
window.addEventListener("hashchange", function () {
  // 获取当前的hash值
  var hash = window.location.hash;

  // 移除前缀 '#!'，得到实际的路由地址
  var route = hash.substring(2);

  // 根据路由地址执行相应的函数
  if (route === "home") {
    home();
  } else if (route === "about") {
    about();
  }
});

// 定义路由处理函数
function home() {
  // 在这里编写处理主页逻辑的代码
}

function about() {
  // 在这里编写处理关于页面逻辑的代码
}
```

改变 hash 的方式主要有两种

第一种，通过 location 对象的 hash 字段赋值，不需要加#字符

```js
window.location.hash = "new-hash";
```

第二种，使用 a 标签锚点点击，需要加入#标识符

```js
<a href="#new-hash">new-hash</a>
```

### html5-route

html5 标准中，为 history 添加了 pushState()、replaceState()方法，以及 onpopstate 事件。主要就是 api 不一样，具体的流程和 hash-route 还是一样的。pushState()、replaceState()这两个方法调用不会刷新页面。

## react-route 实现原理

react-route 实现原理

react-router 是基于 history 模块提供的 api 进行开发的，结合的形式本文记为 包装方式。包装方式就是扩展，在 router 在 history 模块下进行再开发。

先看下 react-route 的使用方式：

```js
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)

<Link to={`/user/89757`}>'joey'</Link>
```

react-router 以 react component 的组件方式提供 API， 包含 Router，Route，Redirect，Link 等等，这样能够充分利用 react component 提供的生命周期特性，同时也让定义路由跟写 react component 达到统一。

首先声明了一份含有 path to component 的各个映射的路由表。react-router 还提供的 Link 组件（如下），作为提供更新 url 的途径，触发 Link 后最终将通过如上面定义的路由表进行匹配，并拿到对应的 component 及 state 进行 render 渲染页面。

当路由变化的时候，为什么能触发页面更新，原因是因为是因为触发了 setState 页面更新方法。

主要是因为触发了 react setState 的方法从而能够触发 render component。
从顶层组件 Router 出发（下面代码从 react-router/Router 中摘取），可看到 Router 在 react component 生命周期之组件被挂载前 componentWillMount 中使用 this.history.listen 去注册了 url 更新的回调函数。回调函数将在 url 更新时触发，回调中的 setState 起到 render 了新的 component 的作用。

```js
Router.prototype.componentWillMount = function componentWillMount() {
  // .. 省略其他
  var createHistory = this.props.history;

  this.history = _useRoutes2["default"](createHistory)({
    routes: _RouteUtils.createRoutes(routes || children),
    parseQueryString: parseQueryString,
    stringifyQuery: stringifyQuery,
  });

  this._unlisten = this.history.listen(function (error, state) {
    _this.setState(state, _this.props.onUpdate);
  });
};
```

上面的 \_useRoutes2 对 history 操作便是对其做一层包装，所以调用的 this.history 实际为包装以后的对象，该对象含有 \_useRoutes2 中的 listen 方法，如下

```js
function listen(listener) {
  return history.listen(function (location) {
    // .. 省略其他
    match(location, function (error, redirectLocation, nextState) {
      listener(null, nextState);
    });
  });
}
```

可看到，上面代码中，主要分为两部分

使用了 history 模块的 listen 注册了一个含有 setState 的回调函数（这样就能使用 history 模块中的机制）
回调中的 match 方法为 react-router 所特有，match 函数根据当前 location 以及前面写的 Route 路由表匹配出对应的路由子集得到新的路由状态值 state，具体实现可见 react-router/matchRoutes ，再根据 state 得到对应的 component ，最终执行了 match 中的回调 listener(null, nextState) ，即执行了 Router 中的监听回调（setState），从而更新了展示。
以上，为起始注册的监听，及回调的作用。

### 如何去触发回调

跟上面实现原理是一样，下面代码主要展示了 Link 标签如何去更改 url 的

```js
Link.prototype.render = function render() {
  // .. 省略其他
  props.onClick = function (e) {
    return _this.handleClick(e);
  };
  if (history) {
    // .. 省略其他
    props.href = history.createHref(to, query);
  }
  return _react2["default"].createElement("a", props);
};

Link.prototype.handleClick = function handleClick(event) {
  // .. 省略其他
  event.preventDefault();
  this.context.history.pushState(
    this.props.state,
    this.props.to,
    this.props.query
  );
};
```

可以看到 Link 组件，该组件能在 render 中使用，最终会表现为 a 标签，并将 Link 中的各个参数组合放它的 href 属性中。可以从 react-router/ Link 中看到，对该组件的点击事件进行了阻止了浏览器的默认跳转行为，而改用 history 模块的 pushState 方法去触发 url 更新。

对 history 模块的 pushState 方法对 url 的更新形式，同样分为两种，分别在 history/createBrowserHistory 及 history/createHashHistory 各自的 finishTransition 中，如 history/createBrowserHistory 中使用的是 window.history.replaceState(historyState, null, path); 而 history/createHashHistory 则使用 window.location.hash = url，调用哪个是根据我们一开始创建 history 的方式。

## 总结

可以将以上 react-router 的整个包装闭环总结为

- 触发回调：Link 点击触发 history 中回调函数数组 changeListeners 的执行，从而触发原来 listen 中的 setState 方法，更新了页面。
- 回调函数：含有能够更新 react UI 的 react setState 方法。
- 注册回调：在 Router componentWillMount 中使用 history.listen 注册的回调函数，最终放在 history 模块的 回调函数数组 changeListeners 中。

至于前进与后退的实现，是通过监听 popstate 以及 hashchange 的事件，当前进或后退 url 更新时，触发这两个事件的回调函数，回调的执行方式 Link 大致相同，最终同样更新了 UI ，这里就不再说明。

react-router 主要是利用底层 history 模块的机制，通过结合 react 的架构机制做一层包装。
