// Создаёт dist/404.html с redirect-скриптом для GitHub Pages SPA fallback.
// При заходе на /dnd-chrono-game/<route> GitHub Pages не находит файл и
// отдаёт 404.html — этот скрипт перенаправляет на /dnd-chrono-game/?/<route>,
// а restoration-скрипт в index.html возвращает URL к нормальному виду и
// передаёт управление Vue Router.
//
// Техника: rafgraph/spa-github-pages (MIT).
const fs = require('fs')
const path = require('path')

const distDir = path.resolve(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')
const notFoundPath = path.join(distDir, '404.html')

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html не найден. Сначала запусти vite build.')
  process.exit(1)
}

// pathSegmentsToKeep = 1, потому что сайт публикуется в подкаталоге
// репозитория /dnd-chrono-game/ (см. base в vite.config.ts).
const pathSegmentsToKeep = 1

const html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Хроники отряда</title>
    <script>
      (function (l) {
        var pathSegmentsToKeep = ${pathSegmentsToKeep};
        l.replace(
          l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
        );
      })(window.location);
    </script>
  </head>
  <body></body>
</html>
`

fs.writeFileSync(notFoundPath, html)
console.log(`Создан ${notFoundPath} для SPA history fallback`)