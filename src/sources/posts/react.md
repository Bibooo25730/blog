---
title: "state,context,ref"
date: "2023-12-07 06:57:57"
categories:
  - React
---

**复习一下 react 文档，有点时间没写前端了，其实再怎么变也万变不离其宗**

# 使用 Hook 
Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 顶层 调用 Hook。如果你想在一个条件或循环中使用 useState，请提取一个新的组件并在组件内部使用它

## useState 

你将从 useState 中获得两样东西：当前的 state（count），以及用于更新它的函数（setCount）。  



### 在纯 React 中特有的注意事项 

#### 状态提升

1.状态提升 (Lifting State Up)
当多个组件需要共享同一状态时，必须将状态提升到它们最近的共同父组件，然后通过 props 向下传递。这是纯 React 架构设计的关键。

2.复杂状态管理
当多个互相关联的 useState 变得难以维护时，应考虑：

使用 useReducer 管理复杂状态逻辑。

引入外部状态管理库（如 Zustand、Redux Toolkit）。

3.性能优化
useState 的每次 setState 都会触发重新渲染。对于复杂对象/数组，需注意：

避免在渲染函数中直接创建新对象导致不必要的子组件重渲染。

考虑使用 useMemo、useCallback 进行优化。

#### 在 Next.js 中的核心特点

纯客户端：只能在使用了 'use client' 指令的客户端组件中使用。

即时性与独立性：状态变更只影响当前浏览器会话，刷新页面即重置，不直接持久化。

驱动交互：是构建动态、响应式 UI（如开关、表单输入、临时弹窗）的基础工具。

```

特性维度	useState （客户端状态）	服务端获取的数据（Props）
运行环境	仅在浏览器中	在服务器上（Node.js 环境）
生命周期	随组件挂载而创建，刷新页面丢失	每次页面请求时获取，可持久化在数据库
典型用途	表单输入值、开关状态、临时UI状态（如isModalOpen）	用户列表、产品目录、博客文章内容
如何更新	调用 setState 函数触发重新渲染	重新向服务器发起请求（或使用路由）
初始化来源	可以是固定值，也可以来源于服务端数据（Props）	来自数据库、API 或其他后端服务
```

## 🚨 常见误区与最佳实践

1. 误区：用 useState 存储应从服务端获取的数据

错误做法：在 useEffect 里用 useState 存从API fetch的用户列表。

正确做法：直接在服务端组件获取数据，通过props传递。对于需要缓存、轮询等复杂场景，应使用 TanStack Query 等专用库。

最佳实践：区分“源数据”与“编辑草稿”

将服务端传来的数据视为唯一数据源。

2. 使用 useState 创建一个用于 UI 交互的临时副本，在用户确认保存后再提交回服务器

最佳实践：区分“源数据”与“编辑草稿”

将服务端传来的数据视为唯一数据源。

使用 useState 创建一个用于 UI 交互的临时副本，在用户确认保存后再提交回服务器。

3. 牢记：useState 的初始化只在组件首次挂载时执行

即使父组件传递的 initialUserData props 变化了，useState(initialUserData) 也不会重新初始化。如需同步，必须配合 useEffect。

# 💎 总结
在纯 React 中，你可以将 useState 理解为 应用的“心脏”——几乎所有动态数据都从这里泵出，流经整个组件树。而在 Next.js 中，useState 更像是一个 “辅助工具”，专门用来处理服务端管不到的、浏览器内的即时交互。

## Context Hook

在 Next.js 中，Context 是一个核心机制，用于在组件树中无需逐层显式传递（Prop Drilling） 地共享“全局”数据（如主题、用户信息、语言偏好）。

它的核心心智模型是：创建一个可以被树中任意下级组件“订阅”的数据层。

#### 🎯 Context 的核心用途与特点

解决什么问题：避免通过多层组件手动传递 Props（即 “Prop Drilling”），使深层子组件能直接访问所需数据。

不是什么：

不是状态管理库（如 Redux、Zustand）的完全替代品。它不擅长处理高频更新的复杂状态。

