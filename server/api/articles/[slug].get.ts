import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  try {
    const slug = decodeURIComponent(getRouterParam(event, 'slug') || '')
    
    // 使用 Nitro 的 serverAssets
    const storage = useStorage('assets:content')
    const fileContent = await storage.getItem(`${slug}.md`) as string
    
    if (!fileContent) {
      throw createError({
        statusCode: 404,
        message: '文章未找到'
      })
    }

    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags,
      content
    }
  } catch (error) {
    console.error('Error reading article:', error)
    throw createError({
      statusCode: 404,
      message: '文章未找到'
    })
  }
})
