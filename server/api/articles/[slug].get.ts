import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default defineEventHandler((event) => {
  const slug = decodeURIComponent(getRouterParam(event, 'slug') || '')
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 404,
      message: '文章未找到'
    })
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags,
    content
  }
})
