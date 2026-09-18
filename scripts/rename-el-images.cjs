// Переименование файлов в public/images/el/ → Image<N>-<part>.png
// и обновление ссылок в src/pages/ElMainPage.vue.
//
// Использование:
//   node scripts/rename-el-images.cjs [--dry-run]
//
// Конвенция:
//   - Image<N>.png            — одиночная картинка
//   - Image<N>-<part>.png     — часть многокартиночного эпизода
//   - Image<N>-rotate<deg>.png — с подсказкой поворота (как в исходных ссылках)

const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");
const PAGE = path.join(REPO, "src", "pages", "ElMainPage.vue");
const PUB = path.join(REPO, "public", "images", "el");

// ─── Парсер имени файла/ссылки ───────────────────────────────────────────
function parseRef(ref) {
  // ref — это имя файла без расширения, например:
  //   "1", "20-1", "image56", "9-rotate 90", "42-rotate90"
  if ((m = ref.match(/^image(\d+)-(\d+)-rotate(\d+)$/))) {
    return { N: parseInt(m[1], 10), part: parseInt(m[2], 10), rotate: parseInt(m[3], 10) };
  }
  if ((m = ref.match(/^image(\d+)-rotate(\d+)$/))) {
    return { N: parseInt(m[1], 10), part: null, rotate: parseInt(m[2], 10) };
  }
  // <N>-rotate<deg> (с пробелом или без)
  if ((m = ref.match(/^(\d+)-rotate\s*(\d+)$/))) {
    return { N: parseInt(m[1], 10), part: null, rotate: parseInt(m[2], 10) };
  }
  if ((m = ref.match(/^image(\d+)-(\d+)$/))) {
    return { N: parseInt(m[1], 10), part: parseInt(m[2], 10), rotate: null };
  }
  if ((m = ref.match(/^image(\d+)$/))) {
    return { N: parseInt(m[1], 10), part: null, rotate: null };
  }
  if ((m = ref.match(/^(\d+)-(\d+)$/))) {
    return { N: parseInt(m[1], 10), part: parseInt(m[2], 10), rotate: null };
  }
  if ((m = ref.match(/^(\d+)$/))) {
    return { N: parseInt(m[1], 10), part: null, rotate: null };
  }
  return null;
}

function buildNewName(parsed) {
  const { N, part, rotate } = parsed;
  const parts = ["Image" + N];
  if (part !== null) parts.push(String(part));
  if (rotate !== null) parts.push("rotate" + rotate);
  return parts.join("-") + ".png";
}

// ─── Сбор ссылок со страницы ───────────────────────────────────────────────
const page = fs.readFileSync(PAGE, "utf-8");
const refs = [];
const re = /src="\/images\/el\/([^"]+)"/g;
let m;
while ((m = re.exec(page)) !== null) refs.push(m[1]);
const uniqueRefs = [...new Set(refs)].sort();

// ─── Маппинг ref → новый target ────────────────────────────────────────────
const disk = fs.readdirSync(PUB);
const refMap = new Map();
const errors = [];
const noSource = [];

for (const ref of uniqueRefs) {
  const refBase = ref.slice(0, ref.lastIndexOf(".")); // срезаем ".png"
  const parsed = parseRef(refBase);
  if (!parsed) {
    errors.push("не удалось распарсить: " + ref);
    continue;
  }
  const newName = buildNewName(parsed);

  // Ищем исходный файл на диске по (N, part, rotate), любое расширение
  const candidates = disk.filter((f) => {
    const fBase = f.slice(0, f.lastIndexOf("."));
    const fp = parseRef(fBase);
    if (!fp) return false;
    return fp.N === parsed.N && fp.part === parsed.part && fp.rotate === parsed.rotate;
  });

  if (candidates.length === 0) {
    noSource.push(ref + " → " + newName);
    continue;
  }
  if (candidates.length > 1) {
    errors.push("неоднозначный источник для " + ref + ": " + candidates.join(", "));
    continue;
  }

  refMap.set(ref, { source: candidates[0], target: newName });
}

// ─── Дубликаты target'ов? (две ссылки с одним target → нельзя) ──────────────
const targetCount = new Map();
for (const v of refMap.values()) {
  targetCount.set(v.target, (targetCount.get(v.target) || 0) + 1);
}
const dupTargets = [];
for (const [t, c] of targetCount.entries()) {
  if (c > 1) dupTargets.push(t + " (×" + c + ")");
}
if (dupTargets.length) errors.push("коллизии target'ов: " + dupTargets.join("; "));

console.log("=== УНИКАЛЬНЫХ ССЫЛОК: " + uniqueRefs.length + " ===");
console.log("=== СОПОСТАВЛЕНО: " + refMap.size + " ===");
console.log("=== ОШИБКИ: " + errors.length + " ===");
errors.forEach((e) => console.log("  ! " + e));
console.log("=== БЕЗ ИСХОДНИКА: " + noSource.length + " ===");
noSource.forEach((s) => console.log("  ? " + s));

if (errors.length) {
  console.log("\nЕсть ошибки — без --dry-run не запускаю.");
  process.exit(1);
}

console.log("\n=== ПЛАН ПЕРЕИМЕНОВАНИЯ ===");
const sorted = [...refMap.entries()].sort((a, b) => {
  const pa = parseRef(a[0].slice(0, a[0].lastIndexOf(".")));
  const pb = parseRef(b[0].slice(0, b[0].lastIndexOf(".")));
  return pa.N - pb.N || (pa.part || 0) - (pb.part || 0);
});
for (const [ref, v] of sorted) {
  console.log("  " + v.source + " → " + v.target + "  (для ссылки " + ref + ")");
}

// ─── Применяем ─────────────────────────────────────────────────────────────
if (DRY_RUN) {
  console.log("\n[DRY-RUN] Файлы не тронуты.");
  process.exit(0);
}

// Шаг 1: переименование на диске (в два прохода, чтобы не было коллизий имен)
console.log("\n=== ШАГ 1: переименование файлов ===");
const tmpNames = new Map();
for (const [ref, v] of sorted) {
  const oldPath = path.join(PUB, v.source);
  const tmpName = "__tmp_" + v.target;
  const tmpPath = path.join(PUB, tmpName);
  fs.renameSync(oldPath, tmpPath);
  tmpNames.set(tmpPath, path.join(PUB, v.target));
  console.log("  tmp: " + v.source + " → " + tmpName);
}
for (const [from, to] of tmpNames.entries()) {
  fs.renameSync(from, to);
  console.log("  final: " + path.basename(from) + " → " + path.basename(to));
}

// Шаг 2: обновление ссылок в ElMainPage.vue
console.log("\n=== ШАГ 2: обновление ссылок ===");
let updated = page;
for (const [ref, v] of sorted) {
  const oldPath = "/images/el/" + ref;
  const newPath = "/images/el/" + v.target;
  // Экранируем специальные символы в ref для regex (напр. "9-rotate 90.png")
  const escaped = oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const before = updated;
  updated = updated.replace(new RegExp(escaped, "g"), newPath);
  if (before !== updated) console.log("  ref " + ref + " → " + v.target);
}
fs.writeFileSync(PAGE, updated, "utf-8");

console.log("\n✓ Готово. Переименовано файлов: " + sorted.length + ", обновлено ссылок: " + sorted.length);
