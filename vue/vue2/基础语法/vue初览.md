# vue初览

## vue挂载dom方式

* 通过$el属性：

```js
vm.$el = '#app'
```

* 通过 $mount 方法

```js
vm.$mount('#app')
```

## 渲染模板方式

通过render方法

```JS
vm.render(h => h(APP))
```

一般vue项目入口文件挂载方式的写法

```JS
new Vue({
  render: h => h(App),
}).$mount('#app')
```