import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export default defineEventHandler(async () => {
  try {
    // 尝试多个可能的路径
    const possiblePaths = [
      join(process.cwd(), 'content'),
      join(process.cwd(), '.output', 'server', 'content'),
      join(process.cwd(), 'server', 'content')
    ]

    let contentDir = possiblePaths[0]
    let files: string[] = []

    for (const path of possiblePaths) {
      try {
        files = await readdir(path)
        contentDir = path
        console.log('Found content directory at:', path)
        break
      } catch (e) {
        console.log('Content directory not found at:', path)
        continue
      }
    }

    if (files.length === 0) {
      console.error('No content directory found')
      return []
    }

    const mdFiles = files.filter(file => file.endsWith('.md'))
    console.log('Found markdown files:', mdFiles)

    const articles = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = join(contentDir, file)
        const fileContent = await readFile(filePath, 'utf-8')
        const { data } = matter(fileContent)

        return {
          slug: file.replace('.md', ''),
          title: data.title || '无标题',
          description: data.description || '',
          date: data.date || new Date().toISOString(),
          tags: data.tags || []
        }
      })
    )

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
})
