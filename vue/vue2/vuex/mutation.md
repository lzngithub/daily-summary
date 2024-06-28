# mutation

改变 state 的动作。

## 定义

state是响应式的，因此 state的更新方式要跟data的更新方式一样

```js
const store = new Vuex.Store({
  state:{
    obj: {}
  },
  mutations: {
    increment(state, payload) {
      state.obj = {...state.obj, newProp: payload.count}
    },
  },
});
```

## 提交

有两种方式，

```JS
export default {
    method: {
        increment() {
            // 方式一，普通提交
            this.$store.commit('increment', {
                count: 1,
            });
            // 方式二：对象方式提交
            this.$store.commit({
                type: 'increment', 
                count: 1,
            })
        }
    }
}
```

通过 辅助方法 mapMutations 进行方法映射

```JS
import { mapMutations } from 'vuex'

export default {
    method: {
        ...mapMutations({
            increment: 'increment'
        }),
        ...mapMutations(['increment'])，// 数组方式
    }
}
```

mutation 是同步方法，所以不要在里面进行异步操作

