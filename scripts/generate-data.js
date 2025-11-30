import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('Generating articles data...')

const contentDir = join(__dirname, '..', 'content')
const outputFile = join(__dirname, '..', 'articles.data.ts')

const files = readdirSync(contentDir).filter(file => file.endsWith('.md'))

const articles = files.map(file => {
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

const output = `// 此文件在构建时自动生成
export const articlesData = ${JSON.stringify(articles, null, 2)}
`

writeFileSync(outputFile, output)

console.log(`Generated ${articles.length} articles to ${outputFile}`)
