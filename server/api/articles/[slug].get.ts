export default defineEventHandler((event) => {
  const slug = decodeURIComponent(getRouterParam(event, 'slug') || '')
  const articles = getArticlesData()
  
  const article = articles.find(a => a.slug === slug)
  
  if (!article) {
    throw createError({
      statusCode: 404,
      message: '文章未找到'
    })
  }
  
  return article
})
