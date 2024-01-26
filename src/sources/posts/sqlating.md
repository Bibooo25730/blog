---
title: "PostgreSQL8"
date: "2024-01-26 23:57:57"
categories:
  - Database
---

# DISTINCT

单值始终将置于 select 子句中。DISTINCT 是 SQL 中的一个关键字，用于从查询结果中删除重复的行。当你使用 DISTINCT 时，它会确保查询结果中的每一行都是唯一的。
```
SELECT DISTINCT department
FROM products
```

```
SELECT COUNT(DISTINCT department)
FROM products;
```
然后我们可以运行这个，它会告诉我们产品内部有多少个独特的部门表，这是很有用的。

### GREATEST
用于返回参数列表中的最大值。
当你使用 GREATEST 函数时，你需要提供一个盒多个参数，函数会返回这些参数中的最大值。
SELECT GREATEST(20,10,30);

### LEAST

LEAST 是 SQL 中的一个函数，用于返回参数列表中的最小值。与 GREATEST 函数相反， LEAST 函数返回给定参数中的最小值。
```
SELECT LEAST(20,10,30);
```
这将返回 10，因为 10 是给定的三个数字中的最小值。
```
SELECT product_name, price   
FROM products   
WHERE price = (SELECT LEAST(price) FROM products);
```
这将返回 products 表中价格最低的产品的名称和价格。

### https://postgresapp.com/

这是为 MAC 提供的。。。。。

### pgadmin

pgadmin是 PostgreSQL 的官方图形界面管理工具，我们可以看到所有不同的表格，里面的所有不同行。我们运行任意的查询，我们也可以任意修改数据库内部的数据。我们可以连接本地或远程数据库，因此，会通过 云服务 运行。
此时，我们在 PostgreSQL 内部安装了一个名为 PostgreSQL Server 的软件，我们可以拥有多个不同的数据库。所以一个 PostgreSQL 服务器，目前正在你的计算机上运行，可以有多个不同的里面的数据库。尽管我们可以在一个 PostgreSQL 服务器内部创建多个数据库，构建应用程序，你只会将其与一个数据库绑定。
因此，如果你明天要构建一个应用程序，那么只为其创建一个数据库。通常，没有任何理由为一个应用程序创建多个数据库。
**我们创建数据库或多个数据库而不是一个服务器的唯一原因是**
1. 你可以在你的机器上做一个以上的应用。
我们会一直在一个单一的数据库中工作，我们要创建另一个数据库的唯一原因是我们正在尝试处理一些新应用程序。

