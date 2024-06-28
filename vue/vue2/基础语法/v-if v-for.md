# v-if v-for

## v-if v-else v-if-else v-show

按照使用if...else来使用就好，关键区别v-if和v-show的区别

* v-if：如果值为false则不会渲染元素；
* v-show：会渲染元素，为false时，元素不显示。

## v-for

按照for循环来理解和使用

基本使用

```vue
<div v-for="item in items" :key="item">
    <div>{{item}}</div>
</div>
```

使用注意：

* v-for的优先级比v-if高
