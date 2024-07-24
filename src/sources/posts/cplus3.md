---
title: "C++"
date: "2024-07-24 03:57:57"
categories:
  - C_plus

---

### C++条件与分支



让我们看看高级语言有什么不同吧！检查条件，然后跳转到内存的不同的地方，并从这里开始执行指令。意味着 if  语句和分支通常有比较大的开销。如果你想写快速的代码，你可能决定根本不使用if语句。

**事实上，许多优化的代码将特别避免分支。避免使用 if 语句，因为这样做最终使程序慢下来。**

**无论如何，不要将这些东西复杂化了。记住，我们检查一个条件，就是我们的if语句，如果某件事是真的，我们就去执行一组特定的代码。**

如果你要检查两个数，比如两个整数是否相等，你基本上是在获取他们的四个字节的内存比较每个字节。为了让这2个整数是相等的，内存的每一位都必须相同。

```
 int visbool = 5;
    bool visible = visbool == 5;
    if (visible)
    {

        std::cout << visible << std::endl;
    }
    else
    {

        std::cout << "0" << std::endl;
    }
```

```
 int visbool = 5;
    
    if (visbool == 5)
    {

        std::cout << visbool << std::endl;
    }
    else
    {

        std::cout << "0" << std::endl;
    }
```


