---
title: "effect"
date: "2023-12-07 23:57:57"
categories:
  - React
---

# useEffect

在纯 React（客户端应用）中，useEffect Hook 的核心心智模型是 “将组件与外部系统同步的副作用管理器”。它是连接 React 的声明式世界与命令式外部操作（数据获取、订阅、手动 DOM 操作）的核心桥梁。

```

作用	描述	典型代码模式
1. 数据获取	在组件渲染后，从 API、数据库等外部来源获取数据并更新状态。	useEffect(() => { fetch(...).then(setData) }, [])
2. 订阅与监听	建立对浏览器事件、WebSocket、第三方库等的订阅，并在组件销毁时清理。	useEffect(() => { window.addEventListener(...); return () => { window.removeEventListener(...) } }, [])
3. 手动操作DOM	基于 React 状态执行无法通过 JSX 声明的命令式 DOM 操作。	useEffect(() => { ref.current.animate(...) }, [state])

```
## ⚖️ 纯 React vs. Next.js 中使用 useEffect 的关键差异

```

特性维度	纯 React（客户端应用）	Next.js（App Router）
数据获取的首选方式	主要依赖 useEffect。在组件挂载后，在 useEffect 中发起 fetch 请求，并用 useState 存储结果。	避免在 useEffect 中获取初始数据。优先在服务端组件中使用 async/await 直接获取，或使用 fetch 并利用 React 的扩展缓存。
心智模型	“渲染后触发”：渲染 -> 提交到DOM -> 执行 useEffect”。	“按需在客户端执行副作用”：服务端获取初始数据 -> 流式渲染 -> 客户端 useEffect 处理后续交互。”
主要用途演变	核心工具，用于数据获取、订阅、基于状态的副作用。	专业化工具，主要用于：1) 纯客户端交互（订阅、监听）；2) 依赖客户端状态或props的副作用；3) 集成第三方浏览器库。
访问浏览器API	可直接在 useEffect 中使用，因为整个应用在客户端运行。	必须在 useEffect 中使用，因为服务端渲染期间 window、document、localStorage 不存在。
与生命周期的对应	明确对应 componentDidMount、componentDidUpdate、componentWillUnmount。	概念相同，但“挂载”在混合渲染中更复杂（需要考虑注水完成）。

```
# ⚖️ 纯 React vs. Next.js 中使用 useEffect 的关键差异

```
特性维度	纯 React（客户端应用）	Next.js（App Router）
数据获取的首选方式	主要依赖 useEffect。在组件挂载后，在 useEffect 中发起 fetch 请求，并用 useState 存储结果。	避免在 useEffect 中获取初始数据。优先在服务端组件中使用 async/await 直接获取，或使用 fetch 并利用 React 的扩展缓存。
心智模型	“渲染后触发”：渲染 -> 提交到DOM -> 执行 useEffect”。	“按需在客户端执行副作用”：服务端获取初始数据 -> 流式渲染 -> 客户端 useEffect 处理后续交互。”

```
```

特性维度	纯 React（客户端应用）	Next.js（App Router）
数据获取的首选方式	主要依赖 useEffect。在组件挂载后，在 useEffect 中发起 fetch 请求，并用 useState 存储结果。	避免在 useEffect 中获取初始数据。优先在服务端组件中使用 async/await 直接获取，或使用 fetch 并利用 React 的扩展缓存。
心智模型	“渲染后触发”：渲染 -> 提交到DOM -> 执行 useEffect”。	“按需在客户端执行副作用”：服务端获取初始数据 -> 流式渲染 -> 客户端 useEffect 处理后续交互。”
主要用途演变	核心工具，用于数据获取、订阅、基于状态的副作用。	专业化工具，主要用于：1) 纯客户端交互（订阅、监听）；2) 依赖客户端状态或props的副作用；3) 集成第三方浏览器库。
访问浏览器API	可直接在 useEffect 中使用，因为整个应用在客户端运行。	必须在 useEffect 中使用，因为服务端渲染期间 window、document、localStorage 不存在。
与生命周期的对应	明确对应 componentDidMount、componentDidUpdate、componentWillUnmount。	概念相同，但“挂载”在混合渲染中更复杂（需要考虑注水完成）。

```

## 🚨 重要注意事项与最佳实践（纯React）

依赖数组是核心：

[]：副作用仅在组件挂载后运行一次，清理函数在卸载时运行一次。适用于初始化。

[dep1, dep2]：副作用在挂载后以及 dep1 或 dep2 变化后运行，每次运行前会先执行上一次的清理函数。

无依赖数组：副作用在每次渲染后都运行，性能危险，极少使用。

避免在 useEffect 中执行渲染所需数据的请求：这会导致“渲染 -> 空状态 -> 请求 -> 设置状态 -> 再次渲染”的瀑布流，影响性能。对于复杂应用，应使用数据获取库（如 TanStack Query）或将请求提升到组件树更高层。

清理函数是必须的：对于任何订阅、定时器（setInterval）、或手动 DOM 修改，都必须返回一个清理函数来避免内存泄漏和错误。

# ⚡ Next.js 中的思维转变

在 Next.js 中，你应该优先问自己：“这个副作用是否必须在客户端执行？” 如果答案是“否”（比如获取博客文章列表），那么：

不要再用 useEffect 去 fetch。

应该直接在页面或布局等服务端组件中 async/await 数据。

useEffect 在 Next.js 中回归到其更本质的角色：处理那些真正依赖于客户端环境或用户交互的“副作用”。

## 💎 总结
纯 React 中的 useEffect：是处理异步操作、订阅和命令式操作的中心化工具。它填补了声明式渲染与命令式世界之间的鸿沟，是数据获取的默认方案。

Next.js 中的 useEffect：其数据获取的核心职责被服务端组件取代。它变成了一个更专业、更聚焦的工具，专门用于处理浏览器事件、集成非React库、以及依赖客户端状态的同步逻辑。

简单来说，从纯 React 到 Next.js，useEffect 的使用哲学从 “我默认用它获取数据” 转变为 “我仅在必要时用它处理纯客户端副作用”。理解这种转变，是高效使用 Next.js 的关键之一


