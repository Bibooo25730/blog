---
title: "Ubuntu 下使用 Clash For Windows"
date: "2023-06-25 03:57:57"
categories:
  - Ubuntu
---

走就走了，还带走了我的鲍勃马利

---

### 下载

> github 发行版下载 linux.gz


### 安装

> 解压之后
````
ubuntu@ubuntu:~/.app/clash$wget https://cdn.jsdelivr.net/gh/Dreamacro/clash@master/docs/logo.png	# 下载clash icon做为桌面图标
ubuntu@ubuntu:~/.app/clash$vim clash.desktop
# 输入下面的内容
[Desktop Entry]
 Name=clash
 Comment=Clash
 Exec=/home/你的用户名/.app/clash/cfw
 Icon=/home/你的用户名/.app/clash/logo.png
 Type=Application
 Categories=Development;
 StartupNotify=true
 NoDisplay=false

 ubuntu@ubuntu:~/.app/clash$ sudo mv clash.desktop /usr/share/applications/
````

### 应用里面

导入节点
