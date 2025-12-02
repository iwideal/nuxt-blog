<template>
  <footer class="bg-gray-800 text-gray-300 mt-16 border-t border-gray-700">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-blue-400 font-bold mb-3">关于博客</h3>
          <p class="text-sm">记录技术成长，分享开发经验</p>
        </div>
        <div>
          <h3 class="text-blue-400 font-bold mb-3">快速链接</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="hover:text-blue-400 transition">首页</NuxtLink></li>
            <li><NuxtLink to="/" class="hover:text-blue-400 transition">关于</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3 class="text-blue-400 font-bold mb-3">联系方式</h3>
          <ul class="space-y-2 text-sm">
            <li>GitHub: @iwideal</li>
            <li>Email: iwideal@outlook.com</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        <p>&copy; 2025 大路的博客. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
