---
title: "PostgreSQL7"
date: "2024-01-26 23:57:57"
categories:
  - Database
---

### UNION  
将两个查询的结果连接在一起并删除重复的行
### UNION ALL
将两个查询的结果连接在一起
### INTERSECT
查找两个查询结果中常见的行。删除重复项
```
(
 SELECT *
 FROM pruducts
 ORDER BY price DESC
 LIMIT 4
)
按价格降序排列，然后只显示前四条记录
UNION ALL
(
 SELECT *
 FROM  products
 ORDER BY price / weight DESC
 LIMIT 4
)
性价比最高的4个产品
```
假如有重复的行，如果我们想以编程方式查找这些查询重复或通用的行，我们可以用 INTERSECT
```
(
 SELECT *
 FROM pruducts
 ORDER BY price DESC
 LIMIT 4
)
按价格降序排列，然后只显示前四条记录
INTERSECT
(
 SELECT *
 FROM  products
 ORDER BY price / weight DESC
 LIMIT 4
)
性价比最高的4个产品
```
INTERSECT 将只显示对两者通用的行。
### INTERSECT ALL
查找两个查询结果中常见的行
### EXCEPT 返回两个结果集的差集
查找第一个查询中存在但第二个查询中不存在的行。删除重复项
### EXCEPT ALL
查找第一个查询中存在但第二个查询中不存在的行

除了 union 关键字，还有几个我们用来处理多个的关键字

```
SELECT manufacturer
FROM phones
WHERE price < 170
UNION
SELECT manufacturer
FROM phones
GROUP BY manufacturer
HAVING COUNT(*) > 2;
```

#### 所有产品更贵的所有产品的名称和价格

```
SELECT name,price
FROM products
WHERE price > 876;
```
我们在此处写入此查询，因为你和我可以直观地检查我们的所有数据，但在现实世界中，我们很容易会有太多的产品来做那种视觉检查。
如果我们有成千上万甚至数以百分计的不同产品，我们就无法进行视觉检查。
我们编写写一些查询来寻找最昂贵的产品。那么现在这个 SQL 似乎没有作用了。

我们需要写一些查询来寻找最昂贵的产品，那么记住这个非常简单的查询，上面那条 SQL 可能不起作用，第一个查询是想在玩具部门找到最昂贵的产品。

```
SELECT MAX(price)
FROM products
WHERE department = 'Toys';
```
```
SELECT name,price
FROM products
WHERE price > (
   SELECT MAX(price) FROM products WHERE department = 'Toys';
);
```
```
SELECT *
FROM orders
多行多列
```
```
SELECT id
FROM orders
多行一列
```
```
SELECT COUNT(*)
FROM orders
一行一列
```

### 子查询

SELECT name，price(
   SELECT MAX(price) FROM products
)
FROM products
WHERE price > 867;

|name|price|max|
|shiet | 875 | 991|
|fiesh | 926 | 991|

在这个案例中，有一个子查询，这里没有什么超有意义的，理解子查询的规则以及我们可以在哪里写入不同的数据。因此，显示每个产品旁边的最大价格。

```
SELECT name, price_weight_ratio
FROM (
    SELECT name, price  / weight  AS price_weight_ratio
    FROM products
)   AS p
WHERE price_weight_ratio > 5;
```
```
SELECT *
FROM (SELECT MAX(price) FROM products) AS p;
```

```
SELECT (
    SELECT MAX(price) FROM products
) / (
    SELECT AVG(price) FROM products
)
最大的价格项目是平均的几倍。
```