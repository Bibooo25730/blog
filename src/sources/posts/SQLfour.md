---
title: "PostgreSQL"
date: "2024-01-13 23:57:57"
categories:
  - Database
---

```
SELECT contents,url
FROM photos
JOIN comments ON photos.id = comments.photo_id;
```

如果我们要求的是 ID 而不是 URL 中的内容，那么会发生什么？

会报错，column reference "id" is ambiguous=>列引用“ id”是不明确的

"不明确" 表示你的数据库不知道你是在说这个边栏还是说侧栏，就是那个表。
因此，如果你想要选择在联合表中列出两次或更多列的列，那么需要更明确一点，你需要放置表的名称来指定你想要的不同序列。

```
SELECT photos.id
FROM photos
JOIN comments ON photos.id = comments.photo_id;
```	

如果查询两个或多个 ID不明确，可以使用 AS
```
SELECT comments.id AS comment_id,photos.id
FROM photos
JOIN comments ON photos.id = comments.photo_id;
```

除了重命名列，我们还可以使用关键字来重命名表。

```
SELECT comments.id AS comment_id, p.id
FROM photos AS p
JOIN comments ON p.id = comments.photo_id;
```

假设我们添加

```
INSERT INTO photos (url,user_id)
VALUES('https://banner.jpg',NULL);

```

```
SELECT url,username
FROM photos 
JOIN users ON users.id = photos.user_id;
```
我们没有看到我们刚才补充的那张照片。我们现在只列出与我们数据库内部的用户相关的照片。
所以我们没有得到我们的照片，只有与用户相关的照片。
我们的源表中有一行与用户的行不匹配，因此，我们找不到那一行的匹配，所以我们在最后的结果中看不到它。
我们没有为用户或我们刚才添加的照片进行匹配，所以我们在这里看不到它的结果。

**我们希望显示每个照片和URL,即使现在没有与他们关联的用户。**

### Left Outer Join 左外连接
返回左表中的所有记录以及右表中与左表匹配的记录。如果右表中没有与左表匹配的记录，则结果中的相关字段将为 NULL。

```
SELECT url,username
FROM photos
LEFT JOIN users ON users.id = photos.user_Id;
```
### RIGHT Outer Join 右外连接
返回右表中的所有记录以及左表中与右表匹配的记录。如果左表中没有与右表匹配的记录，则结果中的相关字段将为 NULL。

```
SELECT url,username
FROM photos
RIGHT JOIN users ON users.id = photos.user_id;
```

### Full Outer Join 全外连接
返回左表和右表中的所有记录。如果某一表中没有与另一表匹配的记录，则结果中的相关字段将为 NULL。

```
SELECT url,username
FROM photos
FULL JOIN users ON users.id = photos.user_id;
``` 


#### “ FROM”和“ JOIN”之间的表顺序通常会有所不同

#### 如果列名发生冲突，则必须提供上下文

#### 可以使用“ AS”关键字重命名表

#### 有几种接头！

