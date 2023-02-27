# TypeScript

## 遇到的问题

在 react 中使用 ts

- 使用到 jsx 语法的文件要命名为 tsx，不要有问题
- 函数式组件的定义方法

```ts
type homeProps {
    data: null,
}

const Home: React.FunctionComponent<homeProps> = (props) => {
    ...
}
```

- lodash 要安装 @types/lodash 版本的

## 安装

```bash
sudo npm i typescript -g
```

生成 ts 配置文件

```bash
tsc --init
```

编译文件

```bash
tsc 文件名
```

自动编译

```shell
tsc -w
```

## 数据类型

- 数值类型
- 布尔类型
- 字符串类型
- 数组类型
- undefined 定义类型
- null 空类型
- 元组类型
- any 任意类型：定义用户输入的时候，数组的时机比较有用
- void 空类型：只用 undefined 和 null 可以赋值给 void 类型（非严格模式，严格模式下只有 undefined）
- never 绝不存在类型，死循环函数或者返回 error 的函数的返回值类型可以用 never， 一般用作类型检查
- object 对象
- enum 枚举类型

> 在非严格模式，undefined 和 null 可以互用，还可以赋值给其他类型

```ts
let num: number = 2;
let bol: boolean = true;
let str: string = "hello world";

let arr: any[] = [1, "a", 3];
let arr: Array<any> = [1, "a", 3];

// 保存定长长度的数组和数据类型
let tup: [number, string, boolean] = [1, "string", false];

let x: undefined = undefined;
let y: null = null;
let obj: object = { a: 1, b: "2" };
```
