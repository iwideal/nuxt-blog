---
title: 'Mysql使用的常用小技巧'
description: 'Mysql数据库操作的实用技巧和方法'
date: '2024-12-10'
tags: ['Mysql', '数据库', '技巧']
---

# Mysql使用的常用小技巧

## 一、过滤重复数据
思路：创建临时表，将需要过滤的数据插入到临时表中，由于临时表字段上有唯一索引，所以可以忽略重复数据。然后使用临时表替换原来的数据表。
```sql
-- 创建临时表  
CREATE TEMPORARY TABLE temp_skus (  
    sku_id INT,  
    sku_name VARCHAR(255) UNIQUE,  
    email VARCHAR(255),  
    company VARCHAR(255),  
    sku_price DECIMAL(10, 2)  
);  

-- 插入数据，重复的sku_name会被忽略  
INSERT IGNORE INTO temp_skus (sku_id, sku_name, email, company, sku_price)  
SELECT sku_id, sku_name, email, company, sku_price  
FROM skus;  

-- 删除skus表，重新创建skus表 
DROP TABLE skus;

CREATE TABLE IF NOT EXISTS skus (  
    id INT AUTO_INCREMENT PRIMARY KEY,       
    email VARCHAR(100) NOT NULL ,            
    company VARCHAR(50) NOT NULL,            
    sku_id VARCHAR(50),    
    sku_name VARCHAR(255) UNIQUE NOT NULL,          
    sku_price DOUBLE NOT NULL                
);

-- 将临时表数据插入skus表  
INSERT INTO skus SELECT * FROM temp_skus; 
```