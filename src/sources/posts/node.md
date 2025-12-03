---
title: "Node"
date: "2025-12-02 23:57:57"
categories:
  - Node
---

### node复习文档

##### Node 断言
---
可以跳过或简化：

原型阶段、探索性代码

频繁变动的UI组件

第三方库的简单包装

工具函数（有类型系统保证）

❌ 必须认真测试：

支付/交易逻辑

用户认证授权

核心业务算法

数据转换和验证
---
推荐使用 jest 断言

核心建议：

先让功能跑起来，再考虑完善测试

使用类型系统（TypeScript） 减少基础错误

代码评审比过度测试更有效

监控和日志能发现运行时问题

记住：测试是为了帮助开发，而不是阻碍开发。根据项目阶段灵活调整测试策略，才是最高效的做法。

##### AsyncLocalStorage 异步上下午跟踪

传递性：异步操作层层嵌套时，上下文能自动传递

透明性：业务代码不需要关心上下文的传递

隔离性：不同请求之间的上下文互不干扰

性能：比在每个函数参数中传递更高效

简洁性：大幅减少代码冗余

这些场景的共同特点是：需要在异步调用链中共享一些上下文信息，而这些信息又不适合放在全局变量中（因为不同请求需要隔离）。

适度使用：不是所有场景都需要 AsyncLocalStorage

存储精简：只存储必要的最小数据

错误处理：始终检查 getStore() 可能返回 undefined

测试覆盖：确保上下文在各种异步场景下正常工作

性能监控：在高频场景下监控内存和CPU使用

##### Async hooks 异步钩子

我们强烈建议不要使用此async_hooksAPI。其他可以满足其大部分使用场景的 API 包括：

AsyncLocalStorage跟踪异步上下文
process.getActiveResourcesInfo()跟踪活跃资源

##### Buffer 缓冲

Buffer对象用于表示固定长度的字节序列。许多 Node.js API 都支持Buffer对象。

虽然Buffer该类在全局范围内可用，但仍然建议通过 import 或 require 语句显式引用它。

1. Buffer 是什么？
Buffer 是 Node.js 中处理二进制数据的核心类，类似于其他语言中的字节数组（byte array）。

关键特点：

在 V8 堆外分配内存（固定大小，不参与垃圾回收）
// JavaScript 普通对象 - 在 V8 堆内存中
---
const obj = { name '张三', age 25 };
const arr = [1, 2, 3, 4, 5];
const str = 'Hello World';
---
// 特点：
// 1. 由 V8 引擎管理分配和回收
// 2. 参与垃圾回收（GC）
// 3. 大小不固定，可以动态增长
// 4. GC 时有性能开销

Buffer 内存（堆外内存中）
---
const buffer = Buffer.alloc(1024); // 分配1KB内存
---
// 特点：
// 1. 由 Node.js C++ 层直接调用操作系统 API 分配
// 2. 不参与 V8 的垃圾回收
// 3. 大小固定，创建时确定
// 4. 需要手动管理（实际上是 Buffer 类帮你管理）
用于处理 TCP 流、文件系统操作、加密等

比 JavaScript 字符串更高效处理二进制数据

###### 为什么需要用

处理大文件，用 js 低效（100mb文件=》100mb字符串）
储存在v8堆内存中
GC压力大，频繁GC导致应用停顿
符串不可变，修改需要复制

用 Buffer 处理大文件（高效）
100MB文件 => 100MB Buffer
存储在堆外内存
不参与GC，无停顿
Buffer可变，可直接修改
你的 Node.js 进程内存空间：
┌─────────────────────────────────────────────────┐
│               进程地址空间                       │
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │          V8 堆内存（受GC管理）           │  │
│  │                                         │  │
│  │  JavaScript对象：                       │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐             │  │
│  │  │  obj │ │  arr │ │  str │ ...         │  │
│  │  └──────┘ └──────┘ └──────┘             │  │
│  │                                         │  │
│  │  垃圾回收器会定期扫描这里                │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  ┌─────────────────────────────────────────┐  │
│  │          堆外内存（Buffer）              │  │
│  │                                         │  │
│  │  直接由操作系统管理：                    │  │
│  │  ┌──────────────────────┐               │  │
│  │  │                      │  Buffer 1     │  │
│  │  │   100MB 二进制数据   │  (100MB)      │  │
│  │  │                      │               │  │
│  │  └──────────────────────┘               │  │
│  │  ┌──────────────────────┐               │  │
│  │  │                      │  Buffer 2     │  │
│  │  │   50MB 图片数据      │  (50MB)       │  │
│  │  │                      │               │  │
│  │  └──────────────────────┘               │  │
│  │      ...                                 │  │
│  │                                          │  │
│  │  垃圾回收器不管这里！                    │  │
│  └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
######  服务器应用容易内存只增不减
---
const cache = new Map();

setInterval(() => {
  // 定时任务累积数据
  const data = fetchData();
  cache.set(Date.now(), data);
  
  // 问题：旧数据很少删除
  // 结果：老生代不断增长
  // 触发频繁的 Mark-Sweep GC
}, 1000);
---
// 解决方案：使用 WeakMap 或 LRU 缓存
---
const weakCache = new WeakMap();  // 不阻止 GC
---
# 1. 增加老生代大小（减少 GC 频率）
node --max-old-space-size=4096 server.js  # 4GB
---
# 2. 增加新生代大小（适合创建大量临时对象）
node --max-semi-space-size=64 server.js  # 64MB 新生代
---
# 3. 调整 GC 策略
node --nouse-idle-notification server.js  # 禁用空闲时GC
---
# 4. 使用新的 GC 算法（Orinoco）

---
node --max-old-space-size=4096 \
     --gc-interval=100 \
     server.js
---
##### 内存泄漏检测
# 1. 使用 heapdump
---
npm install heapdump
---

# 代码中
---
const heapdump = require('heapdump');
setInterval(() => {
  heapdump.writeSnapshot(`heap-${Date.now()}.heapsnapshot`);
}, 60000);  # 每分钟拍快照
---
# 2. 使用 Chrome DevTools
---
node --inspect server.js
---
# 然后在 chrome://inspect 分析内存

# 3. 使用 clinic.js（生产推荐）
---
npm install -g clinic
clinic doctor -- node server.js
---

#### C++ 插件是 Node.js 性能优化的终极武器，但需要谨慎使用。只在真正需要时使用，并确保正确处理内存、错误和线程安全。
