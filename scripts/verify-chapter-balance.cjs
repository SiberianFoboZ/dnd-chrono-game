// Проверка баланса <div>/</div> во всех сгенерированных главах.
// Запуск: node scripts/verify-chapter-balance.cjs
const fs = require("fs");
const path = require("path");

const dirs = ["src/pages/main/artur", "src/pages/main/aza"];
let bad = 0;

for (const dir of dirs) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".vue"))
    .sort();
  console.log(`\n=== ${dir} ===`);
  for (const f of files) {
    const c = fs.readFileSync(path.join(dir, f), "utf-8");
    // Считаем все открывающие <div> (не самозакрывающиеся) и закрывающие </div>
    const opens = (c.match(/<div(?:\s|>)/g) || []).length;
    const closes = (c.match(/<\/div>/g) || []).length;
    const tagPageOpen = (c.match(/<div class="page">/g) || []).length;
    const status =
      opens === closes ? "OK" : opens > closes ? "!! MISSING </div>" : "!! EXTRA </div>";
    if (status !== "OK") bad++;
    console.log(
      `  ${f.padEnd(26)}  <div>=${opens}  </div>=${closes}  page=${tagPageOpen}  ${status}`,
    );
  }
}

console.log(bad === 0 ? "\n✓ Все главы сбалансированы." : `\n✗ Найдено проблем: ${bad}`);
process.exit(bad === 0 ? 0 : 1);