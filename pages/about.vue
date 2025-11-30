<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <BlogHeader />

    <main class="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
      <div class="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">关于我</h1>
        
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 leading-relaxed mb-6">
            你好！我是一名热爱技术的开发者，专注于前端开发和全栈技术。
            这个博客是我分享技术经验、学习笔记和项目实践的地方。
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">技术栈</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div class="font-semibold text-blue-900">前端框架</div>
              <div class="text-sm text-blue-700 mt-1">Vue.js, Nuxt.js, React</div>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <div class="font-semibold text-purple-900">样式工具</div>
              <div class="text-sm text-purple-700 mt-1">Tailwind CSS, SCSS</div>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <div class="font-semibold text-green-900">后端技术</div>
              <div class="text-sm text-green-700 mt-1">Node.js, Express</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
              <div class="font-semibold text-yellow-900">数据库</div>
              <div class="text-sm text-yellow-700 mt-1">MongoDB, PostgreSQL</div>
            </div>
            <div class="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
              <div class="font-semibold text-red-900">工具链</div>
              <div class="text-sm text-red-700 mt-1">Git, Docker, Vite</div>
            </div>
            <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
              <div class="font-semibold text-indigo-900">其他</div>
              <div class="text-sm text-indigo-700 mt-1">TypeScript, GraphQL</div>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">联系方式</h2>
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-gray-700">
              <svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub: <a href="https://github.com/iwideal" class="text-blue-600 hover:underline">@iwideal</a></span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email: <a href="mailto:your@email.com" class="text-blue-600 hover:underline">iwideal@outlook.com</a></span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <BlogFooter />
    <BackToTop />
  </div>
</template>

<script setup>
useHead({
  title: '关于我 - 我的技术博客',
  meta: [
    { name: 'description', content: '了解更多关于我的技术背景和联系方式' }
  ]
})
</script>
