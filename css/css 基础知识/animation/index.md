# animation

## 语法

绑定动画：animation: animatin-name,

- animatin-name: 动画名称
- animation-duration: 动画持续时间
- animation-timing-function: 动画如何完成一个周期
- animation-fill-mode: 规定当动画不播放时要应用到元素的样式。
- animation-delay: 动画启动前的延迟间隔
- animation-iteration-count: 动画播放次数；n 或者 infinite
- animation-direction: 动画播放的方向
- animation-play-state: 动画暂停还是运行：paused 或者 running

## animation-timing-function

参考 MDN：https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function

有下面几个值

animation-timing-function：主要是由两个函数控制的，steps()和 cubic-bezier()函数，steps 函数的跳跃式的，就是没有过渡，cubic-bezier()函数会在你定义的关键帧之间补帧成为流畅的动画。

- steps(number，position): 两个参数，第一个参数为正整数，表示你定义的两个关键帧之间分为多少份，position 为可选，值为 start 或者 end,start 表示第一帧会被立即执行，直接从第二帧开始，表现形式为第一帧被忽略，end 表示从最后一帧会被立即执行，马上衔接第一帧，表现形式式最后一帧会被忽略。

- cubic-bezier(x1, y1, x2, y2): 三次贝塞尔曲线，ease 和 linear 都是它的特殊值，可以通过浏览器去调整其的速度。

- ease: 默认值，有过渡效果，以低俗开始，然后加快，结束前变慢
- linear: 有过渡效果，匀速
- ease-in: 有过渡效果，低俗开始
- ease-out: 有过渡效果，低俗结束
- ease-in-out: 有过渡效果，低俗开始和结束

- step-start: 没有过渡效果，相当于 steps(1, start)
- step-end: 没有过渡效果，相当于 steps(1, end)

# animation-fill-mode

默认情况下，CSS 动画在第一个关键帧播放完之前不会影响元素，在最后一个关键帧完成后停止影响元素。animation-fill-mode 属性可重写该行为。

- none: 默认不运用
- forwards: 应用结束时的样式
- backwards: 应用开始时的样式
- both: 都运用

## animation-direction

动画播放的方向

- normal: 默认，正向
- reverse: 反向
- alternate: 1，3，5，···，正向；2，4，6，···，反向
- alternate-reverse: 1，3，5，···，反向；2，4，6，···，正向
