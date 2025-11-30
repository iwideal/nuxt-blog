---
title: 'Docker安装Wordpress'
description: '使用Docker快速部署Wordpress博客系统'
date: '2024-10-31'
tags: ['Docker', 'Wordpress', '部署']
---

# Docker安装Wordpress

## 1. 拉取镜像

```shell
docker pull wordpress
```

## 2. 创建容器
```shell
docker run -it --name mywordpress -p 9999:80 -v /home/ubuntu/mywordpress:/var/www/html -d wordpress
```

## 3. 使用caddy反向代理，并配置DNS解析
1. 编辑Caddyfile文件，添加如下内容：
    ```shell
    dalualex.com {
            reverse_proxy localhost:9999 {
                    header_up -Origin
            }
    }
    ```
2. 重新启动caddy服务：
    ```shell
    sudo caddy stop 
    sudo caddy start
    ```
3. 配置DNS解析，将域名解析到服务器IP地址。


## 4. 创建Mysql数据库，配置Wordpress
- 安装好mysql，创建数据库：dalualex
- 访问http://localhost:9999/wp-admin/setup-config.php ，按照提示配置即可。
>注意：数据库的ip地址为服务器的内网地址。

## 5. 解决Wordpress的URL问题（无样式表）
1. 进入docker映射的`/data`目录，打开`\wp-includes\functions.php`，找到代码
 **require( ABSPATH . WPINC . ‘/option.php’ );**
大概在第8行。
在下方添加以下代码：
```php
add_filter('script_loader_src', 'agnostic_script_loader_src', 20,2); function agnostic_script_loader_src($src, $handle) { return preg_replace('/^(http|https):/', '', $src); } 

add_filter('style_loader_src', 'agnostic_style_loader_src', 20,2); function agnostic_style_loader_src($src, $handle) { return preg_replace('/^(http|https):/', '', $src); }
```
2. 打开`\wp-config.php`文件找到代码
** 
@package WordPress
*/
在下方添加如下代码：
```php
$_SERVER['HTTPS'] = 'on';
define('FORCE_SSL_LOGIN', true);
define('FORCE_SSL_ADMIN', true);
```
3. 将WordPress地址(URL)、站点地址(URL)改为https://开头的链接地址(如https://dalualex.com)，后点击“保存更改”。
![](https://picgo.dalualex.com/20241031153242.png)

