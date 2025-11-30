---
title: '树莓派配置软路由OpenWRT教程'
description: '使用树莓派和Docker搭建OpenWRT软路由系统'
date: '2024-08-20'
tags: ['树莓派', 'OpenWRT', '软路由']
---

# 树莓派配置软路由OpenWRT教程

# 一、树莓派安装ubuntu系统
![](https://picgo.dalualex.com/Untitled.png)

# 二、安装Docker
`sudo apt install docker.io`

# 三、安装OpenWRT
## 1、开启网卡混杂模式

`sudo ip link set eth0 promisc on`

注意，上述指令在树莓派重启时会失效，需要将其添加到启动参数中，步骤如下：

一、首先需要新建一个/etc/rc.local并添加可执行权限

```
sudo touch /etc/rc.local
sudo chmod +x /etc/rc.local
```

 内容如下：

```bash
#!/bin/sh -e
## rc.local## This script is executed at the end of each multiuser runlevel.# Make sure that the script will "exit 0" on success or any other# value on error.## In order to enable or disable this script just change the execution# bits.## By default this script does nothing.

ip link set eth0 promisc on
exit0
```

二、添加systemd程序

`sudo vim /etc/systemd/system/rc-local.service`

内容如下：

```
[Unit]
 Description=/etc/rc.locru锅
```

三、启动systemd程序

```
sudo systemctl enable rc-local
sudo systemctl start rc-local.service
sudo systemctl status rc-local.service
```

然后重启树莓派，执行`ip addr`，如果内容包括`PROMISC`则表示上述操作成功!

> 如果网卡没有开启，需要手动开启网卡，`ip link set eth0 down/up`

![](https://picgo.dalualex.com/Untitled1.png)

## 2、安装openwrt

1、创建网络
`docker network create -d macvlan --subnet=192.168.0.0/24 --gateway=192.168.0.1 -o parent=eth0 macnet`

**subnet，gateway**需要根据树莓派所处的网段进行修改，使用`ip addr`命令，如果树莓派所处的网络在192.168.0.x网段内，则可以根据上述命令进行操作，如果在192.168.1.x网段内，则需要将192.168.0修改为192.168.1

可以使用`docker network ls`查看建立的网络

![](https://picgo.dalualex.com/Untitled2.png)

2、启动容器
`sudo docker run --restart always --name openwrt -d --network macnet --privileged registry.cn-shanghai.aliyuncs.com/suling/openwrt:rpi3 /sbin/init`

![](https://picgo.dalualex.com/Untitled3.png)

3、修改容器相关参数

进入容器：
`docker exec -it openwrt bash`

编辑OpenWrt的网络配置文件
`vim /etc/config/network`

修改`lan`的相关内容

```
config interface 'lan'
        option ifname 'eth0'
        option proto 'static'
        option netmask '255.255.255.0'
        option ip6assign '60'
        option ipaddr '192.168.0.199' #修改一个静态地址，可以通过这个地址访问到树莓派
        option gateway '192.168.0.1' #软路由网关地址，修改为主路由器地址
        option dns '192.168.0.1'     #软路由dns地址，修改为主路由器地址
```

需要重启网络
`/etc/init.d/network restart`

# 四、设置openwrt

通过上述配置的ipaddr，访问树莓派控制页，用户名为：`root`，密码为：`password`

![](https://picgo.dalualex.com/Untitled4.png)

![](https://picgo.dalualex.com/Untitled5.png)

# 五、路由器设置-将树莓派作为旁路由

---

## 1、主路由设置

![](https://picgo.dalualex.com/Untitled6.png)

这样设置后，连接到主路由的设备，会自动将设备的网关地址变为软路由的地址

## 2、副路由设置

![](https://picgo.dalualex.com/Untitled7.png)

将副路由的网关地址设置为软路由地址，所有连接到副路由的设备信息流都通过软路由。