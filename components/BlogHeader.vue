<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- 左侧：Logo 和标题 -->
        <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition">
          <img src="/logo.png" alt="Logo" class="w-10 h-10 rounded-lg" />
          <span class="text-xl font-semibold text-gray-800">大路的博客</span>
        </NuxtLink>

        <!-- 右侧：导航 -->
        <nav class="flex items-center gap-8">
          <NuxtLink 
            to="/" 
            class="text-gray-600 hover:text-blue-600 transition font-medium"
          >
            首页
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-600 hover:text-blue-600 transition font-medium"
          >
            关于
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
