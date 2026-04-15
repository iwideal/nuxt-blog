---
title: 'PM2使用教程'
description: 'Node.js进程管理器PM2的安装、配置和常用命令'
date: '2026-04-15'
tags: ['PM2', 'Node.js', '进程管理', '服务器部署']
---

# PM2 使用教程

PM2 是一个流行的 Node.js 进程管理器，用于生产环境中的进程管理、负载均衡和日志管理。

## 安装

### PM2 安装

```bash
# 使用 npm 安装
npm install -g pm2

# 或使用 bun
bun add -g pm2

# 验证安装
pm2 --version
```

## 常用命令

### 启动应用

```bash
# 基本启动
pm2 start app.js

# 启动并命名
pm2 start app.js --name my-app

# 启动多个实例（负载均衡）
pm2 start app.js -i 4

# 启动并监听文件变化自动重启
pm2 start app.js --watch
```

### 进程管理

```bash
# 查看所有进程
pm2 list
pm2 ls

# 查看某个进程的详细信息
pm2 show my-app

# 重启进程
pm2 restart my-app

# 停止进程
pm2 stop my-app

# 删除进程
pm2 delete my-app

# 暂停进程（保持内存）
pm2 pause my-app

# 恢复暂停的进程
pm2 resume my-app
```

### 日志管理

```bash
# 查看实时日志
pm2 logs

# 查看某个进程的日志
pm2 logs my-app

# 清空日志
pm2 flush

# 查看日志并跟踪
pm2 logs --lines 100 --nostream
```

### 监控

```bash
# 查看实时监控面板（CPU、内存）
pm2 monit

# 查看进程状态
pm2 list
```

### 集群模式

```bash
# 启动 4 个实例进行负载均衡
pm2 start app.js -i 4

# 根据 CPU 核心数启动
pm2 start app.js -i max

# 重新加载（零停机重启）
pm2 reload my-app

# 优雅重载
pm2 gracefulReload my-app
```

## 配置文件配置

### 创建 ecosystem 配置文件

```bash
# 生成配置文件
pm2 init
```

### 配置文件示例 (ecosystem.config.cjs)

```javascript
module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'bun',
      
      // 传递参数
      args: 'run ./app.js',
      
      // 环境变量
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      },
      
      // 日志配置
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      
      // 进程数量
      instances: 4,
      instance_var: 'INSTANCE_ID',
      
      // 集群模式
      exec_mode: 'cluster',
      
      // 自动重启
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      
      // 重新启动延迟
      restart_delay: 4000,
      
      // 尝试次数
      max_restarts: 10,
      min_uptime: '5s',
      
      // 开机自启
      pmx: true
    }
  ]
};
```

### 使用配置文件

```bash
# 使用配置文件启动
pm2 start ecosystem.config.js

# 指定环境启动
pm2 start ecosystem.config.js --env production
```

### 其他格式配置

也可以使用 JSON 格式 (`ecosystem.config.json`):

```json
{
  "apps": [
    {
      "name": "my-app",
      "script": "./app.js",
      "instances": 2,
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
}
```

## 开机自启配置

```bash
# 生成开机自启脚本
pm2 startup

# 保存当前进程列表
pm2 save

# 查看开机自启配置
pm2 startup
```

## 图形界面使用方法

### PM2 Plus

PM2 Plus 是 PM2 的付费图形化界面，提供更强大的监控功能。

#### 主要功能

- 实时 CPU/内存监控
- 进程异常告警
- 远程错误追踪
- 性能指标图表
- 自定义告警规则

#### 使用方法

1. 访问 [PM2 Plus](https://pm2.io/dashboard/) 注册账号
2. 在服务器上运行连接命令
3. 在 Web 界面查看和管理进程

```bash
# 连接服务器到 PM2 Plus
pm2 link <KEY> <SECRET>
```

### Keymetrics

Keymetrics 是 PM2 Plus 的旧版本，功能类似。

## 常用命令速查表

| 命令 | 说明 |
|------|------|
| `pm2 start app.js` | 启动应用 |
| `pm2 list` | 列出所有进程 |
| `pm2 stop my-app` | 停止进程 |
| `pm2 restart my-app` | 重启进程 |
| `pm2 delete my-app` | 删除进程 |
| `pm2 logs` | 查看日志 |
| `pm2 monit` | 监控面板 |
| `pm2 reload my-app` | 重载应用 |
| `pm2 save` | 保存进程列表 |
| `pm2 startup` | 设置开机自启 |

## 注意事项

1. **生产环境建议使用集群模式** - 充分利用多核 CPU
2. **合理设置内存限制** - 防止内存泄漏导致服务崩溃
3. **配置日志轮转** - 避免日志文件过大
4. **使用配置文件** - 方便在不同环境部署
5. **定期监控** - 关注 CPU 和内存使用情况

## 卸载 PM2

```bash
# 停止所有进程
pm2 kill

# 卸载
npm uninstall pm2 -g
```
