* 捕获和冒泡是阶段，addEventListener的第三个参数是决定该事件是在哪个阶段触发执行的。默认false，冒泡的时候触发
* 冒泡是可以被e.stopPropagation()和e.stopImmediatePropagation()阻止的
* 事件捕获是不能被阻止的，但可以设置事件不在捕获阶段触发就可以了
* 事件监听 addEventListener，移除事件监听removeEventListener

事件冒泡应用

1. 事件代理或者说事件委托，通过在父元素上绑定事件，利用冒泡去触发做相应的逻辑。