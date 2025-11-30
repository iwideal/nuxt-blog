import { readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  try {
    const slug = decodeURIComponent(getRouterParam(event, 'slug') || '')
    
    // 尝试多个可能的路径
    const possiblePaths = [
      join(process.cwd(), 'content', `${slug}.md`),
      join(process.cwd(), '.output', 'server', 'content', `${slug}.md`),
      join(process.cwd(), 'server', 'content', `${slug}.md`)
    ]

    let fileContent = ''
    for (const path of possiblePaths) {
      try {
        fileContent = await readFile(path, 'utf-8')
        console.log('Found article at:', path)
        break
      } catch (e) {
        continue
      }
    }

    if (!fileContent) {
      throw new Error('Article not found')
    }

    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || '无标题',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
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
