---
title: 'Bun教程'
description: 'Bun安装、配置和常用命令详解'
date: '2026-04-15'
tags: ['Bun', 'JavaScript', '运行环境']
---

# Bun教程

![](https://picgo.dalualex.com/bun.png)

Bun是一个全新的JavaScript运行时和工具链，旨在成为Node.js的替代品。它不仅是一个运行时，还是一个打包器、转译器、包管理器和测试框架，全部集成为一个极快的工具。

# 一、安装

## 1、Linux/macOS安装

```bash
curl -fsSL https://bun.sh/install | bash
```

## 2、使用npm安装

```bash
npm install -g bun
```

## 3、Windows安装

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

## 4、验证安装

```bash
bun --version
```

# 二、常用命令

## 1、运行脚本

```bash
bun run index.js              # 运行JavaScript文件
bun run dev                    # 运行package.json中的dev脚本
bun run build                  # 运行build脚本
```

## 2、包管理

```bash
bun install                    # 安装所有依赖（等同于npm install）
bun add <package>              # 添加依赖（等同于npm install <package>）
bun add -d <package>           # 添加开发依赖
bun remove <package>           # 移除依赖
bun update <package>           # 更新依赖
bun add <package>@<version>   # 安装指定版本
```

## 3、创建项目

```bash
bun create next-app my-app              # 创建Next.js项目
bun create react-app my-app             # 创建React项目
bun create vue my-app                   # 创建Vue项目
bun create <template> <name>            # 从模板创建
```

## 4、执行脚本

```bash
bun run <script>              # 运行scripts中的脚本
bun -e "console.log('Hello')" # 直接执行代码
```

## 5、测试

```bash
bun test                       # 运行所有测试
bun test --watch              # 监听模式运行测试
bun test <file>               # 运行指定测试文件
```

## 6、打包

```bash
bun build ./index.js --outdir=./dist    # 打包到指定目录
bun build ./index.js --outfile=bundle.js # 打包到单个文件
```

## 7、升级Bun

```bash
bun upgrade                    # 升级到最新版本
bun upgrade --canary          # 升级到canary版本
```

# 三、Bun与npm命令对比

| 功能 | npm | bun |
|------|-----|-----|
| 安装依赖 | npm install | bun install |
| 添加依赖 | npm install <pkg> | bun add <pkg> |
| 开发依赖 | npm install -D <pkg> | bun add -d <pkg> |
| 移除依赖 | npm uninstall <pkg> | bun remove <pkg> |
| 运行脚本 | npm run <script> | bun run <script> |
| 执行文件 | node index.js | bun index.js |

# 四、Bun的特点

## 1、极快的安装速度

Bun的包安装速度比npm快数倍，因为它使用了并行的HTTP请求和优化的文件系统操作。

## 2、兼容Node.js

Bun几乎完全兼容Node.js的API，可以直接运行绝大多数Node.js代码。

## 3、内置TypeScript支持

Bun原生支持TypeScript，无需额外配置即可运行.ts文件。

## 4、内置Web API

Bun实现了大部分Web标准API，如fetch、Response、Request等。

## 5、自动化配置

Bun会自动读取package.json、tsconfig.json等配置文件，减少了手动配置的需要。

# 五、使用示例

## 1、运行JavaScript

```javascript
// index.js
const response = await fetch('https://api.example.com/data');
const data = await response.json();
console.log(data);
```

```bash
bun run index.js
```

## 2、运行TypeScript

```typescript
// index.ts
interface User {
  name: string;
  age: number;
}

const user: User = { name: '张三', age: 25 };
console.log(`你好，${user.name}！`);
```

```bash
bun run index.ts
```

## 3、快速启动服务器

```javascript
// server.js
Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response('Hello Bun!');
  },
});

console.log('服务器运行在 http://localhost:3000');
```

```bash
bun run server.js
```

# 六、常见问题

## 1、Bun与Node.js共存

Bun可以与Node.js共存安装，不会影响Node.js的正常使用。

## 2、原生模块支持

Bun支持部分Node.js原生模块（如fs、path、crypto等），但并非全部。如遇不支持的模块，可能需要使用polyfill。

## 3、调试

```bash
bun --inspect server.js       # 启动调试模式
bun --inspect-brk server.js  # 在首行断点暂停
```

# 七、配置文件

Bun使用package.json作为主要配置文件，同时也支持bunfig.toml进行全局配置。

```toml
# bunfig.toml
[install]
registry = "https://registry.npmjs.org/"
```

# 八、性能对比

Bun的性能优势主要体现在：

- **安装速度**：比npm快3-10倍
- **运行速度**：比Node.js快约4倍
- **热启动**：内置热重载，无需额外配置

Bun正在快速发展，建议定期更新以获取最新功能和修复。
