const withExportImages = require('next-export-optimize-images')

module.exports = withExportImages({
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['bibooo.cn', 'gravatar.loli.net'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    name: 'Angel eyes', //名称
    description: '往事随风', //简介
    keywords: '習慣孤獨, Angel eyes, Bibooo,bibooo,持续学习,音乐,技术分享,开源', //关键词
    content: '身份只是本质的一种形式，而我的本质是一个戴面具的.人。在你眼帘中的，是一位低贱的杂耍老手，他在命运的沉浮中随波逐流，扮演着受害与加害者的双重主角，这面孔，不徒是虚华的外表，它还是业已不再的人民呼声的残响，但是，不惮于重提昔日烦恼的他，依然活力怏然，决心铲除那些腐败堕落的毒虫，他们是作恶的先锋，他们代表了对自由意志肆无忌惮的恶意破坏，对他们裁决只有复仇，这象征期望的血海深仇不会是徒然的，因为它的价值和正确性，终有一天会证明，那些高尚者和警醒者是对的。',
    MONGODB_URI:'mongodb+srv://bibooo:112483051zl@cluster0.phlxqev.mongodb.net/?retryWrites=true&w=majority',
    nav: [{ //顶部导航菜单
      id:'about', //页面id 此处id会设置 http://域名/pages/about 的链接
      title:'About', //cls
    },{
      id:'links',
      title:'Link',
    },{
      id:'archives',
      title:'Archive',
    }],
    links: [{ //友链
        name: "淡白博客",
        url: "https://p00q.cn/",
        img: "https://cdn.v2ex.com/gravatar/581961423c604841d0a4b2736214e035?s=256&d=mm",
        text: "世界那么大，期待遇到你。"
      },
      { //友链
        name: "優萌初華",
        url: "https://shoka.lostyu.me/",
        img: "https://cdn.jsdelivr.net/gh/amehime/shoka@latest/images/avatar.jpg",
        text: "梦中梦亦假。"
      },
      { //友链
        name: "c0sMx",
        url: "https://www.c0smx.com/",
        img: "https://sdn.geekzu.org/avatar/606d0d05a94d61c1468cad163d75db72?s=100&r=X&d=",
        text: "非常愿意与你们做朋友。"
      },
      { //友链
        name: "Zane Liu's Blog",
        url: "https://lza59.com/",
        img: "https://lza59.com/favicon.jpg",
        text: "🌸以梦为马，不负韶华🔥。"
      },
      { //友链
        name: "DragonJay",
        url: "https://blog.fanjunyang.zone",
        img: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/Sakura/images/smilies/icon_%20https.gif",
        text: "My web3 blog。"
      },
      { //友链
        name: "lzp的个人网站",
        url: "https://www.liuzepeng.com",
        img: "https://liuzepeng.com/author.png",
        text: "唯有热爱，可抵岁月漫长。"
      },
      { //友链
        name: "idealclover",
        url: "https://idealclover.top/",
        img: "https://image.idealclover.cn/blog/assets/icon.png",
        text: "Stay simple, stay naive。"
      },
      { //友链
        name: "恶魔菌の记事簿",
        url: "https://meow3.family.blog/",
        img: "https://mewfamilyblog.files.wordpress.com/2019/03/f39fd-e79fade58f91e7b4abe889b2e7b3bbe5a4b4e5838f.jpeg",
        text: "半文艺、半动漫的二次元美少女的涂鸦簿！。"
      },
      { //友链
        name: "欧尼酱",
        url: "https://www.nothamor.cn/",
        img: "https://cdn.nothamor.cn/5ae46811094e6.jpg",
        text: "浑水摸鱼的咸鱼一条，伪Geek。"
      },
      { //友链
        name: "撩趣℃",
        url: "https://blog.tomhuang2000.com/",
        img: "https://blog.tomhuang2000.com/files/logo.png",
        text: "Tom Huang's Blog。"
      },
      { //友链
        name: "MrWu",
        url: "https://www.mrwu.red",
        img: "https://www.mrwu.red/favicon.ico",
        text: "网络安全博客,分享黑客攻防技术和WordPress笔记。"
      },
      { //友链
        name: "艾超博客",
        url: "https://icharle.com",
        img: "https://icharle.com/logo/logo.png",
        text: "勿忘初心，方得始终。"
      },
      { //友链
        name: "SycBlog",
        url: "https://www.php.wf",
        img: "https://www.php.wf/logo.png",
        text: "始於初見，止於終老。"
      },
      { //友链
        name: "橘纸柚",
        url: "https://lovemen.cc/",
        img: "https://lovemen.cc/usr/hotlink-ok/avatar.jpg",
        text: "我叫橘纸柚，当前坐标浙江的东方厨一枚，性格比较内向想交道更多朋友。"
      },
      { //友链
        name: "华岁云小屋",
        url: "https://www.vlo.cc/",
        img: "https://n.vlo.cc/uploads/2023/02/38aded5b5b16ae0c.png",
        text: "华岁De日常。"
      },
      { //友链
        name: "忆光博客",
        url: "https://blog.eray.cc/",
        img: "https://www.eray.cc/static/book.png",
        text: "忆光博客只分享属于我的世界。"
      },
    ],
  }
})
