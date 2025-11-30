import { articlesData } from '~/articles.data'

export const useBlog = () => {
  const getArticles = () => {
    return articlesData
      .map(({ content, ...article }) => article)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getArticle = (slug: string) => {
    return articlesData.find(article => article.slug === slug) || null
  }

  return {
    getArticles,
    getArticle
  }
}
