// Скрипт для разделения ArturPage.vue и AzaPage.vue на отдельные файлы глав.
// Запускается один раз при миграции на структуру main + chapters.
//
// Использование:
//   node scripts/split-pages-by-chapter.cjs [--dry-run]
//
// Генерирует:
//   src/pages/main/artur/ArturChapter<N>.vue   — 30 файлов (<div class="page">)
//   src/pages/main/aza/AzaChapter<N>.vue       — 21 файл (<h2>...)

const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");

// ===== Artur: 30 глав =====
// Каждая граница — [start, end] в 1-based номерах строк включительно.
// end = строка перед следующим `<div class="page">` или перед заголовочным
// комментарием <!-- ========================, или перед </template>.
const ARTUR = [
  { id: 1,  start:   11, end:   83 },
  { id: 2,  start:   84, end:  143 },
  { id: 3,  start:  146, end:  172 },
  { id: 4,  start:  173, end:  218 },
  { id: 5,  start:  219, end:  266 },
  { id: 6,  start:  269, end:  300 },
  { id: 7,  start:  301, end:  371 },
  { id: 8,  start:  372, end:  412 },
  { id: 9,  start:  415, end:  501 },
  { id: 10, start:  502, end:  544 },
  { id: 11, start:  547, end:  617 },
  { id: 12, start:  620, end:  693 },
  { id: 13, start:  696, end:  762 },
  { id: 14, start:  763, end:  816 },
  { id: 15, start:  819, end:  897 },
  { id: 16, start:  900, end:  986 },
  { id: 17, start:  989, end: 1023 },
  { id: 18, start: 1026, end: 1131 },
  { id: 19, start: 1134, end: 1223 },
  { id: 20, start: 1226, end: 1287 },
  { id: 21, start: 1290, end: 1728 },
  { id: 22, start: 1731, end: 1783 },
  { id: 23, start: 1784, end: 1810 },
  { id: 24, start: 1811, end: 1846 },
  { id: 25, start: 1847, end: 1962 },
  { id: 26, start: 1963, end: 1995 },
  { id: 27, start: 1996, end: 2024 },
  { id: 28, start: 2025, end: 2063 },
  { id: 29, start: 2064, end: 2092 },
  { id: 30, start: 2095, end: 2131 },
];

// ===== Aza: 21 глава (по <h2>) =====
// end = строка перед следующим <h2>, или перед <!-- =====, или перед </article>.
const AZA = [
  { id:  1, start:    62, end:    95 },
  { id:  2, start:    96, end:   133 },
  { id:  3, start:   134, end:   176 },
  { id:  4, start:   177, end:   199 },
  { id:  5, start:   200, end:   234 },
  { id:  6, start:   235, end:   256 },
  { id:  7, start:   257, end:   282 },
  { id:  8, start:   283, end:   297 },
  { id:  9, start:   298, end:   335 },
  { id: 10, start:   336, end:   369 },
  { id: 11, start:   370, end:   386 },
  { id: 12, start:   387, end:   422 },
  { id: 13, start:   423, end:   457 },
  { id: 14, start:   458, end:   485 },
  { id: 15, start:   486, end:   541 },
  { id: 16, start:   542, end:   579 },
  { id: 17, start:   580, end:   616 },
  { id: 18, start:   617, end:   639 },
  { id: 19, start:   640, end:   661 },
  { id: 20, start:   662, end:  1493 },
  { id: 21, start:  1494, end:  1948 },
];

// Зачистка ведущего отступа (6 пробелов) — главы становятся корнем <template>.
function dedent(lines, n) {
  const prefix = " ".repeat(n);
  return lines.map((line) =>
    line.startsWith(prefix) ? line.slice(n) : line,
  );
}

function wrapAsVueTemplate(content) {
  return `<template>\n${content}\n</template>\n`;
}

function split(sourceRel, chapters, outDir, prefix, indent) {
  const sourcePath = path.join(REPO, sourceRel);
  const text = fs.readFileSync(sourcePath, "utf-8");
  const lines = text.split(/\r?\n/);
  const total = lines.length;

  console.log(`\n[${prefix}] source: ${sourceRel} (${total} lines)`);
  console.log(`[${prefix}] ${chapters.length} chapters → ${outDir}/${prefix.toLowerCase()}/`);

  for (const ch of chapters) {
    if (ch.start < 1 || ch.end > total || ch.start > ch.end) {
      throw new Error(
        `[${prefix}] Chapter ${ch.id}: invalid range ${ch.start}-${ch.end} (file has ${total} lines)`,
      );
    }
    const slice = lines.slice(ch.start - 1, ch.end);
    const trimmed = dedent(slice, indent);
    const body = wrapAsVueTemplate(trimmed.join("\n"));
    const outPath = path.join(
      REPO,
      outDir,
      `${prefix.toLowerCase()}`,
      `${prefix}Chapter${ch.id}.vue`,
    );

    if (DRY_RUN) {
      console.log(`  [dry-run] ${path.relative(REPO, outPath)} (${trimmed.length} lines)`);
    } else {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, body, "utf-8");
      console.log(`  ✓ ${path.relative(REPO, outPath)} (${trimmed.length} lines)`);
    }
  }
}

try {
  split("src/pages/ArturPage.vue", ARTUR, "src/pages/main", "Artur", 6);
  split("src/pages/AzaPage.vue", AZA, "src/pages/main", "Aza", 6);

  if (DRY_RUN) {
    console.log("\n[DRY-RUN] Файлы не записывались. Уберите --dry-run для реальной генерации.");
  } else {
    console.log("\n✓ Главы созданы. Дальше:");
    console.log("  1. Создайте ArturMainPage.vue и AzaMainPage.vue (тонкие обёртки).");
    console.log("  2. Обновите src/router/index.ts.");
    console.log("  3. Удалите старые ArturPage.vue и AzaPage.vue.");
    console.log("  4. Запустите npm run type-check.");
  }
} catch (err) {
  console.error("\n✗ Ошибка:", err.message);
  process.exit(1);
}