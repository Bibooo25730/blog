---
title: "PostgreSQL"
date: "2024-01-13 23:57:57"
categories:
  - Database
---

### 四种不同的关系

多对一，一对多，多对多，一对一。
如何在数据中反映这些数据，我们如何在内部建立某种关系。
主键，外键，帮助我们建立这些不同的关系。


### SERIAL

```
CREATE TABLE users (
  id SERIAL
);

```

SERIAL 数据类型告诉 Postgrads，我们希望自动为我们生成此列中的值。
SERIAL关键字尤其意味着每当我们开始将值插入到用户时,我们就不用手动提供一个身份标识。

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
);
```

在 SERIAL 之后，我们会将此列标记为主键，这会增加一些特殊技能。

### 查询 
SELECT * FROM photos WHERE user_id = 4;

在我们的应用中，我们可能想要获取所有由特定用户创建的照片。

SELECT * FROM photos
JSON users ON users.id = photos.user_id;

### 插入

每当我们在 Photos 插入一张照片时，我们就有三种不同的可能性需要考虑。首先，我们可能会尝试插入与实际存在的用户相关的照片，我们需要决定这种照片的关联用户，我们考虑会添加一个用户 ID，然后，我们可以运行一些查询来访存与该用户关联的所有照片，或者执行其他操作，想做的事情。
现在让我们考虑下一种情况，我们插入的照片引用了一个用户，不存在，那么会发生什么？

**会报错，因为它会违反外键约束，外键约束意味着 PostgreSQL 希望确保每当我们设置此外部键，它尝试引用实际存在于用户表中的记录。,在这种情况下，没有匹配，所以我们最终会出现错误。**

这是一个非常好的功能部件，确保你不会意味插入数据库中的数据。

还有一种情况就是，我们可能在我们的应用里面有照片，并不是于任何用户联系在一起的，谁知道呢，也许我们想在用户第一次登陆的时候出现一些弹出的一天的图像，也行这张照片并不是想真正于任何用户联系起来的。

```
INSERT INTO photos(url,user_id)
VALUES ('http://jpg',null);
```

对于用户标识，那么这些是我们在插入数据时要考虑的三个场景。

### 尝试删除涉及外键的某些记录时会发生什么情况？

如果删除了 ID 号的用户，会发生什么情况？如果发生了这种情况，我们就会出现一些危险的地方，换句话说，这些照片现在试图引用的用户不存在，永远不会。

**当我们使用SERIAL 数据类型时，我们的标识就会使用该 SERIAL 数据类型 即使删除了具有某些给定标识的记录，也不会复用任何标识。**

所以当我们删除身份证号的用户时，永远不会，永远是另一个拥有 ID 的用户。所以这些照片永远不会引用任何用户。

```
DELETE FROM users
WHERE id = 1;
```

会收到一个错误消息，这是删除的外键约束，组织我们删除该用户。



## ON DELETE CASCADE 级联删除

删除在我们制作表时设置的其中一个外键列后的级联权限。


```
CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 url VARCHAR(200),
 user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

任何与用户身份相关的照片都会删除。这是取消删除 KasKade 约束。
一个真正的好例子就是如果你管理者某种论坛来思考，一个论坛里面有很多帖子，很多回复。
如果你删除了帖子或者讨论，那么你希望也删除里面的所有回复都是一样的

### 在删除集为NULL时

```
CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 url VARCHAR(200),
 user_id INTEGER REFERENCES users(id) ON SET NILL
);
```
这时候删除用户的时候，Photos 的外键 user_id 会设置为 null。

### 删除时设置默认值

```
CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 url VARCHAR(200),
 user_id INTEGER REFERENCES users(id) ON DELETE SET DEFAULT
);
```
让这个表再复杂一点，我们再加入评论，我们的photos表中有我们的照片，有id，url，用户id，users表有id，username。评论表有 id，photo_id,user_id,contents。两个外键，一个将每个注释关联到用户，另一个将注释与照片相关联。

## 加入Joins

以某种方式生成一个值或一个集合通过合并来自不同表的大量行的行。我们经常用 joins 用于回答与多个不同类型的资源相关的问题的查询，例如，返回。
通过将不同相关表中的行合并在一起生成值。
在大多数情况下，当您被要求查找涉及多个资源的数据时，请使用联接。

```
SELECT contents,username
FROM comments
JOIN users ON users.id = comments.user_id
```
联合声明，我们想在任何时候使用联合声明表，我们要仔细研究声明其他部分的细节。我们将研究很多其他使用联合声明的查询，而你也会和他们一起得到自己的实践。
## 聚合Aggregation

查看多行并计算单个值,像“大多数”、“平均”、“东部”这样的词表示你需要使用聚合

