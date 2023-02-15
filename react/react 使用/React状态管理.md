# React 状态管理

## Redux

如何理解 Redux

理解 Redux 要从理解 react 出发

react 有 state 和 props，而且是单向数据流的，即数据指向向下分发，且下面不能直接改变上面的值。

react 想要做到状态共享，解决的办法是状态提升，把需要共享的 state 提升到共同的父组件中去。

子组件改变父组件 state 的办法只能是通过 onClick 触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的 state 将如何变化，再将它同样作为属性交给子组件使用。

但是这样子当项目大了之后会有性能问题且难以维护。

为了有更好的 state 管理，就需要一个库来作为更专业的顶层 state 分发给所有 React 应用，这就是 Redux，Redux 有几个概念

- store：等同于父组件中所有的 state 状态，包括 state 和回调函数
- reducer：等同于回调处理的逻辑，更新逻辑，等同于父组件中的父级方法，纯函数
- action：回调参数，纯声明式数据结构

然后再 react 项目中，会 react-redux 这个库来使用，这个库提供两个重要的方法

- Provider 是一个普通组件，可以作为顶层 app 的分发点，它只需要 store 属性就可以了。它会将 state 分发给所有被 connect 的组件，不管它在哪里，被嵌套多少层。
- connect 是真正的重点，它是一个科里化函数，意思是先接受两个参数（数据绑定 mapStateToProps 和事件绑定 mapDispatchToProps），再接受一个参数（将要绑定的组件本身）：
  - mapStateToProps：构建好 Redux 系统的时候，它会被自动初始化，但是你的 React 组件并不知道它的存在，因此你需要分拣出你需要的 Redux 状态，所以你需要绑定一个函数，它的参数是 state，简单返回你关心的几个值。
  - mapDispatchToProps：声明好的 action 作为回调，也可以被注入到组件里，就是通过这个函数，它的参数是 dispatch，通过 redux 的辅助方法 bindActionCreator 绑定所有 action 以及参数的 dispatch，就可以作为属性在组件里面作为函数简单使用了，不需要手动 dispatch。这个 mapDispatchToProps 是可选的，如果不传这个参数 redux 会简单把 dispatch 作为属性注入给组件，可以手动当做 store.dispatch 使用。这也是为什么要科里化的原因。

简单来说，整个 redux 的工作流程

1. 顶层分发状态，让 React 组件被动地渲染。
2. 监听事件，事件有权利回到所有状态顶层影响状态。

核心概念：将需要修改的 state 都存入到 store 里，发起一个 action 用来描述发生了什么，用 reducers 描述 action 如何改变 state tree 。创建 store 的时候需要传入 reducer，真正能改变 store 中数据的是 store.dispatch API。

### 简单例子

```js
import { Provider } from 'react-redux'
import { createStore  } from 'redux'

// 挂载，在最顶层分发
<Provider store={store}>
  <App />
</Provider>

//这是redux的原始state
const tiger = 10000；

//这是reducer，更新逻辑，方法体
const reducer = (state = tiger, action) => {
  switch (action.type){
    case '涨工资':
      return state += 100;
    case '扣工资':
      return state -= 100;
    default:
      return state;
  }
}
//创建 store
const store = createStore(reducer);

// Navigate.js
import { connect } from 'react-redux'

<button onClick={() => props.PayIncrease()}>increase</button>
<button onClick={() => props.PayDecrease()}>decrease</button>
<div>{props.tiger}</div>

//需要渲染什么数据
function mapStateToProps(state) {
  return {
    tiger: state
  }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {
    PayIncrease: () => dispatch({ type: '涨工资' }),
    PayDecrease: () => dispatch({ type: '扣工资' })
  }
}

const Navigate = connect(mapStateToProps, mapDispatchToProps)(NavigateUi)
export { Navigate }
```

### 模块化

1.项目入口处挂载

```js
// ./index.js
import { Provider } from "react-redux";
import store from "./store";

<Provider store={store}>
  <App />
</Provider>;
```

2.创建 store

```js
// ./store/index.js
import { createStore } from "redux";
import RootReducers from "./redux/index.js";
const store = createStore(RootReducers);
export default store;
```

