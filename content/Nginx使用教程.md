---
title: 'Nginx使用教程'
description: 'Nginx服务器的安装、配置和反向代理设置'
date: '2024-11-01'
tags: ['Nginx', '服务器', '反向代理']
---

# Nginx使用教程

## 一、安装Nginx
```bash
apt install nginx                   # 安装
systemctl start nginx.service       # 启动
systemctl reload nginx.service      # 重启
systemctl enable nginx.service      #开机自启动

# nginx配置文件
目录：/etc/nginx/conf.d             #存放server块配置文件的目录，用于反向代理
文件：/etc/nginx/conf.d             #全局配置文件
目录：/var/log/nginx                #日志目录
目录：/usr/share/nginx/html         #网站文件目录
```

## 二、配置反向代理
创建default.conf文件，复制下面内容到文件。然后将default.conf文件复制到/etc/nginx/conf.d目录
```bash
server {
    listen 80;                                 # 监听的端口
    server_name dalualex.com;                  # 监听的域名，多个域名用空格隔开
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 1024m;            # 文件上传大小限制
    }
}

# 访问 dalualex.com 直接重定向到本机的 http://localhost:3000
# server_name可以使用多个域名，因此一台服务器上可以安装多个应用，同时都监听80端口。这就是反向代理的作用
```

## 三、重启Nginx
```bash
systemctl reload nginx.service     # 重启
```

## 四、使用Cloudflare配置DNS
![](https://picgo.dalualex.com/20241101191639.png)
- A记录（Address Record）
功能：将域名映射到一个IPv4地址。
示例：example.com A 192.0.2.1
- AAAA记录
功能：将域名映射到一个IPv6地址。
示例：example.com AAAA 2001:0db8:85a3:0000:0000:8a2e:0370:7334
- CNAME记录（Canonical Name Record）
功能：将一个域名别名指向另一个域名。
示例：www.example.com CNAME example.com
> 代理状态设为开启，Cloudflare会默认将DNS解析到Cloudflare的服务器上，自动添加SSL证书，不需要手动添加SSL证书。

此时，访问域名 https://dalualex.com 即可看到Nginx反向代理的页面。

## 参考：使用Nginx配置SSL证书
1. 按照云服务商要求步骤，申请号证书文件，并下载到本地，然后复制到nginx的配置文件目录下，即/etc/nginx
2. 在/etc/nginx/conf.d目录下，新建app.conf，将下面内容复制进去
```bash
server {
    listen 443 ssl;
    server_name duoduoduizhang.icu;                                         #填写您的证书绑定的域名
    ssl_certificate duoduoduizhang.icu_bundle.crt;                          #填写您的证书文件名称
    ssl_certificate_key duoduoduizhang.icu.key;                             #填写您的私钥文件名称
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;                                    # 可参考此 SSL 协议进行配置
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;     #可按照此加密套件配置，写法遵循 openssl 标准
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```