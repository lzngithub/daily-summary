# class style

## class

正常用法

```html
<div class="wrapper"></div>
<style>
.wrapper {
    font-size: 12px;
}
</style>
```

通过js动态控制class的匹配

```js
<div v-bind:class="{ active: isActive }"></div>
// 当isActive 为true时，active类名存在，可以灵活运用如下

// 对象语法
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
// 当isActive和hasError为true时，渲染为
<div class="active text-danger"></div>

// 数组语法
<div
  class="static"
  v-bind:class="[activeClass, errorClass]"
></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
// 渲染为
<div class="active text-danger"></div>

// 数组加对象语法
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
// 当isActive为true时，渲染为
<div class="active text-danger"></div>
```

## style

用法

```js
// 对象语法
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

// 数组语法，下面baseStyles和overridingStyles为响应式对象
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```


