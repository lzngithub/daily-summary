# state

是源数据

## 定义

```JS
const store = {
    state: {
        count: 1,
    }
}
```

## 获取

组件内获取，因为已经 store 已经全局注入了，可以通过 this.$store 获取

```vue
<template>
  <div id="app">
    {{ $store.state.count }}
    <button @click="$store.commit('increment')">add</button>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
```

当组件内使用的 state 比价多的时候，一般会把 store 和 computed 进行关联。

```JS
export default {
    computed: {
        count: this.$store.state.count
    }
}
```

然后可以用辅助函数去书写，提升效率

```JS
import { mapState } from 'vuex'
export default {
    computed: {
        otherComputed: 1,
        ...mapState({
            count: state => state.count,
            count1: 'count', // 等哦同于 state.count
            count2(state) {
                return state.count + 1
            }
        })
    }
}
```

## 修改

不能直接修改state，要通过mutation去修改，mutation后面会提到。