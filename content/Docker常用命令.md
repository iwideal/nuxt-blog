---
title: 'Docker常用命令'
description: 'Docker容器管理的常用命令大全'
date: '2024-09-25'
tags: ['Docker', '命令', '容器']
---

# Docker命令

# 镜像

- 拉取镜像

```bash
docker pull ubuntu
```

- 启动容器

```bash
docker run -p 8080:80 mysql                  #-p 端口映射,前面的是机器端口，后面是容器端口
docker run -d nginx                          #后台启动容器
docker run -it ubuntu /bin/bash              #-it 交互界面运行
docker update --restart-always filebrowser   #开机自启动
```

- 镜像列表

```bash
docker images
```

- 删除镜像

```bash
docker rmi -f 镜像id
```

# 容器

- 后台运行的容器列表

```bash
docker ps       #列出所有正在运行的容器
docker ps -a    #列出所有容器的运行记录
```

- 进入容器

```bash
docker exec -it 容器id /bin/bash或sh
```

- 退出容器

```bash
exit            #停止并退出
ctrl + p + q    # 不停止并退出
```

- 启动容器

```jsx
docker start 容器id
docker restart 容器id
```

- 停止容器

```bash
docker stop 容器id
```

- 删除容器

```bash
docker rm -f 容器id
```

- 查看容器具体信息，可以看到**本地IP、映射端口、数据卷**等信息

```bash
docker inspect 容器id
```

- 挂载数据卷

```bash
docker run -v /home/ceshi:/home centos #-v 系统目录：容器目录
```

# 容器迁移

```bash
docker commit -m '描述信息' 容器名称 镜像名称            #将容器保存成镜像
docker save 镜像名称 > xxx.tar                          #将镜像打包成tar文件
docker load < xxx.tar                                  #恢复成镜像
docker run --name nginx-test -p 8080:80 -d nginxtest   #启动容器
```

# 网络

```bash
docker network create net       #创建网络，名称为net
#启动容器时，加入创建的网络,并为该容器的网络命名
docker run -d -p 3306:3306 --network net --network-alias mysql  -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```
