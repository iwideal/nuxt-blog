import matter from 'gray-matter'

export default defineEventHandler(async () => {
  try {
    // 使用 Nitro 的 serverAssets
    const storage = useStorage('assets:content')
    const keys = await storage.getKeys()
    
    const articles = await Promise.all(
      keys
        .filter(key => key.endsWith('.md'))
        .map(async (key) => {
          const fileContent = await storage.getItem(key) as string
          const { data } = matter(fileContent)
          const slug = key.replace('.md', '')

          return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            tags: data.tags
          }
        })
    )

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
})
