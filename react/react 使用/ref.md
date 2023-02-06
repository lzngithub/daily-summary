# Refs

Refs 在计算机中称为弹性文件系统（英语：Resilient File System，简称 ReFS）

React 中的 Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素

本质为 ReactDOM.render()返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染 dom 则返回的是具体的 dom 节点

## 创建 refs

主要有四种形式

1.字符串形式（已经废弃）

```js
class App extends React.Component {
  componentDidMount() {
    console.log(this.refs.btn); // <button>React</button>
  }
  render() {
    return (
      <div className="App">
        <button ref={"btn"}>React</button>
      </div>
    );
  }
}
```

2.函数形式（用的比较少）

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.refdom = null;
  }
  componentDidMount() {
    console.log(this.refdom); // <button>React</button>
  }
  render() {
    return (
      <div className="App">
        <button ref={(e) => (this.refdom = e)}>React</button>
      </div>
    );
  }
}
```

3.对象形式（class component 常用）

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.refdom = React.createRef();
  }
  componentDidMount() {
    console.log(this.refdom.current); // <button>React</button>
  }
  render() {
    return (
      <div className="App">
        <button ref={this.refdom}>React</button>
      </div>
    );
  }
}
```

4.hook 形式(function component 常用)

```js
function App() {
  const refdom = useRef();
  useEffect(() => {
    console.log(refdom.current); // <button>React</button>
  });
  return (
    <div className="App">
      <button ref={refdom}>React</button>
    </div>
  );
}
```

## 作用在不同元素上的表现表现

- HTML 元素，直接接收该 HTML 元素作为其 current 属性
- class 组件，接收组件的挂载实例作为其 current 属性
- function 组件，因为 function 组件没有实例，所以不能直接挂载，需要转化一下

## 挂在在 function 组件方法

### 1.通过 forwardRef 方法进行转发

Ref 转发将 ref 自动的通过组件传递给子组件的方法。

```js
const Child = React.forwardRef((props, ref) => {});
```

例子

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.refdom = React.createRef();
  }
  render() {
    return (
      <div className="App">
        <Child ref={this.refdom}>React</Child>
      </div>
    );
  }
}
const Child = React.forwardRef((props, ref) => {
  useEffect(() => {
    console.log(ref); // <button>React</button>
  });
  return (
    <div className="App">
      <button ref={ref}>React</button>
    </div>
  );
});
```

通过 Ref 转发就能将 ref 挂载到函数组件上了，然后再将 ref 具体挂载在某个 dom 元素上

### 2.将 ref 属性当作 props 一个属性进行传递，但是属性名不能为 ref

```js
<Child cRef={this.myRef} />;

const Child = (props) => {
  const { cRef } = props;
};
```

上面两种方法都能把 ref 挂载到 function 组件上，但并没有具体的挂载到实例或者 dom 元素上，要想拿到 function component 的实例值，可以配置 hook useImperativeHandle 使用

## useImperativeHandle

useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值

```js
useImperativeHandle(ref, createHandle, [deps]);
```

- ref：需要被赋值的 ref 对象
- createHandle：的返回值作为 ref.current 的值。
- [deps]：依赖数组，依赖发生变化重新执行 createHandle 函数

使用例子：

```js
const Child = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} />;
});
```

或者

```js
// App.js
<Child cRef={this.myRef} />;
f;
// Child.js
const Child = (props) => {
  const inputRef = useRef();
  const { cRef } = props;
  useImperativeHandle(cRef, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} />;
};
```

## 使用场景

跟 dom 相关或者数据改变不想重新 render 的相关场景都可以使用到。

- dom 操作，或者元素的宽高，dom 动画，input 的 focus 等
- function component 中保存定时器，这样清理定时器不会引起重新渲染，也不会每次渲染都生成一个新的定时器
- 后续补充······
