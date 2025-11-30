import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

let cachedArticles: any[] | null = null

export function getArticlesData() {
  if (cachedArticles) {
    return cachedArticles
  }

  try {
    const contentDir = join(process.cwd(), 'content')
    const files = readdirSync(contentDir).filter(file => file.endsWith('.md'))

    cachedArticles = files.map(file => {
      const filePath = join(contentDir, file)
      const fileContent = readFileSync(filePath, 'utf-8')
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

    return cachedArticles
  } catch (error) {
    console.error('Error loading articles:', error)
    return []
  }
}