不是数据库。它存储的是运行时、客户端的状态，刷新页面会重置（除非你自行持久化）。

典型场景：应用主题、用户认证信息、全局弹窗控制、多语言。

## ⚖️ 纯 React vs. Next.js 中使用 Context 的关键区别

理解 Next.js 中 App Router 引入的服务端组件和客户端组件的界限，是正确使用 Context 的关键。
```
特性维度	纯 React （客户端应用）	Next.js （App Router）
创建位置	可在应用任何位置创建，通常在顶级。	必须在客户端组件中创建和使用（因为使用了 createContext, useContext 等 React API）。
提供者（{/* Provider */}位置	通常包裹整个 <App />。	只能包裹客户端组件或其子树，无法直接包裹服务端组件。
可共享的数据	任何 JavaScript 值。	主要是客户端状态。若需共享服务端数据，需先通过 Props 传递给客户端组件，再注入 Context。
与渲染策略的互动	无此概念，所有组件都在客户端渲染。	需谨慎设计，避免因 Context 值变化导致不必要的服务端组件子树重新渲染。
```

## 🚨 重要注意事项
“use client” 指令：创建 Context 和消费 Context 的组件文件顶部必须添加 'use client';，这是 Next.js 的硬性规定。

{/* Provider */} 无法包裹服务端组件：你不能用 {/* Provider */}直接包裹一个标记为服务端组件或默认的服务端组件。但可以包裹 {children}，只要这些 children 在最终渲染时是客户端组件。

默认值的局限：createContext(defaultValue) 中的 defaultValue 仅在消费组件找不到匹配的 {/* Provider */} 时生效。在 Next.js 混合渲染环境下，服务端组件无法使用 useContext，因此这个默认值主要是为客户端组件提供的安全后备。

性能考虑：Context 的 value 发生变化时，所有订阅了该 Context 的组件都会重新渲染。对于频繁更新的状态（如表单输入），建议使用状态管理库或组合更细粒度的 Context。

# 💎 总结与建议
何时用：在 Next.js 中需要共享跨客户端组件、更新不频繁的全局状态时（如 UI 主题、用户身份）。

何时不用：

需要共享服务端原始数据（应使用 Props 或数据获取库）。

需要管理极其复杂或高频更新的状态（应考虑 Zustand 等库）。

仅限父子组件通信（直接使用 Props 更简单）。

# 在 react 中

# 🎯 核心定位与特点
解决的问题：与 Next.js 一样，用于解决 “Prop Drilling”（层层传递 props）的问题，让深层子组件能直接获取所需数据。

数据范围：存储应用级的运行时状态（如主题、用户信息、全局配置）。刷新页面状态会重置，除非配合 localStorage 持久化。

典型场景：主题切换、用户登录状态、多语言、全局弹窗控制。

```

特性维度	纯 React（客户端应用）	Next.js（App Router）
创建与使用	在任何组件文件中直接使用 createContext, useContext，无需 ‘use client’ 指令。	所有涉及 Context 的文件必须在顶部添加 ‘use client’ 指令。
 
 {/* Provider */}的放置	通常直接包裹整个 <App /> 组件，没有任何限制。	{/* Provider */} 只能包裹客户端组件或其子树，无法直接包裹服务端组件。
数据来源	数据通常来自客户端状态（如 useState）或客户端异步获取（useEffect + fetch）。	常需将服务端获取的数据通过 Props 先“注入”到客户端组件，再放入 Context。
心智模型	“在纯粹的客户端树中共享状态”。	“跨越客户端边界的共享状态，需注意服务端与客户端的鸿沟”。
1
```

# 🚨 重要注意事项与最佳实践
性能优化：

Context 的 value 发生变化时，所有使用了 useContext 的组件都会重新渲染，即使它只消费了 value 的一部分。

优化策略：将不同领域的 Context 拆分开（如 UserContext, UIContext），或对频繁更新的部分使用状态管理库。

{/* Provider */} 的 value 属性：

