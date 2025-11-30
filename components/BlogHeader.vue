<template>
  <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <NuxtLink to="/" class="block hover:opacity-90 transition">
        <h1 class="text-4xl font-bold mb-2">我的技术博客</h1>
        <p class="text-blue-100">分享编程经验与技术见解</p>
      </NuxtLink>
      <nav class="mt-6 flex gap-6">
        <NuxtLink to="/" class="hover:text-blue-200 transition">首页</NuxtLink>
        <NuxtLink to="/about" class="hover:text-blue-200 transition">关于</NuxtLink>
      </nav>
    </div>
  </header>
</template>
