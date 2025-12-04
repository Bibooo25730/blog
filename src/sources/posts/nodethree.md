---
title: "Node Crypto"
date: "2025-12-04 23:57:57"
categories:
  - Node
---

#### Console

使用 chalk 库（推荐）

#### Crypto 加密

##### 模块导入和特性检查
```
const crypto = require('crypto');

// 1. 检查支持的特性
console.log('支持的哈希算法:', crypto.getHashes());
console.log('支持的加密算法:', crypto.getCiphers());
console.log('支持的曲线:', crypto.getCurves());
console.log('支持的Diffie-Hellman组:', crypto.getDiffieHellman('modp14'));

// 2. 随机字节生成
const randomBytes = crypto.randomBytes(32); // 32字节 = 256位
console.log('随机字节 (hex):', randomBytes.toString('hex'));
console.log('随机字节 (base64):', randomBytes.toString('base64'));

// 3. 伪随机字节（性能更好，但安全性较低）
const pseudoRandomBytes = crypto.pseudoRandomBytes(32);
```

##### 哈希算法（Hash）

```
// 1. MD5（不推荐用于安全用途）
const md5 = crypto.createHash('md5');
md5.update('Hello World');
console.log('MD5:', md5.digest('hex')); // b10a8db164e0754105b7a99be72e3fe5

// 2. SHA-256（推荐）
const sha256 = crypto.createHash('sha256');
sha256.update('Hello World');
console.log('SHA-256:', sha256.digest('hex'));

// 3. 流式处理大文件
function hashFile(filePath, algorithm = 'sha256') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const fs = require('fs');
    const stream = fs.createReadStream(filePath);
    
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

// 4. 同时计算多个哈希
function multiHash(data) {
  const algorithms = ['md5', 'sha1', 'sha256', 'sha512'];
  const results = {};
  
  for (const algo of algorithms) {
    const hash = crypto.createHash(algo);
    hash.update(data);
    results[algo] = hash.digest('hex');
  }
  
  return results;
}

```
##### HMAC（密钥哈希）
```
```
##### 加密和解密

对称加密（AES）. 

加密模式和填充. 

##### 非对称加密（RSA）
密钥生成和加密. 

性能优化：混合加密. 


##### 密码学安全函数
密码哈希（bcrypt替代）. 


##### 时序安全比较
什么是时序攻击？  

想象一下：有个保险箱的密码是 6位数字。你偷看别人开保险箱，发现：  


如果第一个数字就错了，他立即就发现打不开. 


如果第二个数字才错，他稍微慢一点发现打不开. 


如果前五个数字都对，最后一个错了，他最慢才发现打不开. 


这样，你通过观察时间长短，就能慢慢猜出正确密码！  


这就是时序攻击（Timing Attack）. 

攻击者通过测量程序运行的时间差异，来推测敏感信息。  

```
const crypto = require('crypto');

function timingSafeCompare(a, b) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  
  // crypto.timingSafeEqual 总是花费相同时间！
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}
```
时序安全比较（安全）. 

###### 实际应用场景
用户会话验证. 

密码重置令牌. 

场景3：API签名验证. 

### 什么时候需要用时序安全比较？ 
必须使用的情况：  

密码验证（对比哈希值）. 


API密钥验证. 


会话令牌验证. 


重置密码令牌. 


数字签名验证. 


任何涉及密钥/令牌比较的地方. 


不需要使用的情况：  

比较非敏感数据（如用户名、邮箱格式）. 


数据库查询条件（数据库本身可能有时序问题）. 


业务逻辑判断（如检查订单状态）. 

  
时序安全比较的核心要点：  

 
固定时间：无论比较的数据是否匹配，执行时间都相同. 


防止信息泄露：攻击者无法通过测量时间来推测正确值. 


关键场景：所有涉及密钥、令牌、密码等敏感信息的比较. 


Node.js实现：使用 crypto.timingSafeEqual(). 


注意长度：比较前要确保Buffer长度相同，否则要先处理. 

