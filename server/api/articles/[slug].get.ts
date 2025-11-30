import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  try {
    const slug = decodeURIComponent(getRouterParam(event, 'slug') || '')
    // content 目录在 public 目录下
    const filePath = join(process.cwd(), 'public', 'content', `${slug}.md`)

    const fileContent = await readFile(filePath, 'utf-8')
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
