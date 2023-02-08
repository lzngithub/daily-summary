# hook

Hook 是 React16.8 的新特性，Hook 使你在无需修改组件结构的情况下复用状态逻辑。

为 function 组件使用

### 总览

- useState()
- useReducer()
- useContext()
- useRef()
- useImperative()
- useEffect()
- useLayoutEffect()
- useMemo()
- useCallback()

### useEffect

引入副作用，销毁函数和回调函数在 commit 阶段异步调度，在 layout 阶段完成后异步执行，不会阻塞 ui 得渲染。

### uuseLayoutEffect

引入副作用的，useLayoutEffect 会阻塞 dom 的渲染，同步执行，上一次更新的销毁函数在 commit 的 mutation 阶段执行，回调函数在在 layout 阶段执行，和 componentDidxxxx 是等价的。
