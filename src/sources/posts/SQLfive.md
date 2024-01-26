---
title: "PostgreSQL5"
date: "2024-01-26 23:57:57"
categories:
  - Database
---

﻿```
SELECT url, contents
FROM comments
JOIN photos ON photos.id = comments.photo_id
WHERE comments.user_id = photos.user_id;
```

### 三路连接，三路联合

我们需要来自评论和照片以及用户的信息

id |  contents          | user_id |   photo_id | id  |  url  | user_id            | id|             username     |  
2  |  Non est totam |    5       |   3            |  3   |   https://kailyn.name | 5 | Frederique_Donnelly |

```
SELECT url, contents,username
FROM comments
JOIN photos ON photo.id = comments.photo_id
JOIN users ON users.id = comments.user_id AND users.id = photos.user_id
```

这是三种方式的联合。

```
SELECT title,name,rating
FROM reviews
JOIN books ON books.id = reviews.book_id
JOIN authors ON authors.id = books.author_id AND authors.id = reviews.reviewer_id
```

### Grouping (分组)

记住，分组都是关于取多行并将其压缩到更少的行数。
了解分组的最好方法是真正地写出一个或两个查询。

**将多行减少到较少行。**
**通过使用“GROUP by”关键字完成**
**可视化结果是使用的关键**

```
SELECT user_id
FROM comments
GROUP BY user_id;
```

每当我们使用一个分组，按用户标识分组，就会出现在幕后的情况。你的数据库将查看你在此时选择的所有行，在我们的查询中，我们选择了评论表中的所有行。你的数据库将经历所有这些不同的行，它将找到用户标识列，它将尝试查找其中的所有唯一值，如果此列中的值，那么唯一值为1,2,3,5这些是此列中唯一出现的值。 在找到所有不同的唯一标识之后，你的数据库就会将这些标识中的每一个根据该用户标识，将其分配给不同的组。	

在数据库中创建的临时虚表，当我们使用用户 ID 进行分组时，在此虚构数据库内创建新的分组列。在此列中，我们将使用用户标识中的所有唯一值，以便我们可以想象

举例：
| id | contents | user_id | photo_id |
| 1  |  Non est | 1          | 5             |
| 5  |  Et sit     |  1         | 3             |

分组之后

1{
| 1  |  Non est | 1          | 5             |
| 5  |  Et sit     |  1         | 3             |
}

用户标识列中的所有值都在相应组中相互匹配，分组之后，我们只能选择分组的列，我们不允许直接选择如何红色列或我们内部的底层列原始表。
```
SELECT contents
FROM comments
GROUP BY user_id;
```
如果我们这样做，就会得到错误，要查看内容，它必须出现在组中，因为你必须在聚合函数中使用它。
因此，如果我们希望以任何方式处理这些底层，那么我们只能直接选择组列，只能通过聚合函数来选择它们。

**你真的想把你的数据进行分组后，你只需记住，你只能直接选择组**

### Aggregates（聚合）

**将多个值减少到一个**
**通过使用“聚合函数”完成**

通过使用聚集函数来创建聚集。

#### COUNT() SUM() AVG() MIN() MAX()

COUNT() 返回一组值中的值数
SUM() 查找一组数字的和
AVG() 查找一组数字的平均值
MIN() 返回组号中的最小值
MAX() 返回组号中的最大值

```
SELECT MIN(id)
FROM comments;
```

```
SELECT user_id,COUNT(id)
FROM comments
GROUP BY user_id;
```
它将打印我们每个不同的用户创建的评论的数量。
```
SELECT user_id,COUNT(id) AS num_comments_created
FROM comments
GROUP BY user_id;
```
### 总行数

```
SELECT COUNT(*) FROM photos;
```

