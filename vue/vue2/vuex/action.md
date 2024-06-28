# action

vuex 提供异步的办法，可以在里面进行异步操作

## 定义

```JS
const store = new Vuex.Store({
    actions: {
        increment(context) {
            setTimeout(() => {
                context.commit('increment')
            }, 1000)
        }
    }
})
```

定义异步操作

```JS
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

## 发起action

通过dispatch去分发

```JS
export default {
    method: {
        increment() {
            // 方式一，载荷形式分发
            this.$store.dispatch('increment', {
                count: 1,
            });
            // 方式二：对象形式分发
            this.$store.dispatch({
                type: 'increment', 
                count: 1,
            })
        }
    }
}
```

通过 辅助方法 mapActions 进行方法映射

```JS
import { mapActions } from 'vuex'

export default {
    method: {
        ...mapActions({
            increment: 'increment'
        }),
        ...mapActions(['increment'])，// 数组方式
    }
}
```

action进行数据请求

