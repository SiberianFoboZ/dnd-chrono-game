// Создаёт 404.html как копию index.html —
// GitHub Pages fallback для SPA history mode.
const fs = require('fs')
const path = require('path')

const distDir = path.resolve(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')
const notFoundPath = path.join(distDir, '404.html')

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html не найден. Сначала запусти vite build.')
  process.exit(1)
}

fs.copyFileSync(indexPath, notFoundPath)
console.log(`Создан ${notFoundPath} для SPA history fallback`)