务必避免每次渲染都创建一个新的对象，这会导致不必要的子组件重渲染。

推荐做法：使用 useMemo 缓存 value 对象。

不是万能解药：

对于简单的父子组件通信，使用 Props 更直接。

对于非常复杂、高频更新的全局状态（如大型应用的表单状态、实时数据），考虑使用 Zustand 或 Redux Toolkit 等专门的状态管理库。


# 总结 

在纯 React 中使用 Context，你可以把它理解为一个内置于 React 的、轻量级的“全局状态事件总线”。

整个过程都在客户端完成，没有环境边界，心智模型更简单，是解决跨组件状态共享的首选内置方案。但当应用变得非常复杂时，需要注意其性能特点并进行合理优化。


# useRef

在 React 和 Next.js 中，useRef Hook 的核心心智模型是 “一个贯穿组件生命周期的、可变的‘盒子’或‘引用’”。它主要用于直接操作 DOM 元素和保存一个在渲染周期中持久存在且变更不会触发重新渲染的可变值。

## 🎯 useRef 的两种核心用途

```

用途	描述	典型场景
1. 访问/操作 DOM 元素	获取一个真实的 DOM 节点（如 <input>、<div>）的引用，以便直接调用其原生方法。	输入框自动聚焦 (inputRef.current.focus())、测量元素尺寸、集成第三方 DOM 库。
2. 保存可变值	在组件的整个生命周期内保存一个可变值（类似实例变量），其变化不会触发组件重新渲染。	存储定时器 ID (setTimeout)、保存上一次渲染的值用于比较、保存任何不需要触发渲染的中间状态。

```

## ⚖️ 纯 React vs. Next.js 中使用 useRef 的关键差异

```

特性维度	纯 React（客户端应用）	Next.js（支持 SSR）
访问时机	通常在 useEffect 或事件处理函数中访问 ref.current，但即使直接访问（如在渲染函数中）也不会因环境报错，因为没有 SSR 阶段。	在服务端渲染期间，ref.current 为 null 或初始值。必须在 useEffect、useLayoutEffect 或客户端事件中访问 DOM 节点，否则会报错。
心智模型	“操作浏览器中的 DOM”。	“操作浏览器中的 DOM，但要绕过服务端渲染阶段”。
典型模式	更直接，对访问时机的要求相对宽松。	必须将 DOM 操作包裹在 useEffect 或事件回调中，以确保代码在客户端执行。

```

## 🚨 重要注意事项
```
.current 属性的可变性：你可以直接修改 ref.current 的值。与 state 不同，修改 `.current 不会触发组件的重新渲染。

初始化开销：useRef(initialValue) 的初始值仅在首次渲染时被使用，后续渲染会返回同一个 ref 对象。

ref 与 useEffect 的依赖项：ref.current 是一个可变值，不应被列入 useEffect 的依赖数组中，因为修改它不会触发 useEffect 的重新执行。如果逻辑依赖当前 ref 值，通常使用回调 ref 或将其提升至 state。

服务端渲染下的 null：在 Next.js 的服务端渲染期间，所有关联 DOM 的 ref.current 都为 null。这是预期行为，也是为什么必须在 useEffect 中访问它的根本原因。
```
## 💎 总结
```
本质：useRef 是一个用于持有可变引用的工具。

不变性：它返回的 ref 对象本身在组件的整个生命周期中是稳定不变的（{ current: ... }）。

跨环境一致性：其核心 API 在纯 React 和 Next.js 中完全一致。

Next.js 关键点：在 Next.js 中，任何对 ref.current（DOM节点）的直接操作，都必须放置在 useEffect、useLayoutEffect 或事件处理函数中，以确保在客户端执行。
```

简单来说，无论在哪，当你需要“跳出”React的声明式范式，去直接接触一个不会因自身变化而触发视图更新的持久化值或真实的 DOM 节点时，useRef 就是你的工具。在 Next.js 中，只需额外注意将 DOM 操作安全地放在客户端生命周期钩子中即可






