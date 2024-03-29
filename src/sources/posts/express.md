---
title: "Node"
date: "2024-02-19 23:57:57"
categories:
  - Node
---


### 支持 MAV 的 Express

首先，MVC 架构是什么？MVC 架构分离了数据层（模型），展示层（视图）和应用程序逻辑层（控制器）。这样做的目的是减少组件间的耦合，提升代码的可维护性和复用性。另一个好处是，这样开发出来的松耦合组件利于进行敏捷开发。我将从 Express 构建的应用中来使用 MAC。GITHUB 地址下次贴。

### MVC 总览

大多数应用程序和网站都是接收请求，处理请求，返回响应这样的流程设计，简单来说，MVC 架构中的请求循环是如下工作的：
（1） 请求到达应用程序
   (2)    请求经路由分配到控制器
   (3)    控制器在必要时请求模型
   (4)    数据模型返回数据到控制器
   (5)    控制器将视图与视图与数据合并成响应
   (6)    控制器将生成好的响应内容返回给请求者