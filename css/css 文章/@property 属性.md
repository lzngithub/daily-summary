# @property 属性

css 新特性，@Property CSS at-rule 是 CSS Houdini API 的一部分, 它允许开发者显式地定义他们的 CSS 自定义属性，允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

CSS Property 如何使用呢？我们将通过一些简单的例子快速上手，并且着重介绍它在 CSS 动画中起到的关键性的作用，对 CSS 动画带来的巨大提升。

正常而言，我们定义和使用一个 CSS 自定义属性的方法是这样的：

```css
:root {
  --color: red;
}
div {
  color: var(--color);
}
```

而有了 @property 规则之后，我们还可以像下述代码这样去定义个 CSS 自定义属性：

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #fff;
}

p {
  color: var(--property-name);
}
```
