---
title: "密码加密"
date: "2023-07-02 23:57:57"
categories:
  - Understanding
---

分类只有两类，你愿听的和不愿听的；结论你得根据愿和不愿自己下，而不是在别人的结论指导下发现你愿听和不愿听。

---

> 即使黑客访问你的系统时，你的密码依然安全。

### 三种方式存储你的密码（以明文形式存储），（使用加密技术），（所谓的哈希函数）

- 以明文形式存储（危险）
- 获取用户密码并在存储之前使用加密密钥对其进行加密（这将阻止黑客获取用户的实际密码，但它仍然非常危险）
> 加密层仍是明文密码，因此如果攻击者，也设法窃取加密密钥，它可以解锁所有密码

## 哈希函数

哈希函数接受一个输入，这可以是一段文本，或密码，或文件并将其转换为字符串。
**有许多不同的哈希函数可用**
> 哈希函数与密码学有很大不同，因为它们只能单向工作，你可以计算密码的哈希值，但是你不能获取哈希值并将其转换回来到原始数据

**通过哈希值，可以验证你正在使用正确的密码登陆，无需存储你的实际密码。**

> 大多数哈希算法都针对速度进行了优化，每秒的哈希值越多，这使得它们变得脆弱，对抗暴力攻击。
> 通过简单尝试各种密码，攻击者就可以反转哈希值，现代 CPU 完全可以做到，只是时间问题。

## 彩虹表
预先计算哈希值列表，用于快速查找弱密码。

> 相同的密码转换为哈希值一样，这也带来了一个问题，我们可以在密码之前添加所谓的 “Salt” 对其进行哈希（加密）
> salt 只是一些随机数据，但它保证你的密码哈希值始终是唯一的。

**随着时间推移，计算机越来越快并进行暴力攻击为了解决，我们所要做就是增加成本参数，以便算法保持对这些攻击的抵抗力**







