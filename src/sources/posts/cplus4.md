---
title: "C++ if&循环&控制语句"
date: "2024-07-26 03:57:57"
categories:
  - C_plus

---

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





#### For 循环

```
#include "print_message.h"  
  
int main() {  
    for (int i = 0; i<5; i++) {
      printMessage("Hello, World!");  
    }
  
    return 0;  
}
```

```
#include "print_message.h"  
  
int main() {  
    int i = 0;
    bool condition = true;
    for( ; condition; )
    {
        printMessage("hello,world!");
        i++;
        if (!(i < 5)) {
          condition = false;
        }
    }
    // for (int i = 0; i<5; i++) {
    //   printMessage("Hello, World!");  
    // }
  
    return 0;  
}
```

**for循环可以做任何事，不一定非要 i = 0,i++ 之类的，非常无聊**

C++ 也有 while，do while 使用方法跟其他的大同小异，所以没什么好说的。

### C++控制语句



**C++三个主要的控制流语句：continue,break,return 跟 JS 差不多**

#### continue

continue 只能在循环中使用，基本上，continue 表示进行这个循环的下一个迭代，如果没有就会结束。

#### break

break 主要用于循环中，然后它也出现在 switch 语句中，基本上，break意思是要跳出循环，也就是终止循环。

#### return

return会完成脱离你的函数，如果你在一个函数中，碰到了一个 return 关键字，你会退出这个函数。当然函数可能需要一个返回值，如果只有 return，你只能返回 return 本身。

return本身只适用于 void 函数，如果你的函数需要返回值的话，你需要为它提供一个值。



这些控制流语句可以用在所有的循环语句中，因此 for 循环，while 循环，do-while 循环，工作方式是一样的。