只要是比较密钥、令牌、密码等敏感信息，就用 crypto.timingSafeEqual()！  

##### 数字证书和SSL/TLS

```
Let's Encrypt免费证书
证书类型表
类型	验证级别	适用场景	价格	浏览器显示
DV证书	域名验证	个人网站、博客	免费-几十美元	🔒 绿色锁
OV证书	组织验证	企业官网	$100-$500/年	🔒 绿色锁+公司名
EV证书	扩展验证	银行、电商	$500-$2000/年	🔒 绿色锁+公司名+绿色地址栏
自签名	无验证	内部系统、开发	免费	🔴 红色警告
```

##### Diffie-Hellman 密钥交换

##### 实用工具函数
安全随机数生成。

数据完整性验证. 

场景1：用户密码存储  
 
场景2：API请求签名  

场景3：安全配置文件加密

### Node.js Debugger 完全指南

内置调试器基础使用. 

```
# 方法1：直接调试
node inspect app.js

# 方法2：附加到正在运行的进程
node --inspect app.js          # 默认端口9229
node --inspect=9229 app.js     # 指定端口
node --inspect-brk app.js      # 第一行就断点

# 方法3：远程调试
node --inspect=0.0.0.0:9229 app.js  # 允许远程连接
```
基本调试命令  

##### 连接 Chrome DevTools

```
# 启动调试
node --inspect app.js

# 输出类似：
# Debugger listening on ws://127.0.0.1:9229/...
```

##### 实用调试技巧

```
// 在代码中使用 debugger 语句
function processData(data) {
  debugger; // 手动断点
  
  // 条件调试
  if (data.length > 100) {
    console.log('数据过大');
    debugger; // 条件断点
  }
}
```
网络请求调试. 


```
const http = require('http');

// 启用详细的调试信息
process.env.NODE_DEBUG = 'http';

http.createServer((req, res) => {
  console.log('请求头:', req.headers);
  debugger; // 检查请求
  res.end('Hello');
}).listen(3000);

```

1. 内存泄漏调试

```
# 生成堆快照
node --inspect --heapsnapshot-on-signal app.js

# 或使用 Chrome DevTools Memory 面板
```

2. CPU 性能分析

```
# 生成CPU性能文件
node --inspect --cpu-prof app.js

# 分析性能瓶颈
node --prof app.js
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

3. 异步代码调试

```
async function fetchData() {
  debugger; // 1. 这里会暂停
  
  const response = await fetch('...');
  debugger; // 2. await 后继续调试
  
  const data = await response.json();
  debugger; // 3. 可以检查数据
  
  return data;
}
```
调试 Promise. 

```
// 启用未处理Promise警告
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  debugger;
});

// 或在 async 函数中
async function test() {
  try {
    await someAsyncOperation();
  } catch (error) {
    console.error(error);
    debugger; // 错误发生时暂停
  }
}
```

调试内存问题. 

```
// 记录内存使用
setInterval(() => {
  const used = process.memoryUsage();
  console.log(`内存使用:
    RSS: ${Math.round(used.rss / 1024 / 1024)}MB
    HeapTotal: ${Math.round(used.heapTotal / 1024 / 1024)}MB
    HeapUsed: ${Math.round(used.heapUsed / 1024 / 1024)}MB`);
}, 10000);
```

Docker 容器调试. 

```
# Dockerfile
FROM node:16
EXPOSE 9229  # 调试端口
CMD ["node", "--inspect=0.0.0.0:9229", "app.js"]
```

# 运行并映射调试端口
docker run -p 3000:3000 -p 9229:9229 -d myapp. 

📝 八、最佳实践
使用 Source Maps - 便于调试 TypeScript 或转译代码. 

设置 NODE_OPTIONS - export NODE_OPTIONS="--inspect=9229". 

合理使用断点 - 避免过多断点影响性能. 

日志分级 - 结合调试器和日志输出. 

团队标准化 - 统一的调试配置和流程. 
  