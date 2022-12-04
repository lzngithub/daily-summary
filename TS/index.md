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

## 安装

```bash
sudo npm i typescript -g
```

生成ts配置文件

```bash
tsc --init
```

编译文件

```bash
tsc 文件名
```

## 数据类型

* 数值类型
* 布尔类型
* 字符串类型
* 数组类型
* 元组类型

```ts
let num: number = 2
let bol: boolean = true
let str: string = 'hello world'

let arr: any[] = [1, 'a', 3]
let arr: Array<any> = [1, 'a', 3]

// 保存定长长度的数组和数据类型
let tup:[number, string, boolean] = [1, 'string', false]
```