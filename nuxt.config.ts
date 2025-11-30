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
  nitro: {
    preset: 'vercel',
    serverAssets: [
      {
        baseName: 'content',
        dir: './content'
      }
    ],
    publicAssets: [
      {
        baseURL: 'content',
        dir: 'content',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      }
    ]
  }
})