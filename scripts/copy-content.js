import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sourceDir = join(__dirname, '..', 'content')
const targetDir = join(__dirname, '..', '.output', 'server', 'content')

console.log('Copying content files...')
console.log('Source:', sourceDir)
console.log('Target:', targetDir)

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true })
}

const files = readdirSync(sourceDir)
files.forEach(file => {
  if (file.endsWith('.md')) {
    const source = join(sourceDir, file)
    const target = join(targetDir, file)
    copyFileSync(source, target)
    console.log(`Copied: ${file}`)
  }
})

console.log('Content files copied successfully!')
