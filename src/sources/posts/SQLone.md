---
title: "PostgreSQL"
date: "2024-01-13 23:57:57"
categories:
  - Database
---

## PostgreSQL

```
CREATE TABLE Phones (
  name VARCHAR(50),
  manufacturer VARCHAR(50),
  price INTEGER,
  units_sold INTEGER
)
```

```
INSERT INTO Phones(name,manufacturer,price,units_sold)
VALUES 
  ('N1280','Nokia',199,1925),
  ('Iphone 4','Apple',399,9436),
  ('Galaxy S','Samsung',299,2359)
```

```
SELECT name, price * units_sold AS revenue FROM phones;
```

#### || & CONCAT() & LOWER() & LENGTH() & UPPER()

### ||  连接两个字符串

SELECT name || price FROM phones;
SELECT name || ', ' || price FROM phones;
SELECT name || ', ' || price AS location FROM phones;

### CONCAT() 连接两个字符串

SELECT CONCAT(name,price) AS location FROM phones;
SELECT CONCAT(name,', ' , price) AS location FROM phones;
 与 || 有一样的功能。

### LOWER() 提供小写字符串

SELECT CONCAT(LOWER(name),', ' ,price) AS location FROM phones;

### LENGTH() 提供字符串中的字符数

SELECT CONCAT(LENGTH(name),', ' ,price) AS location FROM phones;

### UPPER() 提供大写字符串

SELECT CONCAT(UPPER(name),', ' ,price) AS location FROM phones;

## 过滤

SELECT name,area FROM cities WHERE 	area > 4000;
首先发生在内部的是， PostgreSQL 对一个数据来源进行了研究 > FROM cities
来分析一个查询，它将会看到你正在尝试从所有不同的行中，城市的表，它获取整个数据来源，然后第二次应用过滤条件。所以它对每一行说，我只考虑面积  > 4000的行。这将过滤或除去 “结果集”中的某些玫瑰花，然后除去所有剩余的条目，或剩余的行，然后我们将选择一些列数。

**Where** 关键字允许我们过滤结果集，我们从查询中返回。

### 比较运算符

1.  '=' 这些值相等吗？
2.  '>' 左边的数值大吗？
3.  '>' 左边的数值少吗？
4.  '>=' 左边的值是大于还是等于？
5.  'IN' 该值是否存在于列表中？
6.  '<='  左边的值是小于还是等于？
7.  '<>' 这些值不相等吗?
8.   '!=' 这些值不相等吗？
9.  'BETWEEN' 这个值在另外两个值之间吗？
10.  'NOT IN' 

```
SELECT name, area FROM cities WHERE area BETWEEN 2000 AND 4000;
SELECT name, area FROM cities WHERE name IN ('Sao Paulo','Delshi');
```

**我们可以在一个陈述或一条SQL语句里面使用多个运营商**

```
SELECT
  name,
  population / area AS population_density
FROM
  cities
WHERE
  population / area > 6000;
```

## 更新记录和删除记录

我们首先要了解如何更新表中某些行的属性。

#### UPDATE cities SET population = 39505000 WHERE name = 'Tokyo'

请注意，查询的结构与 SELECT 语句的结构非常不同。
我们没有选择语句，因为我们没有访存如何数据。

我们将写出更新的关键字 UPDATE，
然后列出我们想要的表的名称 cities,
进行更新，然后使用我们在被称为 “集合”之前新关键字，集合将描述我们希望在某些记录上更改的属性。
每当你编写该语句时，如果你尝试更新一个特定记录，那么需要进行你的说法很明确你只会更新一个城市。因为世界里面可能城市名一样，所以确保更新记录时，它总是更新你要更新的内容。

##  删除 DELETE FROM cities WHERE name = 'Tokyo'

删除表中的一行，非常简单的语法。

### Plan

在任何真实的世界应用中，在一个数据库只有一张数据表是非常罕见的。
我们要通过设计一个数据库来拍摄一张照片，分享应用，做一个数据库，里面有四个不同的表，一个列表，用户，照片列表，评论列表和喜欢列表。
问题来了？对于任何特定应用程序，我们应该做什么表？
世界上有很多特征，比如，用户认证，某种喜好系统，以及许多不同的 Web 应用程序实施的评论或讨论系统。网上有成吨的资源，给你关于如何结构的建议来实现这些非常常见的系统。
你可以网上搜索 XX 系统，然后引擎会告诉你很多。

#### Instagram

一个用户拥有很多不同的照片，这个用户跟这些照片有什么关系。我们会把这种关系称为一对多关系。
因为一个用户有许多与他们绑定的照片。
一张照片可以有很多不同的评论，所以从照片的角度看，这是一个与许多人关系的标志。
从评论来看，很多不同的评论都属于一张照片，或者我们可以说一个评论有一张照片。同样，我们将此称为多对一关系。

那么如何在数据中反映这些数据，我们如何在内部建立某种关系。

**两个术语会帮助我们建立各种不同的关系，所以这两个新名词是主键和外键**


#### Primary Key ,Foreign Key

主键和外键是我们要添加到许多不同表的附加列，在我们创造的所有不同的数据库中，我们所做的每一个表都有一个主键。
**主键的目标是标识表中的单个行。此列中的每一个值都将成为该列中的某种唯一值。** 也叫唯一标识。

实际设置两个不同记录之间的关系，这是重要的部分，我们要用一种叫做外键的东西。
**外键的目标是将次记录在此处与可能另一个记录相关联**

我们有一张照片和用户的表格，说一个用户有很多照片，所以我们需要在这个不同的方面建立一个关系。照片和一个用户来建立这种关系。
我们将给我们的 photos 表一个外键列，我们将调用该列用户下划线，在此列的标识和内部，我们将存储此特定照片的用户的标识。

   Photos
| id | url | user_id |
|1| http://img1.jpg| 4|
|2| http://img1.jpg| 4|
|3| http://img1.jpg| 1|
|4| http://img1.jpg | 2|

id : 主键 ，user_id ： 外键。
在用户表的内部具有或以某种方式与用户标识相关的用户，我们有一个主键列，称为 ID。我们还在 Photos 查找具有标识的用户。


   users
| id | urername  | email |
|1| xxx | @com|
|2| xxx | @com|
|3|xxx | @com|
|4|xxx | @com|

users表的 id 和 Photos 表主的 id。这就是在很多地方建立一个多到一种关系的基础，我们将确保所有表都始终有一个主键列，去储存号码。然后，设置与另一个表中的行的关系。我们要添加一个外键。
绝大多数时间我们会调用主键列标识，即它，简单标识。而由于我们的主键始终必须是唯一的，所以我们不能使用城市的名词有效。一般来说，我们通常会把这个东西叫做 ID。

主键几乎始终是整数或通用唯一标识，UCU标识。如果内部记录属于我们的其他记录，那么需要具有外键列现在的数据库。我们的整个模式用户并不真正属于或不服务如何关系的任何一方，所以我们的用户表可能永远可能不会有外键列，而只是关于所有不然就会，外键不需要是唯一的，所以这个外键列里面有很多不同的地方可以相同。

**外键列中具有重复标识是完全正常的**

**外键的命名约定将随你的不同而变化，他们可能有自己的约定**

