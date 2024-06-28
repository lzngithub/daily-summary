# getter

从 state 中衍生出来的属性，类似于组件中的 computed

## 定义

```JS
const store = new Vuex.Store({
    state: {
        count: 1,
    },
    getters: {
        sum: (state, getters) => state.count + 1,
        sum1: state => count => state.count + count, // 函数方式外部可以传参
    }
})
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

## 获取

```js
import { mapGetters } from 'vuex'
export default {
    computed: {
        otherSum() {
            return this.$store.getters.sum1(1); // 通过调用方法获取
        },
        ...mapGetters({
            sum: 'sum',
        }),
        // ...mapGetters(['sum']),
    },
}
```

getter 为方法的话，没办法通过mapGetters去进行映射
