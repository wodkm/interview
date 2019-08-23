
# React生命周期

* 目前React 16.8 +的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段

## 挂载阶段

* constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
* getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState)   ,这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
* render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容
* componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅

## 更新阶段

* getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
* shouldComponentUpdate: shouldComponentUpdate(nextProps, nextState),有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
* render: 更新阶段也会触发此生命周期
* getSnapshotBeforeUpdate: getSnapshotBeforeUpdate(prevProps, prevState),这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用
* componentDidUpdate: componentDidUpdate(prevProps, prevState, snapshot),该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态

## 卸载阶段

* componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

# React Hooks优点

* 简洁: React Hooks解决了HOC和Render Props的嵌套问题,更加简洁
* 解耦: React Hooks可以更方便地把 UI 和状态分离,做到更彻底的解耦
* 组合: Hooks 中可以引用另外的 Hooks形成新的Hooks,组合变化万千
* 函数友好: React Hooks为函数组件而生,从而解决了类组件的几大问题:

>* this 指向容易错误
>* 分割在不同声明周期中的逻辑使得代码难以理解和维护
>* 代码复用成本高（高阶组件容易使代码量剧增）

# React Hooks缺陷

* 额外的学习成本（Functional Component 与 Class Component 之间的困惑）
* 写法上有限制（不能出现在条件、循环中），并且写法限制增加了重构成本
* 破坏了PureComponent、React.memo浅比较的性能优化效果（为了取最新的props和state，每次render()都要重新创建事件处函数）
* 在闭包场景可能会引用到旧的state、props值
* 内部实现上不直观（依赖一份可变的全局状态，不再那么“纯”）
* React.memo并不能完全替代shouldComponentUpdate（因为拿不到 state change，只针对 props change）
