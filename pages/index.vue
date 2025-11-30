<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <BlogHeader />

        <main class="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">最新文章</h2>
                <p class="text-gray-600">探索最新的技术文章和教程</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <article v-for="article in articles" :key="article.slug"
                    class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-500/10 hover:border-green-500/30">
                    <NuxtLink :to="`/blog/${encodeURIComponent(article.slug)}`" class="block">
                        <div class="p-6 flex flex-col h-full">
                            <h2 class="text-2xl font-bold text-gray-900 mb-3 hover:text-green-600 transition">
                                {{ article.title }}
                            </h2>
                            <p class="text-gray-600 mb-4 line-clamp-2 flex-1">{{ article.description }}</p>
                            <div class="space-y-3">
                                <div class="flex items-center gap-1 text-sm text-gray-500">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ formatDate(article.date) }}
                                </div>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in article.tags" :key="tag"
                                        class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                        {{ tag }}
                                    </span>
                                </div>
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
const articles = getArticles()

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
