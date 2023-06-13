---
title: "python"
date: "2023-11-13 23:57:57"
categories:
  - python
---

python 爬取博客文章页方便收录。

---


python果然适合爬虫，这语法太简洁了，写其他的可能你会要回收内存什么的，写node你还得写一坨异步

```
import requests

from bs4 import BeautifulSoup

url = "https://www.bibooo.cn/"

response = requests.get(url)

soup = BeautifulSoup(response.content,"html.parser")
links = []

for li in soup.find_all('li',{'class':'py-6'}):
    for a in li.find_all('a'):
        links.append(a['href'])


linksarr = []

for i in links:
    linksarr.append( url +i)



with open('links.txt','w') as f:
    for link in linksarr:
        f.write(link)
        f.write('\n')

```

