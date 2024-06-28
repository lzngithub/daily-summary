# props

数组形式，不能进行props校验

```js
props: ['a', 'b']
```

对象形式，可以进行校验

```js
props: {
    a: string,
    b: number,
}
```

还可以进行多值选择和添加默认值

```js
props: {
    a: [string, number],
    b: {
        type: String,
        required: true,
        default: '100',
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
}
```
