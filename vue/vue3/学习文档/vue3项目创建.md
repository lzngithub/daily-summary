# vue3 创建

## 创建命令

[官方网址](https://cn.vuejs.org/guide/quick-start.html)

```shell
npm create vue@latest
```

这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。

## 项目目录介绍

### env.d.ts

因为 ts 不认识 ts 文件之外的文件，需要声明之后才认识，所以这个文件里面饮入了 vite 写好的一些声明文件，不用开发者自己去声明。
