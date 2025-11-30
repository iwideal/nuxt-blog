---
title: 'Caddy使用教程'
description: 'Caddy Web服务器的安装、配置和使用指南'
date: '2024-09-02'
tags: ['Caddy', '服务器', '教程']
---

# Caddy使用教程

![](https://picgo.dalualex.com/202409025153.png)

Caddy是一个开源、跨平台的Web服务器，支持HTTP/2的TLS加密和自动HTTPS。它还支持反向代理、自动HTTPS、WebSocket、Websockets等功能。
重要的是，Caddy自带了一个内置的HTTP/2服务器，支持自动TLS，Caddy可以自动申请并续期Let's Encrypt的证书。对于繁琐的TLS配置，Caddy可以自动完成所有操作。
并且不用担心云服务商的SSL证书到期问题。
# 一、Ubuntu安装

1、从[github](https://github.com/caddyserver/caddy/releases)上下载最新版本的Caddy。下载相应的版本。

[https://github.com/caddyserver/caddy/releases](https://github.com/caddyserver/caddy/releases)

2、上传到服务器，安装

```bash
#安装
dpkg -i  caddy_2.7.6_linux_amd64.deb

#卸载
dpkg -r  caddy
```

3、安装完成后，校验是否成功。

```bash
caddy version
```

# 二、Caddy常用命令

```jsx
caddy adapt                             将配置文档适配为原生JSON
caddy build-info                        打印构建信息
caddy environ                           打印环境
caddy file-server                       一个简单但可用于生产的文件服务器
caddy fmt                               格式化一个 Caddyfile
caddy hash-password                     散列密码并输出 base64
caddy help                              查看 caddy 命令的帮助
caddy list-modules                      列出已安装的 Caddy 模块
caddy reload                            更改正在运行的 Caddy 进程的配置
caddy reverse-proxy                     一个简单但可用于生产的 HTTP(S) 反向代理
caddy run                               在前台启动 Caddy 进程
caddy start                             在后台启动 Caddy 进程
caddy stop                              停止正在运行的 Caddy 进程
caddy trust                             将证书安装到本地信任存储中
caddy untrust                           不信任来自本地信任存储的证书
caddy upgrade                           将 Caddy 升级到最新版本
caddy add-package                       将 Caddy 升级到最新版本，添加了额外的插件
caddy remove-package                    将 Caddy 升级到最新版本，删除了一些插件
caddy validate                          测试配置文件是否有效
caddy version                           打印版本
```

# 三、使用Caddyfile配置文件创建服务

> **`在创建Caddyfile文件的目录下运行Caddy start命令，即可生效Caddyfile中的配置`**
> 

1、创建一个文本文件Caddyfile（无后缀）

2、文件中写入如下代码：

```jsx
localhost

respond "Hello, world!"
```

3、保存文件并在当前包含Caddyfile的目录下运行命令：

```jsx
caddy start

测试：
curl https://localhost
Hello, world!
```

4、查看caddy运行状态

**`systemctl status caddy.service`**

# 四、使用Caddyfile配置反向代理
1、创建一个文本文件Caddyfile（无后缀），并写入如下代码：
```jsx
dalualex.com {
  reverse_proxy  localhost:9999 {
    header_up -Origin
  }
}

portainer.dalualex.com {
  reverse_proxy  localhost:9000 {
    header_up -Origin
  }
}
```
2、保存文件并在当前包含Caddyfile的目录下运行命令：
`caddy start`；如果未停止caddy服务，则先运行`caddy stop`暂停caddy服务器。

# 五、生产环境配置
在生产环境中，其配置与nginx类似，先将反向代理信息配置到配置文件中，然后启动服务，即可生效配置。
> 生产环境切勿使用caddy命令方式（如：caddy start生效Caddyfile的配置），而是使用systemd管理caddy服务。

- 编辑`/etc/caddy/Caddyfile`文件，配置caddy
- 启动caddy：`sudo systemctl start caddy.service`
- 如果修改了配置文件后，要重新启动caddy：`sudo systemctl reload caddy.service`

在生产环境中，**不建议直接使用 `caddy start` 命令来运行 Caddy**。这种方式虽然简单，但缺乏对服务的有效管理，无法保证高可用性和稳定性。以下是原因及推荐的生产环境运行方式：

---

### 为什么不建议使用 `caddy start`？
1. **缺乏服务管理**：
   - `caddy start` 是以前台进程方式运行，终端关闭后服务会停止。
   - 无法自动重启崩溃的服务。

2. **日志管理不便**：
   - 日志直接输出到终端，不方便集中管理和归档。

3. **无法集成到系统服务**：
   - 无法使用系统的服务管理工具（如 `systemd`）来监控和管理 Caddy。

4. **不适合自动化运维**：
   - 生产环境通常需要自动化部署和监控，`caddy start` 无法满足这些需求。

---

### 推荐的生产环境运行方式

#### 1. 使用 `systemd` 管理 Caddy
`systemd` 是 Linux 系统的服务管理工具，可以确保 Caddy 以守护进程方式运行，并支持自动重启、日志管理等功能。

##### 步骤：
1. **创建 `systemd` 服务文件**：
   编辑 `/etc/systemd/system/caddy.service` 文件：
   ```ini
   [Unit]
   Description=Caddy
   Documentation=https://caddyserver.com/docs/
   After=network.target

   [Service]
   User=caddy
   Group=caddy
   ExecStart=/usr/bin/caddy run --config /etc/caddy/Caddyfile
   ExecReload=/usr/bin/caddy reload --config /etc/caddy/Caddyfile
   TimeoutStopSec=5s
   LimitNOFILE=1048576
   LimitNPROC=512
   PrivateTmp=true
   ProtectSystem=full
   AmbientCapabilities=CAP_NET_BIND_SERVICE

   [Install]
   WantedBy=multi-user.target
   ```

2. **设置权限**：
   ```bash
   sudo chmod 644 /etc/systemd/system/caddy.service
   ```

3. **启动并启用服务**：
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start caddy
   sudo systemctl enable caddy
   ```

4. **检查状态**：
   ```bash
   sudo systemctl status caddy
   ```

5. **查看日志**：
   ```bash
   sudo journalctl -u caddy --no-pager | less
   ```

---

# 六、常见错误

- 使用caddy start启动caddy服务器，报错2019端口被占用
    
    
    1、报错如下：
    
    2024/08/31 13:47:27.872 INFO    using adjacent Caddyfile
    Error: loading initial config: loading new config: starting caddy administration endpoint: listen tcp 127.0.0.1:2019: bind: address already in use
    Error: caddy process exited with error: exit status 1
    
    2、解决方法：
    
    `systemctl stop caddy.service`或者`caddy stop`  停止caddy服务
    
    `caddy start`   启动caddy
    
    3、原因：
    
    在服务器启动时，caddy自启动，会监听2019端口，此时再使用`caddy start`  ，相当于又开启了一个caddy，就会报错端口被占用。所以，先将caddy停掉，然后再启动，启动时自动读取Caddyfile，来达到
    
- 安装完成caddy之后，无法启动caddy服务
  1、现象
  使用`systemctl status caddy.service`命令，查看caddy状态，显示faild，表示未启动caddy服务。
  2、原因
  caddy启动时，需要占用三个端口：80、443、2019。
  - 80：http协议端口
  - 443：https协议端口
  - 2019：caddy运行端口
  
  如果之前安装了nginx，则会占用80和443端口，此时需要将nginx关闭，并且关闭80和443端口。
  ```bash
  #查看端口是否被占用
  sudo netstat -tuln | grep -E '(:80|:443)'

  # 解决方法
  systemctl stop nginx
  kill -9 80
  kill -9 443
  ```
  此时再启动caddy服务：`systemctl start caddy.service`