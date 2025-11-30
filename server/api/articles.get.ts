import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler(() => {
  try {
    const contentDir = join(process.cwd(), 'public', 'content')
    console.log('Reading from:', contentDir)
    
    const files = readdirSync(contentDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    console.log('Found markdown files:', mdFiles.length)

    const articles = mdFiles.map(file => {
      const filePath = join(contentDir, file)
      const fileContent = readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        slug: file.replace('.md', ''),
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags
      }
    })

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading articles:', error)
    console.error('Error details:', error)
    return []
  }
})