3.创建 rudecer

```js
// ./store/reducer/index.js
import { combineReducers } from "redux";
import price from "./price.js";
import color from "./color.js";

let allReducers = {
  price,
  color,
};
const RootReducers = combineReducers(allReducers);

export default RootReducers;
```

```js
// .store/reducer/color.js
const init = {
  themeColor: "red",
};

const root = "color/";

const type = {
  reset: root + "reset",
  change: root + "change",
};

const color = (state = init, action) => {
  switch (action.type) {
    case type.change:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default color;
```

```js
// .store/reducer/price.js
const init = {
  price: 10,
};

const root = "price/";

const type = {
  reset: root + "reset",
  change: root + "change",
};

const color = (state = init, action) => {
  switch (action.type) {
    case type.change:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default price;
```

4.使用

```js
// 使用的组件
import { connect } from 'react-redux'

<button onClick={() => props.dispatch({type: 'color/change', payload: {themeColor: 'green'}})}>change</button>
<span style={{color: props.redux.color.themeColor}}>color</span>

const Navigate = connect((redux) =>({redux}))(NavigateUi)
```

### 加入中间件

为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？

dispatch 一个 action 之后，到达 reducer 之前，进行一些额外的操作，就需要用到 middleware。你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。
换言之，中间件都是对 store.dispatch()的增强

两个常用的中间件

- redux-thunk: 支持异步操作，dispatch 支持传函数参数了（原本的 dispatch 默认只能传一个对象参数）
- redux-logger: 打印日记

修改：

```js
// ./store/index.js
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import RootReducers from "./redux/index.js";

//创建store
const loggerMiddleware = createLogger();
let Middlewares = [thunkMiddleware];
if (process.env !== "production") Middlewares.push(loggerMiddleware);
const store = createStore(RootReducers, applyMiddleware(...Middlewares));

export default store;
```

```js
// redux-thunk 使用
<button
  onClick={() =>
    props.dispatch((dispatch) =>
      dispatch({
        type: "color/change",
        payload: {
          themeColor: "green",
        },
      })
    )
  }
>
  change
</button>
```

### 在 function Component 中使用

在 7 版本后，可以在函数组件中使用 react-redux

简单使用

```js
import { useSelector, useDispatch } from "react-redux";

// 取值
const color = useSelector((state) => ({
  themeColor: state.color.themeColor,
}));
// 触发方法
const dispatch = useDispatch();

<div>
  <button
    onClick={() =>
      dispatch({
        type: "color/change",
        payload: {
          themeColor: "green",
        },
      })
    }
    style={{ color: color.themeColor }}
  >
    change
  </button>
</div>;
```

总结：

- 单一数据源
- state 只读
- 通过 reducer 纯函数修改

> 纯函数：输入相同，输出就相同，没有副作用就是纯函数

上面三个特点保证了 redux 的状态时可预测的

## Mobx

一个非常简单的 状态管理工具，对比 Redux，Mobx 会更容易上手，更容易理解，且编写方便。

