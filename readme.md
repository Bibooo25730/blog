## next


## 写文章
终端输入 `npm run new 文章id` 就会在 `src/sources/posts` 下生成一个 `文章id.md`。

摘要则是写在第一条分割线与第二条分割线之间，详情参考 GitHub 仓库里的示例文章。

如需插入图片，则在 `public/img/posts` 下新建一个名为 `文章id` 的文件夹，在里面放入图片。如放入了 `abc.png`，则文章内输入 `![alt](abc.png)`。暂时没有外链引入方式。

文章内链接如果指向站内则会自动使用 `next/link`。

新建页面则是在 `pages` 文件夹进行，其余操作类似。

## 配置
在根目录下编写 `next.config.js`，基本已经注释上了。

评论则是修改 `src/components/comment.js`，这个怎么改就参考 DisqusJS 的 [readme](https://github.com/SukkaW/DisqusJS) 吧。

## 留言板
我使用的是 云mongdb
你需要在  .env.local 将您各自的凭据替换为用户名、密码和数据库名称
需要替换 comment 和 theme 你自己的url

### theme

主题状态交给 redux 管理了
