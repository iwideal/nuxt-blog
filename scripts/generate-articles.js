import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const contentDir = join(__dirname, '..', 'content')
const outputDir = join(__dirname, '..', 'public', 'api')

console.log('Generating articles JSON...')

// 确保输出目录存在
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

// 读取所有 markdown 文件
const files = readdirSync(contentDir).filter(file => file.endsWith('.md'))

// 生成文章列表
const articles = files.map(file => {
  const filePath = join(contentDir, file)
  const fileContent = readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug: file.replace('.md', ''),
    title: data.title || '无标题',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    content
  }
})

// 按日期排序
articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// 生成文章列表 JSON
const articlesList = articles.map(({ content, ...rest }) => rest)
writeFileSync(
  join(outputDir, 'articles.json'),
  JSON.stringify(articlesList, null, 2)
)

// 生成每篇文章的 JSON
const articlesDir = join(outputDir, 'articles')
if (!existsSync(articlesDir)) {
  mkdirSync(articlesDir, { recursive: true })
}

articles.forEach(article => {
  writeFileSync(
    join(articlesDir, `${article.slug}.json`),
    JSON.stringify(article, null, 2)
  )
})

console.log(`Generated ${articles.length} articles`)
console.log('Articles JSON generated successfully!')

function existsSync(path) {
  try {
    readdirSync(path)
    return true
  } catch {
    return false
  }
}
