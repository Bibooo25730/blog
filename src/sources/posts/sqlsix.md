---
title: "PostgreSQL6"
date: "2024-01-26 23:57:57"
categories:
  - Database
---

## 关键词

#### FROM
指定要处理的行的起始集
#### JOIN
合并其他表中的数据
#### WHERE
筛选行集
#### GRUOP BY
按唯一的值集对行进行分组
#### HAVING
筛选组集

## 排序

ORDER BY 子句用于对结果集进行排序。
- ASC:表示升序
- DESC:表示降序

```
SELECT *
FROM pruducts
ORDER BY price;
```

```
SELECT *
FROM pruducts
ORDER BY price DESC;
```

```
SELECT *
FROM pruducts
ORDER BY price ASC;
```

排序是我们要处理的比较容易的事情之一。

#### 用户的数量 OFFSET OR LIMIT

```
SELECT COUNT(*) FROM users;
```
但我只希望看到最后 10个用户

```
SELECT *
FROM users
OFFSET 40;
```
OFFSET 是一个只 SQL 查询中用于指定从哪一行开始返回数据的字句。通常与 LIMIT 子句一起使用，以实现分页查询。
LIMIT 限制  记录数 
#### 便宜的五条数据
```
SELECT *
FROM products
ORDER BY price
LIMIT: 5;
```

#### 最贵的五个产品

```
SELECT *
FROM products
ORDER BY price DESC
LIMTI 5;
```

## Union

在SQL中，UNION操作用于合并两个或多个SELECT语句的结果集。UNION操作用于合并结果集，并删除重复的行。如果希望保留重复的行，可以使用UNION ALL。

```
(
 SELECT *
 FROM products
 ORDER BY price DESC
 LIMIT 4
)
UNION
(
 SELECT *
 FROM products
 ORDER BY price / weight DESC
 LIMIT 4
);
```

现在得到了最贵的商品，和排名前4的单价。

**如果 UNION 关键字在两个列表中看到同一行，那么它只会再一次输出**
**此查询中的此查询的结果在一个实例中产生了相同的行，并决定了联合以除去重复项。**
**如果我们不希望删除该重复项，我们可以稍微更改关键字并使用 UNION ALL**


```
(
 SELECT *
 FROM products
 ORDER BY price DESC
 LIMIT 4
)
UNION ALL
(
 SELECT *
 FROM products
 ORDER BY price / weight DESC
 LIMIT 4
);
```

我们只允许在结果有两个查询的结果之间使用 union 关键字，它们必须具有相同的名称，并且其中的数据必须是相同类型的数据