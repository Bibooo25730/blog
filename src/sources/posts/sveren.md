---
title: "String DecodergreSQL3"
date: "2024-12-06 05:57:57"
categories:
  - Node
---

# come back

我熟悉一下 node 的 文档,有一年没更了，这一年经历了很多，明白了 命里有时终须有，命里无时莫强求.

### Node.js String Decoder 完全指南

String Decoder 是 Node.js 的核心模块，专门用于处理 Buffer 到字符串的解码，特别是在处理多字节字符（如 UTF-8）时，它能正确处理字符边界，避免乱码。

### Node.js Test Runner 完全指南

Node.js 18+ 内置了完整的测试运行器，无需安装第三方库即可编写和运行测试。这是一个稳定、现代且功能丰富的测试解决方案。

### Timers

Node.js Timers 完全指南
定时器是 Node.js 异步编程的核心，用于调度未来执行的任务。Node.js 提供了多种定时器 API，每种都有其特定的用途和特性。
```
// 1. setTimeout - 单次延迟执行
const timeoutId = setTimeout(callback, delay, arg1, arg2, ...);

// 2. setInterval - 重复执行
const intervalId = setInterval(callback, delay, arg1, arg2, ...);

// 3. setImmediate - 当前事件循环结束后立即执行
const immediateId = setImmediate(callback, arg1, arg2, ...);

```

### Node.js TLS/SSL 完全指南

TLS（Transport Layer Security，传输层安全）是 SSL（Secure Sockets Layer，安全套接层）的继任者，用于在网络通信中提供加密和身份验证。

### Node.js UDP/Datagram Sockets 完全指南

UDP（User Datagram Protocol）是一种无连接的传输协议，提供快速、轻量级的数据传输。Node.js 通过 dgram 模块提供了完整的 UDP 支持。

### URL

1. 解析和提取网址信息 - “这个网址里有什么？”
2. 构造和生成网址 - “我要生成一个新网址”
3. 查询参数处理 - “网址里问号后面的部分怎么处理？”
4. 网址验证和规范化 - “这个网址合法吗？”
5. 拼接相对路径 - “给我一个相对于基地址的完整网址。”
你可以将一个相对路径和一个基础网址组合起来，计算出完整的绝对网址。这在处理网页链接或资源引用时非常方便。

总结与选择建议
简单来说，URL 模块让你在代码中操作网址时变得准确、安全和高效。

何时使用：只要你的程序需要读取、生成、修改或验证任何网址，比如网络爬虫、API客户端、服务器路由处理、日志分析等，就应该使用它。

最佳实践：对于新的 Node.js 项目（特别是v10以上版本），强烈推荐使用 WHATWG标准的 URL 类（new URL()）和 URLSearchParams，它们是现代、功能全面且符合最新 Web 标准的工具。仅在需要兼容旧代码时，才考虑使用传统的 url.parse() 等方法。

如果你有一个具体的网址处理场景（比如解析用户输入、批量生成API链接），我可以为你提供更具体的代码示例。


### Node.js util 模块完全指南

util 是 Node.js 的核心实用工具模块，提供了一系列常用的功能函数，用于弥补 JavaScript 原生 API 的不足，让开发更高效。

1. 类型检查和判断
2. 格式化与输出
3. 文本装饰与颜色
