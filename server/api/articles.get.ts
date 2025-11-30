export default defineEventHandler(() => {
  const articles = getArticlesData()
  
  return articles
    .map(({ content, ...article }) => article)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
