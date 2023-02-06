# react 生命周期和 hook

生命周期针对的是类组件，函数式组件没有生命周期，但有一些 hook 去弥补缺失生命周期的部分功能

## 类组件生命周期

### 总览

挂载阶段：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

更新阶段：

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

卸载阶段：

- componentWillUnmout()

错误处理：

- static getDerivedStateFromError()
- componentDidCatch()

即将废弃的生命周期，避免使用

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

新增周期：

- static getDerivedStateFromProps
- getSnapshotBeforeUpdate

### 挂载阶段

#### constructor()

- 组件的构造函数，在其内部需要调用 super(props)，不然会报错
- 会在首次挂载前执行
- 不要在里面调用 setState()方法，直接用 this.state 赋值就可以。
- 避免在构造函数中引入任何副作用或订阅

#### static getDerivedStateFromProps(nextProps, prevState)

- 静态方法，无法通过 this 访问实例属性
- 作用为组件在 props 发生改变时更新它自身的内部 state
- 在挂载和更新阶段都会执行

用法

```js
static getDerivedStateFromProps(nextProps, prevState) {
  const {type} = nextProps;
  // 当传入的type发生变化的时候，更新state
  if (type !== prevState.type) {
      return {
        type,
      };
  }
  // 否则，对于state不进行任何操作, 依然会发生渲染，只是state不做更新而已
  return null;
}

```

#### render()

- 发生在 render 阶段
- 是 class 组件中唯一必须实现的方法
- 应该为纯函数
- 如果 shouldComponentUpdate()返回 false，则不会调用 render()

返回值

- React 元素，通常通过 JSX 创建
- 数组或者 fragments,但数组不能包含对象（不过一般也不会单纯返回数组和对象，基本很少用到）
- Portals
- 字符串或数值类型，会被渲染成文本节点
- 布尔值或 null，什么都不渲染

#### componentDidMount()

- 会在组件挂载后（插入 DOM 树中）立即调用，在 commit 阶段的 layout 阶段同步执行，会阻塞页面渲染
- 在这里调用 setState()会触发额外渲染，但这渲染会发生在浏览器更新屏幕之前，所以即使调用了两次 render(),但是只会发生一次屏幕更新。
- 等同于 useLayoutEffect hook

### 更新阶段

#### shouldComponentUpdate(nextProps， nextState)

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染，优化的一种手段，当你想要某一个 state 变化不会触发更新的时候可以用这个方法。

- 在 render()之前调用
- 首次渲染或使用 forceUpdate() 时不会调用该方法。
- 返回 false 并不会阻止子组件的正常行为，比如说渲染

#### getSnapshotBeforeUpdate(prevProps, prevState)

- 在最近一次渲染输出（在 before mutation 中）之前调用，界面还没有更新，一般用作 UI 处理
- 此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。

```js
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      height: 250,
    };
    this.listRef = createRef();
  }
  getSnapshotBeforeUpdate() {
    console.log(this.listRef.current.scrollHeight, 666);
    return null;
  }
  componentDidUpdate() {
    console.log(this.listRef.current.scrollHeight, 777);
  }
  change = () => {
    this.setState({
      height: 500,
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <div ref={this.listRef} style={{ height: this.state.height }}>
          {this.state.height}
        </div>
        <button onClick={this.change}>change</button>
      </div>
    );
  }
}
```

#### componentDidUpdate(prevProps, prevState, snapshot)

- snapshot：接受 getSnapshotBeforeUpdate（）的返回值
- 在屏幕更新后调用，在 commit 阶段的 layout 阶段同步执行。
- 在 componentDidUpdate 中改变 state 应该是有条件的，不然会死循环
- 可以在此处对比更新前后的 props 和 state

### 卸载阶段

#### componentWillUnmount()

- 会在组件卸载及销毁之前直接调用

### 错误处理

#### static getDerivedStateFromError(error)

- 此生命周期会在后代组件抛出错误后被调用
- 它将抛出的错误作为参数，并返回一个值以更新 state
- 在渲染阶段调用，不允许出现副作用

#### componentDidCatch(error, info)

- 此生命周期在后代组件抛出错误后被调用
- 在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况

## 函数组件 hook

### useEffect

引入副作用，销毁函数和回调函数在 commit 阶段异步调度，在 layout 阶段完成后异步执行，不会阻塞 ui 得渲染。

### uuseLayoutEffect

引入副作用的，useLayoutEffect 会阻塞 dom 的渲染，同步执行，上一次更新的销毁函数在 commit 的 mutation 阶段执行，回调函数在在 layout 阶段执行，和 componentDidxxxx 是等价的。
