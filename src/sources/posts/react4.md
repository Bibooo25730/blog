---
title: "useOptimistice useReducer useRef seSyncExternalStore"
date: "2025-12-08 00:57:57"
categories:
  - React
---

# useOptimistic

useOptimistic 是一个 React Hook，它能让应用在等待服务器响应时（比如网络请求），提前显示一个预计成功的结果。这可以让用户立即获得反馈，极大提升应用的响应速度和交互体验。

```

方面	在 React 中	在 Next.js 中 (App Router)
核心用途	用于任何异步操作（如 fetch）前的乐观更新。	与 Server Actions（服务端动作） 结合，优化表单提交等数据变更操作。
异步操作载体	通常为客户端触发的普通异步函数。	通常是标记了 ‘use server’ 的 Server Action 函数。
状态与数据同步	需要在成功回调中手动更新真实状态。	Server Action 执行后，可配合 revalidatePath 等自动刷新服务端数据，使界面最终状态与数据库一致。
典型场景	点赞、关注等社交互动；客户端评论列表更新。	服务端表单提交（如新增待办事项、发送消息）。
```

## ⚠️ 使用注意事项与最佳实践

处理失败情况：乐观更新假设成功，但网络可能失败。你需要额外处理错误状态，例如在 catch 块中提示用户并回退乐观状态。

使用 startTransition：用 startTransition 包裹实际的异步操作（如 Server Action 调用），可以避免阻塞用户界面，保持交互流畅。

保持更新函数纯函数：计算乐观状态的函数必须是一个纯函数，只依赖输入参数，不产生副作用。

## useReducer

useReducer 是 React 中用于管理复杂组件状态的核心 Hook。它通过集中化的“状态-动作”逻辑，特别适合处理包含多个子值或下一个状态依赖于之前状态的情况。

### 核心三要素

```

要素	说明
State (状态)	组件当前的数据快照。
Action (动作)	一个描述“发生了什么”的普通对象。通常有 type 字段和可选的 payload（携带的数据）。
Reducer (归约器)	一个纯函数，它接收当前的 state 和一个 action，并返回新的 state。其逻辑为：(state, action) => newState。
Dispatch (派发)	useReducer 返回的函数，用于“派发”一个 action 来触发状态更新，即：dispatch(action)。
```

### useReducer vs useState：如何选择？

```

维度	useState	useReducer
适用场景	独立、简单的状态（如布尔值、字符串）。	相互关联的复杂状态（如表单、多步骤流程、列表增删改查）。
状态逻辑	更新逻辑分散在各个事件处理函数中。	更新逻辑集中在 reducer 函数中，易于维护和测试。
可读性与维护性	状态简单时直观。状态复杂后，更新逻辑可能变得冗长且分散。	通过 action.type 清晰地描述状态变更意图，逻辑集中，更易于调试。
```

### ⚠️ 重要原则与进阶

1. 保持 Reducer 纯净：reducer 必须是纯函数，不能有副作用（如 API 调用），应只用于计算下一个状态。

2. 在 Next.js 中使用：在 App Router 中，包含 useReducer 的组件必须在文件顶部添加 ‘use client’ 指令，因为它是一个客户端 Hook。

3. 结合 Context：useReducer 常与 useContext 结合，通过 Context 将 state 和 dispatch 提供给深层子组件，实现跨组件状态管理（一种轻量版的 Redux）。

4. 使用 Immer 简化：处理深层嵌套状态时，更新逻辑可能很繁琐。可以使用 useImmerReducer (来自 use-immer 库) 来“可变地”更新状态。

### 总结

当你的组件状态逻辑变得复杂，包含多个子值，或者下一个状态强烈依赖于前一个状态时，useReducer 是比 useState 更优越的方案。它通过集中化的逻辑和清晰的“动作派发”模式，让代码更可预测、更易于维护和测试。

如果你正在构建一个复杂的表单、一个多步骤的向导或者一个游戏，useReducer 会是一个得力的工具。如果你想了解它与 useContext 结合实现全局状态管理的具体模式，我可以为你进一步解释。

# useRef
是 React 中一个非常核心的 Hook，它主要提供了一种在组件的多次渲染之间持久化存储可变值，并且更改这个值不会触发组件重新渲染的能力。

### 🎯 useRef 的核心特性

1. 持久化：在组件的整个生命周期中，这个“盒子” (ref 对象) 始终是同一个。

2. 非响应式：你改变盒子里的东西 (current 属性)，不会导致组件重新渲染。

####  useRef vs useState：关键区别

```
特性	useRef	useState
触发渲染	否。修改 .current 值不会触发组件重新渲染。	是。每次 setState 都会触发组件重新渲染。
可变性	ref.current 是可变的，可以直接读写。	State 是不可变的，必须通过 setState 函数来更新。
主要用途	1. 操作 DOM 元素
2. 存储与渲染无关的可变值（如计时器 ID）
3. 保存上一次渲染的值	存储直接影响组件渲染输出的数据。
值在渲染间的持久性	持久。ref 对象本身在每次渲染中都指向同一个引用。	变化。每次渲染都获取当前最新的 state 快照。
```

#### 重要事项

不要在渲染期间读写 ref.current：除了初始化，应在事件处理程序或副作用（useEffect） 中修改 ref，以避免不可预测的渲染行为。

在 Next.js 中使用：useRef 是客户端 Hook。在 App Router 的组件中使用时，需确保该组件是 Client Component（文件顶部添加 ‘use client’ 指令）。

与 forwardRef 结合：当你想将子组件的 DOM ref 暴露给父组件时，需要配合 React.forwardRef 使用。

#### 总结

如果你需要存储一个值，这个值的改变需要触发重新渲染 -> 使用 useState。

如果你需要存储一个值，它只是幕后的“记录员”或“操作手柄”，改变时不应触发渲染 -> 使用 useRef。

useRef 是连接 React 的声明式世界与命令式 DOM 操作及其他可变数据的关键桥梁。

### useSyncExternalStore

useSyncExternalStore 是一个React 18引入的、用于让React组件安全地“订阅”并同步React外部数据源变化的Hook。

### 🛠️ 典型使用场景

理解了这个Hook的核心，我们再看看具体怎么用。它的两个主要应用方向是：集成第三方状态库，和订阅浏览器API。

订阅浏览器API（实用场景）
浏览器API（如网络状态、地理位置、窗口尺寸）的值会在React不知情时变化，非常适合用useSyncExternalStore来同步

#### ⚠️ 重要注意事项

使用此Hook时有几个关键点需要留意：

getSnapshot必须返回不可变值：每次调用应返回相同引用，除非数据真的变了。返回新对象或数组字面量会导致无限重渲染。

subscribe函数的稳定性：应将subscribe函数定义在组件外部或用useCallback包裹，避免每次渲染都创建新函数，导致频繁重新订阅。

应用开发者慎用：官方建议，除非需要与现有非React代码集成，否则应优先使用useState和useReducer。日常开发中更多是间接使用它（通过状态库），而非直接调用。



