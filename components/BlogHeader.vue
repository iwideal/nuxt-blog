<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- 左侧：Logo 和标题 -->
        <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <span class="text-xl font-semibold text-gray-900">技术博客</span>
        </NuxtLink>

        <!-- 右侧：导航 -->
        <nav class="flex items-center gap-8">
          <NuxtLink 
            to="/" 
            class="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            首页
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            关于
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
