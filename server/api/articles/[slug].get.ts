import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler((event) => {
  try {
    const slug = decodeURIComponent(getRouterParam(event, 'slug') || '')
    const filePath = join(process.cwd(), 'public', 'content', `${slug}.md`)
    
    console.log('Reading article from:', filePath)
    
    const fileContent = readFileSync(filePath, 'utf-8')
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
