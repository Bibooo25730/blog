---
title: "Mysql和MongoDB的区别"
date: "2023-07-06 23:57:57"
categories:
  - Database
---

Mysql和MongoDB的区别,Ubuntu22.04 20.04 18.04 LTS 安装 MongoDB6

---

> Mysql 和 MongoDB 都是数据库管理系统，可让你提取数据并创建。
> 但它们从根本上也有很多不同。

| Mysql | MongoDB  |
|-------|----------|
| table | Document |
| schema | JSON     |

>Mysql确实具有一个结构化系统，而 MongoDB 是一个基于文档的系统。
>Mysql是基于表的，使用该架构，以便表中的所有行都将具有相同的列，并且这些列具有特定的数据类型。

**MongoDB 在某些方面旨在取代传统的 Mysql 结构，成为一种更简单的数据处理方式**

#### Mysql
>现在Mysql有两个主要组件。有一种用于处理数据的存储引擎和语言。

>因此，存储引擎是创建，检索，发送和存储数据的地方，而语言则是访问数据的方式。

#### MongoDB
>MongoDB是一个 NOSQL 数据库。它以文档为搜索数据单位,MongoDB 在那些类型 JSON 的文档上采用 BISON，这些文档通常被二进制编码为较小的文件。
>许多开发人员发现这些文件更易于操作，从而使数据管理速度更快。


**使用哪一种始终取决与你的用例**

>Mysql 被认为具有高度可访问性和安全性，因此非常适合高流量网站。
>例如电子商务网站，和具有高安全性协议的合规性重工业。

>mongoDB 使用动态模式设计，为数据，搜索，编码，集成，和数据库开发营造了更灵活的环境。
>最适合内容管理系统和分析应用程序等高查询站点。

### 安装
- sudo apt update
- sudo apt install wget curl gnupg2 software-properties-common apt-transport-https ca-certificates lsb-release
- wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
Ubuntu 22.04

  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

Ubuntu 20.04

	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

Ubuntu 18.04

	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

Ubuntu 16.04

	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
- sudo apt update

- sudo apt install mongodb-org -y
- mongob --version
- sudo systemctl start mongod
- sudo systemctl enable mongod
- sudo systemctl status mongod

### 错误解决
Main PID: 4821 (code=exited, status=100)
> cd 到 /var/lib/mongodn

> sudo chown -R mongodb:mongodb /var/lib/mongodb

> mongod --shotdown

- sudo systemctl start mongod
- sudo systemctl enable mongod
- sudo systemctl status mongod

Main PID: 10055 (code=exited, status=14)

- sudo chown -R mongodb:mongodb /var/lib/mongodb
- sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
- sudo service mongod restart
- sudo systemctl status mongod

绿色就OK了，不得不说 linux 真的是需要耐心，好像国家要求公职人员都用 linux 好像。

### mongosh 使用

