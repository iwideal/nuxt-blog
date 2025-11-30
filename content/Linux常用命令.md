---
title: 'Linux常用命令'
description: 'Linux系统管理和操作的常用命令集合'
date: '2025-02-17'
tags: ['Linux', '命令', '系统管理']
---

# linux常用命令

![](https://picgo.dalualex.com/20240925192816.png)

# 文件管理

```bash
ls                              显示工作目录下的内容
pwd                             显示当前路径
mkdir                           创建按目录
cp                              复制文件或目录 -r递归复制 -f若目标文件已存在，则覆盖原文件
mv /dir1 /dir2                  将dir1移动到dir2中
touch                           filename 创建文件
cd cd..                         进入退出目录
rm -rf                          递归删除文件或目录
chmod 777                       dir 修改文件和文件夹权限
chmod -R 777 [dir]              对文件夹下的所有文件和文件夹执行读、写、可执行权限
tree                            查看文件夹结构
```

# 包管理

```bash
apt [update|upgrade|install|remove|--fix-broken install]
dpkg -i
aptitude 与apt-get不同的是，aptitude在处理依赖问题上更佳一些。举例来说，aptitude 在删除一个包时，会同时删除本身所依赖的包。这样，系统中不会残留无用的包，整个系统更为干净。它通过文本操作菜单和命令两种方式管理软件包。
```

# 磁盘管理

```bash
fdisk -l                    列出所有次磁盘设备文件
fdisk                       /dev/sda1 选择操作的磁盘，例如分区
df -h                       显示文件系统挂载点信息
mount                       /dev/sda1 /mnt/sad 挂载分区
umount                      /dev/sda1 卸载分区
mkfs -t ext4 /dev/sda1      将文件系统格式化为ext4格式
```

# 网络传输

```bash
curl [url]                          将url内容打印到控制台
curl -o ./demo.html [url]           将文件下载到指定目录并重命名
curl -O [url]                       将文件下载到当前目录并使用原名

wget -P /home/ubuntu [url]          将文件下载到/home/ubuntu目录(支持http和ftp协议)
```

# 解压缩

| 项目（打包解压） | 压缩 | 解压 |
| --- | --- | --- |
| zip格式 | zip -r [目标文件名].zip [原文件/目录名] | unzip [原文件名].zip |
| tar格式 | tar -cvf [目标文件名].tar [原文件/目录名] | tar -xvf [原文件名].tar |
| tar.gz格式 | tar -zcvf [目标文件名].tar.gz [原文件/目录名] | tar -zxvf [原文件名].tar.gz |
| tar.bz2格式 | tar -jcvf [目标文件名].tar.bz2 [原文件/目录名] | tar -jxvf [原文件名].tar.bz2 |
| tar.xz格式 | xz [原文件名].tar | unxz [原文件名].tar.xz |

# 服务管理

服务本质就是进程，但是是运行在后台的，通常都会监听某个端口，等待其他程序的请求，如（mysql,sshd,防火墙等），因此我们有称为守护进程。

服务目前基本都是使用systemd来管理，其脚本存放于`/lib/systemd/system`这个目录下面，这些脚本，基于都是使用 bash shell 编写的。
![](https://picgo.dalualex.com/20250217181844.png)
需要启停服务，或者查看服务的运行状态，可以通过下面的方法来处理：
```bash
systemctl [start|stop|reload|status] [服务名]
systemctl [enable|disable] [服务名]                     #开机打开/关闭自启动服务
systemctl list-unit-files --type=service                #查看所有服务

#查看常用服务状态
sudo systemctl status caddy.service
sudo systemctl status nginx.service
sudo systemctl status mysql.service
```
查看服务状态信息：
![](https://picgo.dalualex.com/Snipaste_2025-02-17_18-07-46.png)
- `Loaded: loaded`：表示服务的文件已经加载
- `/lib/systemd/system/caddy.service`：服务脚本存放位置
- `enabled`：软件开机自启动
- `vendor preset: enabled`：软件包由软件提供商提供
- `Active: active (running)`：软件正在运行
- `ExecReload=/usr/bin/caddy reload --config /etc/caddy/Caddyfile --force`：软件启动时的命令，可以看到其配置文件为`/etc/caddy/Caddyfile`
# 文档编辑

```bash
vim index.html
两种模式：编辑模式和命令行模式，相互切换i键和ESC键
- 切换至插入模式编辑文件

在「命令行模式」下按一下字母「i」就可以进入「插入模式」

- 切换至命令行模式

按一下「ESC」键转到「命令行模式」

- 退出vi及保存文件

在「命令行模式」下，按一下「：」冒号键进入「Last line mode」，例如：

: wq (输入「wq」，存盘并退出vi）

: q! (输入q!， 不存盘强制退出vi）

echo
```

# 其他命令

```bash
sudo -i                 获取系统权限
exit                    退出系统权限
whereis                 nginx 查看软件配置文件位置
--help                  查看命令参数
```

# 软件约定目录

| 目录 | 说明 |
| --- | --- |
| /etc/init.d/ | 启动脚本存放位置 |
| /etc/sysconfig | 初始化环境配置文件存放位置 |
| /etc/ | 配置文件存放位置 |
| /etc/xinetd.conf | 基于xinetd服务的配置文件 |
| /etc/xinetd.d | 基于xinetd服务的启动脚本 |
| /var/lib | 服务产生的数据存放位置 |
| /var/log | 服务日志存放位置 |

# 安装常用软件命令

```bash
sudo apt install git

sudo apt install nodejs
sudo apt install npm

sudo apt install nginx

sudo apt install docker.io

sudo apt install openssh-server
/etc/init.d/ssh restart #重启ssh服务器，设置密码
```