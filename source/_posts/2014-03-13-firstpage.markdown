---
layout: post
title: "搭建Octopress无法发现Source分支"
date: 2014-03-13 16:07:00 +0800
comments: true
categories: github
---

Octopress已经成功部署完毕，但是按照Octopress上的教程把Source文件夹Push到我的Octopress博客上所在的repository进行备份时，发生错误：

    ERROR: Repository not found.
    fatal: The remote end hung up unexpectedly  
要么
    
    error: src refspec source does not match any.  
    error: failed to push some refs to 'git@ github.com USERNAME/ USERNAME.github.com.git'  
**主要原因：** 把源代码Push到了Master仓库上  
**解决方案：**

    git remote rm origin  
    git branch -D source  
    git remote add origin git@github.com:sandylaw/  sandylaw.github.com  
    git branch source  
    git commit -m "wenben"  
    git push origin source  

