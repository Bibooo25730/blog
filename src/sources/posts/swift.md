---
title: "swift"
date: "2026-01-19 02:57:57"
categories:
  - swift
---

### swift 初见

个人觉得 swiftui 跟 flutter 有点类似，只不过 flutter 是 css写法 嵌套ui swiftui 少了 {},还有命名也有点奇怪，所以上手成本肯定比 flutter 有点高.

1. 变量是始终在使用前初始化
2. 检查数组索引超出范围的错误
3. 检查整数是否溢出
4. 可选值确保明确处理 nil 值
5. 内存被自动管理
6. 错误处理允许从意味故障控制恢复

### 简单值

```
let 声明 常量
var 声明 变量
值永远不会被隐式转换为其他类型。如果你需要把一个值转换成其他类型，
请显式转换。
let label = "The width is "
let width = 94
let widthLabel = label + String(width)
更简单的方法
let apples = 3
let oranges = 5
let appleSummary = "I have \(apples) apples."
let fruitSummary = "I have \(apples + oranges) pieces of fruit."
使用 三个 双引号 （“”“）来包含多行字符串内容。
let quotation = """
I said "I have \(apples) apples."
And then I said "I have \(apples + oranges) pieces of fruit."
"""
使用初始化语法来创建一个空数组或者空字典。
let emptyArray: [String] = []
let emptyDictionary: [String: Float] = [:]

```

### 控制流

使用 if 和 switch 来进行条件操作，使用 for-in、while 和 repeat-while 来进行循环。包裹条件和循环变量的括号可以省略，但是语句体的大括号是必须的。

### UI
```
import SwiftUI

struct ContentView: View {
    var body: some View {
        HStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}

HStack x轴水平排列 Vstack y轴垂直排列 Zstack z轴水平排列在一起的
```

### URLSession

URLSession = ios 原生网络请求工具
用于 请求接口 / 下载数据 / 上传文件

```
let url = URL(string: "https://jsonplaceholder.typicode.com/todos/1")!

URLSession.shared.dataTask(with: url) { data, response, error in
    if let data = data {
        let text = String(data: data, encoding: .utf8)
        print(text ?? "")
    }
}.resume()

```
1. .dataTask 创建任务
2. .resume() 必须调用，不然不会发请求
3. 回调在后台线程 （主线程负责页面，ui 只能在主线程改）（后台线程负责网络请求 读文件 计算 不会卡界面）

```
URLSession.shared.dataTask(with: url) { data, response, error in
    print("回调在这里")
}.resume()
```
目的只有一个：防止网络请求卡死界面

### 正确写法

```
URLSession.shared.dataTask(with: url) { data, _, _ in
    DispatchQueue.main.async {
        self.title = "新标题"
    }
}.resume()

```

### 更爽的写法

```
let (data, _) = try await URLSession.shared.data(from: url)
title = "新标题"

```
### 主流第三方
```
AF.request("https://api.example.com")
  .responseDecodable(of: User.self) { response in
      print(response.value)
  }
```

### LazyVStack

1. LazyVStack 只会渲染 屏幕上可见的子视图，节省性能

2. 当列表很长（上百、上千个元素）时，LazyVStack 更高效

#### 特点

| 特性    | VStack  | LazyVStack       |
| ----- | ------- | ---------------- |
| 布局方向  | 垂直      | 垂直               |
| 子视图加载 | 一次性全部渲染 | 可见时才渲染（懒加载）      |
| 性能    | 对小列表没差别 | 大列表性能更好          |
| 用法    | 简单堆叠    | 结合 ScrollView 使用 |