> 下面的使用是基于 mobx6 去进行使用的，不支持装饰器语法，参考：[mobx](https://www.mobxjs.com/)

mobx 可以有多个 store，是相互独立的，一个 store 对应一个类实例，mobx 有三个核心概念

- state: 存储值得地方，对应实例的属性
- action：改变值得方法，对用实例的方法
- computed: 计算属性，对用实例的 get 方法

### 基础使用

安装依赖，搭配 react 使用要安装 mobx-react

```js
yarn add mobx mobx-react
```

新建一个 ./store/counter.js

```js
import { makeObservable, observable, action, computed } from "mobx";

class Counter {
  constructor() {
    // makeObservable 将数据变成可观察的
    makeObservable(this, {
      count: observable, // observable：可观察属性
      double: computed, // computed：计算属性
      change: action.bound, // action: action方法，bound属性 绑定this
    });
  }
  count = 0;
  get double() {
    return this.count * 2;
  }
  change() {
    this.count++;
  }
}

const counter = new Counter();
export default counter; // 要返回实例，不能直接返回类
```

组件中使用

```js
import { observer } from "mobx-react";
import counter from "./store/counter"; // 导入进来直接用就行

function App(props) {
  return (
    <div>
      <button onClick={counter.change}>change</button>
      <span>{counter.count}</span>
      <span>{counter.double}</span>
    </div>
  );
}

export default observer(App); // observer高阶方法，包裹产生联系
```

上面就是一个基本使用的例子，接下来重点说一个 makeObservable 这个方法，需要一个个属性绑定哪些属性是可观察的，这个时候可以替换为使用 makeAutoObservable 方法进行中自动绑定

### makeAutoObservable

```js
import { makeAutoObservable } from "mobx";

constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
```

autoBind: 绑定 this 为实例

### 监听属性

1.autorun 函数，参数接受一个函数，创建时会运行一次，里面使用值得改变得时候也会触发

```js
import { autorun } from "mobx";

autorun(() => {
  console.log(counter.count);
});
```

2.reaction 方法，创建时不执行，变化的时候才执行，可以精确到某一个属性

```js
import { reaction } from "mobx";

reaction(
  () => counter.count,
  (count, oldCount) => {
    console.log(count, oldCount);
  }
);
```

### 处理异步

mobx 可以直接处理异步，可观察对象是可变的，

在 action 中保持对 state 的引用一般是安全的，因此对 state 的修改不是在 action 中话，可以修改，但会有警告

例如：

```js
change() {
  setTimeout(() => {
    this.count ++;
  })
}
```

像上面这样修改时能成功，但会报警告，因为 count 不是直接在 action 方法中修改的，是在定时器的回调函数中执行的，对于这种情况有三种方式可以解决

- 方法，通过配置消除警告（不推荐）

```js
// ./store/counter.js
import { configure } from "mobx";

configure({
  enforceActions: "never", // 默认为 'observed'
});
```

- 将异步代码拆分成两个方法

```js
change() {
  // 改变state的动作放这里，这样state的改变就是在action里了
  this.count ++;
}

asyncChange() {
  // 异步逻辑放这里
  setTimeout(this.change)
}
```

- 利用 runInAction 方法也可以

```js
change() {
    setTimeout(() => {
      runInAction(() => {
        this.count++; // 将改变state的动作放在runInAction的回调函数中
      });
    });
  }
```

### 模块化

新建一个 ./store/user.js

```js
import { makeObservable, observable } from "mobx";

class User {
  constructor() {
    makeObservable(this, {
      name: observable,
    });
  }
  name = "liangzn";
}

const user = new User();

export default user;
```

新建一个 ./store/index.js

```js
import user from "./user";
import counter from "./counter";
import { useContext, createContext } from "react";

class Store {
  user = user;
  counter = counter;
}

const Context = createContext(new Store());

export const useStore = function () {
  return useContext(Context);
};
```

使用

```js
import { observer } from "mobx-react";
import { useStore } from "./store";

function App(props) {
  const { counter, user } = useStore();
  return (
    <div>
      <button onClick={counter.change}>change</button>
      <span>{counter.count}</span>
      <span>{counter.double}</span>
      <div>{user.name}</div>
    </div>
  );
}

export default observer(App);
```

## useContext 和 useReducer

这种方案是使用于 hook 同时项目是比较简单的，通过 useContext 和 useReducer 做全局状态管理

### 基本使用

```js
import React, { useReducer } from "react";

const UserContext = React.createContext(null);

const init = {
  name: "liangzn",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};

const UserContextComponent = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, init);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser必须在UserContextComponent中使用");
  }
  return context;
};

export { useUser, UserContextComponent };
```

挂载

```js
import { UserContextComponent } from "./context/index.js";

<React.StrictMode>
  <UserContextComponent>
    <App />
  </UserContextComponent>
</React.StrictMode>;
```

使用

```js
import { useUser } from "./context/index";

const { user, dispatch } = useUser();

<button onClick={() => dispatch({ type: "change", payload: { name: "li" } })}>
  {user.name}
</button>;
```

### 总结

使用起来很方便，但当数据太多的时候，怎么拆分数据和嵌套组件比较耗费精力
