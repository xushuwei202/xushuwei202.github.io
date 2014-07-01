---
layout: post
title: "安装mysql5.7.3 出现错误Unable to update security settings. Access denied for user 'root'@'localhost'"

date: 2014-07-01 14:51:55 +0800
comments: true
categories: mysql
---

安装过mysql后，启动报错，又重新安装了一次mysql,在安装的过程当中出现以上错误，解决方案如下：在最后的配置页面“Current root password”选项不填写任何东西，只填写新的密码，即可解决问题。
