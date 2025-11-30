export const useBlog = () => {
  const getArticles = async () => {
    try {
      const { data, error } = await useFetch('/api/articles')
      if (error.value) {
        console.error('Error fetching articles:', error.value)
        return []
      }
      return data.value || []
    } catch (err) {
      console.error('Error in getArticles:', err)
      return []
    }
  }

  const getArticle = async (slug: string) => {
    try {
      const { data, error } = await useFetch(`/api/articles/${slug}`)
      if (error.value) {
        console.error('Error fetching article:', error.value)
        return null
      }
      return data.value
    } catch (err) {
      console.error('Error in getArticle:', err)
      return null
    }
  }

  return {
    getArticles,
    getArticle
  }
}
