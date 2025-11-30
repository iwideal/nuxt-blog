export const useBlog = () => {
  const articles = [
    {
      slug: 'hello-world',
      title: 'Hello World',
      description: '我的第一篇博客文章',
      date: '2024-01-01',
      tags: ['博客', '开始'],
      content: `# Hello World

欢迎来到我的博客！这是我的第一篇文章。

## 关于这个博客

这是一个使用 Nuxt 3 + Tailwind CSS 构建的个人博客。

## 特性

- 📝 Markdown 支持
- 🎨 Tailwind CSS 样式
- 🚀 Nuxt 3 驱动
- ⚡️ 快速且现代化`
    },
    {
      slug: 'nuxt-tailwind',
      title: '使用 Nuxt 和 Tailwind CSS',
      description: '如何在 Nuxt 项目中使用 Tailwind CSS',
      date: '2024-01-15',
      tags: ['Nuxt', 'Tailwind', '教程'],
      content: `# 使用 Nuxt 和 Tailwind CSS

在这篇文章中，我将分享如何在 Nuxt 3 项目中集成 Tailwind CSS。

## 安装步骤

1. 安装 Tailwind 模块
2. 配置 nuxt.config.ts
3. 创建 tailwind.config.js

## 开始使用

现在你可以在组件中使用 Tailwind 的工具类了！`
    },
    {
      slug: 'vue-composition-api',
      title: 'Vue 3 Composition API 实践',
      description: '深入理解 Vue 3 Composition API 的使用场景和最佳实践',
      date: '2024-01-20',
      tags: ['Vue', '前端', '教程'],
      content: `# Vue 3 Composition API 实践

Vue 3 的 Composition API 为我们提供了更灵活的代码组织方式。

## 为什么使用 Composition API

- 更好的代码复用
- 更清晰的逻辑组织
- 更好的 TypeScript 支持

## 基本用法

\`\`\`javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    
    return { count, double }
  }
}
\`\`\`

## 总结

Composition API 让我们的代码更加模块化和可维护。`
    },
    {
      slug: 'typescript-tips',
      title: 'TypeScript 开发技巧',
      description: '提升 TypeScript 开发效率的实用技巧',
      date: '2024-01-25',
      tags: ['TypeScript', '开发技巧'],
      content: `# TypeScript 开发技巧

分享一些在日常开发中常用的 TypeScript 技巧。

## 类型推断

TypeScript 的类型推断非常强大，合理使用可以减少很多类型声明。

## 泛型的使用

泛型让我们的代码更加灵活和可复用。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg
}
\`\`\`

## 实用工具类型

- Partial<T>
- Required<T>
- Pick<T, K>
- Omit<T, K>

掌握这些工具类型可以大大提升开发效率。`
    }
  ]

  const getArticles = () => {
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getArticle = (slug: string) => {
    return articles.find(article => article.slug === slug)
  }

  return {
    getArticles,
    getArticle
  }
}
