---
title: "代码的整洁之道"
date: "2023-10-06 23:36:57"
categories:
  - next.js
---

在 Vercel 部署的 next.js 集成 mongdb 出现 504错误

---

#### 解决日志

我刚开始是以为 mondgb 没连接上，在开发环境上有行得通，生产环境上面就 504。我了解到 Vercel 如果连接超时 10s 就报错了。

![log](Vercel/jic.PNG)


#### 我以为是 fetch 的原因

后来想了一下，连接超时跟 fetch 没什么关系，我又不是连接地址写错了，纵使我再异步或者用生成器，还是不行，与是我换axiox还是不行。

#### mongdb Atlas

云 mongdb 我想可能是国外的，Vercel 是动态ip，部署的地址也不一样，与是我修改了 Vercel 的部署地址为 斯德哥尔摩。跟 云 mongdb 一样，还是不行。 =-=

#### 解决方式

因为Vercel 是动态ip，检查 Mongdb Atlas中的网络设置访问，接受来自你自己所有的 ip 以外的地址访问。


