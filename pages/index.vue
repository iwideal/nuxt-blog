<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <BlogHeader />

        <main class="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">最新文章</h2>
                <p class="text-gray-600">探索最新的技术文章和教程</p>
            </div>

            <div v-if="!articles || articles.length === 0" class="text-center py-12">
                <p class="text-gray-500">暂无文章</p>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <article v-for="article in articles" :key="article.slug"
                    class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-500/10 hover:border-green-500/30">
                    <NuxtLink :to="`/blog/${encodeURIComponent(article.slug)}`" class="block">
                        <div class="p-6">
                            <div class="flex items-center gap-2 mb-3">
                                <span v-for="tag in article.tags" :key="tag"
                                    class="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full shadow-sm">
                                    {{ tag }}
                                </span>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-3 hover:text-green-600 transition">
                                {{ article.title }}
                            </h2>
                            <p class="text-gray-600 mb-4 line-clamp-2">{{ article.description }}</p>
                            <div class="flex items-center justify-between text-sm text-gray-500">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ formatDate(article.date) }}
                                </span>
                                <span class="text-green-600 font-medium">阅读更多 →</span>
                            </div>
                        </div>
                    </NuxtLink>
                </article>
            </div>
        </main>

        <BlogFooter />
        <BackToTop />
    </div>
</template>

<script setup>
const { getArticles } = useBlog()
const { data: articles } = await useAsyncData('articles', getArticles)

// 添加调试信息
console.log('Articles loaded:', articles.value)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
