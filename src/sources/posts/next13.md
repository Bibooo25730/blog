---
title: "next.js 13"
date: "2023-06-19 23:57:57"
categories:
  - Next.js
---

next.js 更新

---
```bash
https://github.com/Bibooo25730/next.js-13-ts.git
npm run dev
# or
yarn dev
# or
pnpm dev
```

### next:13

- 默认情况下在 next.13 应用程序路路由器中中所有组件都是服务器组件，默认意味着无论我们使用什么代码放在这里只会在服务器永远不会到达客户端，
- 我们甚至可以进行 API 调用
- 当然就不能用 hooks了
- 可以在顶端 "use client"

````
<body className={inter.className}>
      <Container>{children}</Container>
</body>
````
因为我们当通过 props 的组件，react 必须事先知道内容是什么，children它只是必须在包装器组件中保留一个插槽，所以有一个空洞。

可以说在容器组件中，我们稍后将渲染服务器，但是如果我们硬编码，直接进入容器组件，然后它是客户端组件。

````
<body className={inter.className}>
      <SSRProvider> <Container>{children}</Container></SSRProvider>
</body>
````
用这个 SSR 包裹容器提供者这只是 react 必需的，每当我们使用服务端引导时，渲染否则会有问题。

# 目录路由

（SSR）是不影响的

### 动态
no-cache,no-store
无缓存无存储效果都是一样的。
```
 const response = await fetch("https://www.dmoe.cc/random.php?return=json",
  {
   cache:"no-store"
  }
 )
```
&&

```
export const revalidate = 15;
```
**这个也可以动态刷新，15秒之后动态刷新**

&&
```
 const response = await fetch("https://www.dmoe.cc/random.php?return=json",
  {
   next:{revalidate : 15}
  }
 )
```
### generateStaticParams

````

我们不想渲染用户第一次访问它们时，我们想在构建时渲染它们就可以使用.
这个函数可以是动态的，如果你需要在这里和这个获取一些数据相当于获取静态路径旧的页面路由器，但语法更简单了。
我们只需要返回一个数组，在这里包含我们的对象键
我们可以放置任何关键字，数组中的每一个元素我们将它映射到每个主题上
xxx 我们已经提前获取了这些数据编译项目，无需加载立即完成。
// 如果你就只想访问这三个xxx 你可以 export  const dynamicParams = false;
// ts报错 const dynamicParams = false;export { dynamicParams };

export function generateStaticParams(){
    return ["xxx","xxx","xxx"].map(topic => ({topic}))
}
````
### 设置元数据

````
export function  generateMetadata({params:{topic}}:PageProps): Metadata{
    return {
        title: topic + 'haha'
    }
}
````
**我们在这两个函数做同样的请求。next.js实际上自动删除重复项请求。**

### cache react

````
React允许你缓存()
和重复请求，将包装好的函数调用的结果备忘化。用相同的参数调用相同的函数，将重复使用一个缓存的值，而不是重新运行该函数。
import { cache } from 'react'
 
export const getUser = cache(async (id: string) => {
  const user = await db.user.findUnique({ id })
  return user
})
````

### use client
我们在 api 里处理请求

### 推荐
https://swr.vercel.app/zh-CN

### favicon.ico

你可以直接放在 APP 目录里面next.js 会自动为 favicon
如果是开头 opengraph 的图片也会自动成为社交媒体预览头像
不知道的看这个 https://ogp.me/

### 这大概就是 next.13 更新的内容

emmm，我怎么什么都忘记了 =-=