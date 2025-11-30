import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default defineEventHandler(() => {
  const contentDir = path.join(process.cwd(), 'content')
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'))

  const articles = files.map(file => {
    const filePath = path.join(contentDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug: file.replace('.md', ''),
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags,
      content
    }
  })

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
