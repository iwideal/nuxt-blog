// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/mdc'],
  app: {
    head: {
      title: '大路的博客',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '分享编程经验与技术见解' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  css: ['~/assets/css/markdown.css'],
  hooks: {
    'nitro:config'(nitroConfig) {
      // 动态生成所有文章路由
      const { readdirSync } = require('fs')
      const { join } = require('path')
      
      const contentDir = join(process.cwd(), 'content')
      const files = readdirSync(contentDir).filter((file: string) => file.endsWith('.md'))
      const routes = files.map((file: string) => `/blog/${file.replace('.md', '')}`)
      
      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []
      nitroConfig.prerender.routes.push(...routes, '/about')
    }
  }
})