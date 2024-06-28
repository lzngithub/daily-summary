# 基础语法

## data

一般data对象都是一个function返回对象的原因？

主要为了组件每次调用实例化的时候生成的data都是一个新的对象，不会相互影响。

## 计算属性

1. 用于从响应式数据中经过复杂逻辑处理得出来的值，用计算属性进行代替；
2. 具有缓存特性，当依赖的响应式数据不变的时候，setter函数则不会重新执行；
3. 不能在计算属性中执行异步操作。

用法：

```js
computed: {
    computedName: {
        get : function() {
            return 'a';
        },
        set: function(value) {

        }
    }
}

// 简写
computed: {
    computedName() {
        return  'a';
    }
}
```

## 监听属性

watch

1. 用于监听响应式数据，执行逻辑操作；
2. 可以执行异步操作；
3. 监听对象类型（不包括数组），监听对象深层需要设置deep为true

用法：

```js
watch: {
    a: {
        hanlder(newValue, oldValue) {
            // 当 a 进行改变，需要执行的逻辑操作。
        },
        deep: true, // 深度监听，默认不深度监听
        immediate: true, // 初始化就监听，执行对应的逻辑，默认首次不监听执行
    }
}

// 下面简写模式
watch: {
    a(newValue, oldValue) {
        // 当 a 进行改变，需要执行的逻辑操作。
    },
}

// api写法
var = unwatch = vm.$watch('a.b.c', callback(newValue, oldValue) {
    // 当 a.b.c 的值进行改变，需要执行的逻辑操作。
}， {
    deep: true,
    immediate: true,
})
// 之后取消观察
unwatch()
```

使用注意事项：

* 当immediate为true时，第一次回调时取消侦听给定的 property

## 初始化顺序

都在created钩子函数前：props -> data -> computed -> watch