# TypeScript

## 遇到的问题

在react中使用ts

* 使用到jsx语法的文件要命名为tsx，不要有问题
* 函数式组件的定义方法
```ts
type homeProps {
    data: null,
}

const Home: React.FunctionComponent<homeProps> = (props) => {
    ...
}
```
* lodash 要安装 @types/lodash 版本的