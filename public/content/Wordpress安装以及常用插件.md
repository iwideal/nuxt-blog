---
title: 'Wordpress安装以及常用插件'
description: 'Wordpress的Docker安装方法和常用插件推荐'
date: '2024-11-25'
tags: ['Wordpress', '插件', 'Docker']
---

# Wordpress安装以及常用插件

### 一、Docker安装Wordpress
1. 安装wordpress
```bash
sudo docker run -it --name dalualex -p 9999:80 -v /home/ubuntu/dalualex:/var/www/html -d wordpress
```
2. 域名解析和反向代理配置
3. 创建mysql数据库
4. 网站初始化设置
打开网址：http://dalualex.com/wp-admin/install.php ,按照提示完成网站初始化设置。
5. 修改wp-config.php
初始化设置后，网站会没有样式，因为没有配置SSL，需要进行一下设置：
- 安装插件Really Simple Security；
- 修改wp-config.php文件，添加以下代码：
    ```php
    //Begin Really Simple Security Server variable fix
    $_SERVER["HTTPS"] = "on";
    //END Really Simple Security
    ```
### 二、Wordpress常用插件

- 网站加速
  - **W3 Total Cache**
- SEO优化
  - **Yoast SEO**

- 谷歌分析
  - **Site Kit by Google**
- 邮件模板
  - **yaymail**
- 多语言插件
  - **weglot**
- 网站搬家
  - **all in one migation**
- 增强woocommerse功能的插件
  - 代码运行：**Code Snippets**
   ```php
    //隐藏Woocommerce商城中的加入购物车功能和实现隐藏价格标签的代码

    add_filter( 'woocommerce_is_purchasable', '__return_false');
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );

    // 如果你不想要显示提示信息，请把这一段删除即可
    add_action( 'woocommerce_single_product_summary', 'optional_message', 20 );
    function optional_message() {
    echo '<p class="woocommerce-message">Please send an email to iwideal@outlook.com to contact us.</p>';
    }

    // 隐藏商品价格，如果不想隐藏价格，请把这一段删除即可
    add_filter( 'woocommerce_get_price_html', 'woocommerce_remove_price');
    function woocommerce_remove_price($price){    
        return ;
    }
   ```
   - 增强运费设置：**Flexible Shipping**
   - 增强折扣设置：**Discount Rules Core**
   - 增强收藏夹功能：**YITH WooCommerce Wishlist**