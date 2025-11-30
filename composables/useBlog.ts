export const useBlog = () => {
  const getArticles = async () => {
    const { data } = await useFetch('/api/articles')
    return data.value || []
  }

  const getArticle = async (slug: string) => {
    const { data } = await useFetch(`/api/articles/${slug}`)
    return data.value
  }

  return {
    getArticles,
    getArticle
  }
}
