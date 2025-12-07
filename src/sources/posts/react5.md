---
title: "组件"
date: "2025-12-08 01:57:57"
categories:
  - React
---

复习一下，hooks 并没有精细，因为我打算用 next 。

```
<Fragment> (<>...</>)
<Fragment> 通常使用 <>...</> 代替，它们都允许你在不添加额外节点的情况下将子元素组合。

```

```
<Profiler>
<Profiler> 允许你编程式测量 React 树的渲染性能。

<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

```
<StrictMode>
<StrictMode> 帮助你在开发过程中尽早地发现组件中的常见错误。

<StrictMode>
  <App />
</StrictMode>
```

```
<Suspense>
<Suspense> 允许在子组件完成加载前展示后备方案。

<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```
```
<Activity> 是 React 中用于隐藏/恢复子组件 UI 及内部状态的高级组件，其核心特性与使用场景如下：

```

### 一、核心特性
1. 状态保留机制
```
不同于 {visibility && <Sidebar />} 的条件渲染（会销毁/重建组件导致状态丢失），<Activity> 通过 CSS 隐藏（如 display: none） 或 DOM 保留 技术，在隐藏时保留子组件的内部状态（如表单输入值、滚动位置、选中状态等）。
模式控制
通过 mode 属性控制行为，常见模式：
visible：正常显示子组件。
hidden：隐藏子组件但保留状态。
detached：完全卸载子组件（释放内存，但状态丢失）。
3. 性能优化
隐藏时避免触发子组件的重新渲染，减少不必要的计算和布局重排。
```

```
<ViewTransition> 是 React 18 引入的实验性 API（需通过 react@experimental 渠道启用），用于在视图切换时实现平滑的过渡动画，同时自动处理并发渲染中的状态同步问题。它结合了 CSS 视图过渡（View Transitions API）和 React 的并发特性，使页面或组件间的切换更加流畅。

```
## 内置的 React API
除了 Hooks 和 Components 之外，react 包还导出了一些其他的 API，这些 API 对于创建组件非常有用。本页面将介绍这些剩余的 React API。

1. createContext API 可以创建一个 context，你可以将其提供给子组件，通常会与 useContext 一起配合使用。
2. lazy 允许你延迟加载组件，直到该组件需要第一次被渲染。
3. memo 允许你在 props 没有变化的情况下跳过组件的重渲染。通常 useMemo 与 useCallback 会一起配合使用。
4. startTransition 允许你可以标记一个状态更新是不紧急的。类似于 useTransition。
5. act 允许你在测试中包装渲染和交互，以确保在断言之前已完成更新。


