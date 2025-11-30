import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler(async () => {
  try {
    // content 目录在 public 目录下
    const contentDir = join(process.cwd(), 'public', 'content')
    const files = await readdir(contentDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))

    const articles = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = join(contentDir, file)
        const fileContent = await readFile(filePath, 'utf-8')
        const { data } = matter(fileContent)

        return {
          slug: file.replace('.md', ''),
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
