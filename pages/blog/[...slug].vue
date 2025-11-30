<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <BlogHeader />

    <main class="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回首页
      </NuxtLink>

      <article class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ article.title }}
          </h1>
          <div class="flex items-center gap-2 text-blue-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(article.date) }}
          </div>
        </div>

        <div class="p-8 md:p-12">
          <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-purple-600 prose-pre:bg-gray-900">
            <MDC :value="article?.content" />
          </div>
        </div>
      </article>
    </main>

    <BlogFooter />
  </div>
</template>

<script setup>
const route = useRoute()
const { getArticle } = useBlog()
const slug = Array.isArray(route.params.slug) 
  ? decodeURIComponent(route.params.slug.join('/'))
  : decodeURIComponent(String(route.params.slug))

const { data: article } = await useAsyncData(`article-${slug}`, () => getArticle(slug))

if (!article.value) {
  throw createError({ statusCode: 404, message: '文章未找到' })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
