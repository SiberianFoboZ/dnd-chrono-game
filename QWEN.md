# QWEN.md — Хроники отряда (dnd-chrono-game)

> **Актуально по состоянию на 2026-08-21.** Миграция на Vue 3 + Vite + TypeScript + Tailwind **завершена** (включая Фазу 8 — перенос в корень). Все Vite-файлы теперь в корне репозитория; каталог `web/` опустел до `node_modules/`. Последняя сессия — очистка ArturPage.vue, введение классов «голосов» Азы и интеграция картинок Ирины в раздел «Валлаки».

## Обзор проекта

**Летопись D&D-кампании** в виде дневников шести персонажей отряда, входящего в туман Баровии. Каждый персонаж ведёт свой собственный дневник с уникальным визуальным стилем (шрифт, палитра, орнаменты, эффекты бумаги).

- **Тип:** Контентный (творческий писательский проект).
- **Стек:** **Vue 3 + Vite + TypeScript (strict) + Tailwind v3.4**, деплой как статика на GitHub Pages.
- **Язык:** Русский (`<html lang="ru">` на всех страницах, включая имена файлов, комментарии в CSS и текст).
- **Хостинг:** **GitHub Pages** (репозиторий `SiberianFoboZ/dnd-chrono-game`, ветка `master`).
- **Repo URL:** `github.com:SiberianFoboZ/dnd-chrono-game.git`
- **Путь в файловой системе:** `C:\Users\vk241\.github\dnd-chrono-game\`
- **Сайт:** `https://siberianfoboz.github.io/dnd-chrono-game/`

## Состояние миграции

Миграция с inline-HTML (по одному `.html` на персонажа) на Vue SPA **полностью завершена**. Детальный план — в `MIGRATION_PLAN_V1.MD` (источник истины по архитектурным решениям).

| Фаза | Содержание | Статус |
|---|---|---|
| 1 | Инициализация Vite-проекта | ✅ |
| 2 | Базовая инфраструктура (router, types, characters) | ✅ |
| 3 | Дизайн-система (themes, `useTheme`, CSS-эффекты) | ✅ |
| 4 | Переиспользуемые компоненты (DiaryLayout, Chapter, Paragraph, Image, Backgrounds) | ✅ |
| 5.1 | Миграция Артура | ✅ |
| 5.2 | Миграция Азы | ✅ (в работе — см. uncommitted diff) |
| 5.3 | Миграция Эла | ⚠️ статус `active`, но `ElPage.vue` пока **placeholder** |
| 5.4 | Миграция Зираэллы | ✅ |
| 5.5 | Заглушки Барандура + Малбрина | ✅ |
| 5.6 | HomePage (главное меню) | ✅ |
| 7 | GitHub Actions + 404.html | ✅ |
| 8 | Удаление старой статики + перенос в корень | ✅ (192b2cd) |

**Известное расхождение:** `src/data/characters.ts` помечает Эла как `status: 'active'`, но `src/pages/ElPage.vue` всё ещё содержит заглушку «Дневник мигрируется на новую платформу…». Это нужно синхронизировать (либо доделать Эла, либо вернуть ему `'wip'`).

## Структура каталога

```
C:\Users\vk241\.github\dnd-chrono-game\
├── .gitignore              # Qwen workspace, *.bak, node_modules/, dist/, *.tsbuildinfo
├── index.html              # Vite-шаблон (<div id="app"></div>) + SPA restoration script
├── package.json            # name: "dnd-chrono-game-web"
├── package-lock.json
├── vite.config.ts          # base: '/dnd-chrono-game/', outDir: dist, alias @ → src/
├── tailwind.config.ts      # Палитры 4 персонажей + safelist diary-page-*
├── postcss.config.js       # Tailwind + Autoprefixer
├── tsconfig.json           # References → app + node
├── tsconfig.app.json       # strict, paths @/* → src/*
├── tsconfig.node.json
├── MIGRATION_PLAN_V1.MD    # План миграции (источник истины по архитектуре)
├── QWEN.md                 # Этот файл
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions → Pages (Node 24, FORCE_JAVASCRIPT_ACTIONS_TO_NODE24)
│
├── scripts/
│   └── copy-404.cjs        # Постбилд: генерирует dist/404.html (SPA fallback)
│
├── public/                 # Копируется 1:1 в dist/
│   ├── fonts/              # 4 шрифта (GreatVibes, Comforter, Agretta, ofont_ru_Corinthia)
│   └── images/
│       ├── artur/          # 16 файлов: 13 jpeg (русские имена с подчёркиваниями: 01_деревня.jpeg … 14_две_могилы.jpeg; 06_портрет_32_года удалён как сирота) + 3 Irena_*.jpg (Ирина в Валлаки)
│       ├── aza/            # 16 jpg (1.jpg … 16.jpg) + UUID-артефакт 2DD617AE-…jpg
│       ├── el/             # 63 файла (image1.jpeg … image63.jpeg, mix jpeg/png)
│       └── ziraela/        # 4 файла
│
├── src/
│   ├── main.ts             # createApp + router + mount('#app')
│   ├── App.vue             # <router-view />
│   │
│   ├── router/index.ts     # 7 маршрутов + redirect 404
│   │
│   ├── types/character.ts  # Character, Status, ThemeKey
│   ├── data/characters.ts  # Реестр 6 персонажей
│   │
│   ├── themes/
│   │   ├── index.ts        # Theme type + getTheme(slug)
│   │   ├── artur.ts        # parchment, "Ink Free..."
│   │   ├── aza.ts          # gothic, "Corinthia"
│   │   ├── el.ts           # book, "Comforter"
│   │   ├── ziraela.ts      # forest, "Agretta"
│   │   ├── barandur.ts     # minimal
│   │   └── malbrin.ts      # minimal
│   │
│   ├── composables/useTheme.ts   # CSS-переменные на <html>
│   │
│   ├── components/
│   │   ├── DiaryLayout.vue        # themeKey + Background-компонент + слот
│   │   ├── DiaryChapter.vue       # <h2> + ::before/::after орнаменты
│   │   ├── DiaryParagraph.vue     # text-indent + drop-cap
│   │   ├── DiaryImage.vue         # img + caption (left/right/none)
│   │   ├── ImageCaption.vue       # <p class="image-caption">
│   │   ├── DiaryFooter.vue        # «Запись обрывается...»
│   │   └── backgrounds/
│   │       ├── ParchmentBackground.vue   # светлая бумага
│   │       ├── GothicBackground.vue      # тёмная готика + звёздная пыль
│   │       ├── BookBackground.vue        # старая книга + пожелтение
│   │       ├── ForestBackground.vue      # лес + луна + звёзды
│   │       └── MinimalBackground.vue     # для заглушек
│   │
│   ├── pages/
│   │   ├── HomePage.vue       # Список из characters.ts + статусы + цитата
│   │   ├── ArturPage.vue      # 21 страница + 14 иллюстраций (~1422 строк)
│   │   ├── AzaPage.vue        # Один <article class="entry"> + SVG torn-edge (~1024 строк)
│   │   ├── ElPage.vue         # Заглушка (нужно доделать миграцию)
│   │   ├── ZiraelaPage.vue    # 9 <article class="entry"> + forest-silhouette SVG
│   │   ├── BarandurPage.vue   # «Эти страницы ещё не написаны...»
│   │   └── MalbrinPage.vue    # «Эти страницы ещё не написаны...»
│   │
│   └── assets/styles/
│       ├── tailwind.css       # @tailwind + @layer components (.diary-page-*)
│       ├── diary-effects.css  # .drop-cap, .diary-image.left/.right, .typo, ...
│       └── fonts.css          # @font-face Corinthia, Comforter, Agretta
│
└── dist/                     # Билд (gitignored)
```

**Замечание:** каталог `web/` (наследие до Фазы 8) содержит только `node_modules/` и больше не используется. Новые команды выполняются из корня репо.

## Персонажи и состояние дневников

| Персонаж              | Класс / роль               | Status     | Шрифт / тема (Vue) | Состояние страницы |
|-----------------------|----------------------------|------------|--------------------|--------------------|
| **Артур Могрейн**     | Паладин, бывший каратель   | `active`   | `artur` — `"Ink Free", "Segoe Print"...` · `parchment` · drop-cap `#2c2c2c` | `ArturPage.vue` (~1762 строк, 15 страниц + 16 иллюстраций) |
| **Аза** (Пепельная Роза) | Бард, цыганка, рассказчица | `active`   | `aza` — `"Corinthia"` · `gothic` · drop-cap `#8b1e2b` · ♥ ♥ ♥ | `AzaPage.vue` (~1024 строки). Конвенция «двух рук» (Артур + Аза): классы `.aza-edit` (inline-вставки) и `.aza-voice` (sidebar) — см. `diary-effects.css`. |
| **Эл**                | Дроу, покинувшая подземье  | `active` (но **placeholder**) | `el` — `'Comforter'` · `book` · drop-cap `#2a1f14` | `ElPage.vue` — заглушка |
| **Барандур**          | Дварф                      | `wip`      | `barandur` — `"Ink Free"...` · `minimal` | `BarandurPage.vue` |
| **Малбрин**           | Дроу (светлая)             | `wip`      | `malbrin` — `"Ink Free"...` · `minimal` | `MalbrinPage.vue` |
| **Зираэлла Ларус**    | Высший эльф, охотница      | `active`   | `ziraela` — `"Agretta"` · `forest` · drop-cap `#3a5e3a` · ❦ ✦ ❦ | `ZiraelaPage.vue` |

Источник истины: `src/data/characters.ts` (реестр) и `src/themes/*.ts` (темы).

## Стилистические конвенции

### CSS-переменные темы (устанавливаются `useTheme` на `<html>`)

- `--font-display` — основной шрифт персонажа
- `--drop-cap` — цвет буквицы
- `--color-{paletteKey}` — цвета палитры (paper, ink, accent, gold, bg, moss, violet, …)
- `--ornament-top`, `--ornament-bottom` — строки орнаментов (`♥ ♥ ♥`, `❦ ✦ ❦`, …)

### Tailwind `@layer components` (в `src/assets/styles/tailwind.css`)

Все `diary-page-*` — формат A4 (`max-width: 794px ≈ 210mm`), центрированы:

- `.diary-page-artur` — светлая бумага `#f5f0e8`, текст `#2c2c2c`
- `.diary-page-aza` — без фона (фон даёт `GothicBackground`), A4
- `.diary-page-el` — тёмный фон `#2a1f14`, текст `#f4e8d0`
- `.diary-page-ziraela` — без фона (фон даёт `ForestBackground`), A4
- `.diary-page-minimal` — для заглушек Барандура/Малбрина (`max-width: 720px`)

Классы перечислены в `tailwind.config.ts` → `safelist` (динамически подставляются через `:class="pageClass"` в `DiaryLayout.vue`).

### Общие классы (в `src/assets/styles/diary-effects.css`)

- `.text-indent-paragraph` — параграф с книжным отступом первой строки
- `.drop-cap::first-letter` — буквица
- `.diary-image` — изображение с `position: relative; z-index: 1` (важно — иначе перекроется фоном `.entry::before/::after`)
- `.diary-image.left` / `.right` — обтекание с `--rot`
- `.image-caption` — подпись
- `.typo`, `.strikethrough`, `.strikethrough-red` — зачёркивания
- `.margin-note`, `.sidebar-note` — заметки
- `.shout`, `.underline-wavy`, `.insert-above` — эффекты текста
- `.section-break`, `.chapter-break`, `.chapter-label` — разрывы
- `.prophecy-box`, `.gem-box` (`.red/.green/.blue`) — рамки
- `.aza-edit` — **курсивная inline-вставка Азы в тексте предложения** (для «двух рук»): `font-family: "Corinthia", "Great Vibes", cursive; color: #991007; font-style: italic`. Замена длинных inline-стилей Азы (`style="font-style: italic; font-family: 'Corinthia', 'Great Vibes', cursive; color: #991007"`).
- `.aza-voice` — **голос Азы в боковых заметках** (для `<div class="sidebar-note aza-voice">`): `font-family: "Corinthia", "Great Vibes", cursive; color: #991007` (без `font-style: italic` — italic даёт сам `.sidebar-note`).

#### Специфика scoped-стилей и `.aza-voice`

Vue `<style scoped>` добавляет к селектору `data-v-…`-атрибут, что повышает специфичность (`(0,1,1,0)`). Из-за этого scoped `.sidebar-note { color: #6a5a4a }` **перебивает** unscoped `.aza-voice { color: #991007 }`. Решение — добавить в scoped страницы явный override с двумя классами:

```css
.sidebar-note.aza-voice {
  color: #991007;
  font-family: "Corinthia", "Great Vibes", cursive;
}
```

Специфичность `(0,2,1,0)` выигрывает у `(0,1,1,0)`. Сейчас этот override есть в `<style scoped>` `ArturPage.vue`; если понадобятся азовские сайдбары в других страницах (Aza, El, Ziraela) — добавить аналогично.

### Соглашения по написанию Vue-страниц дневника

1. **`<template>` оборачивает контент в `<DiaryLayout theme-key="<slug>">`** — он подставляет фон и тему.
2. **Все стили — `<style scoped>`** в `.vue`-файле (никаких внешних CSS-файлов на страницу).
3. **Шрифты** подключены глобально через `src/assets/styles/fonts.css` (`@font-face`); семейство доступно по CSS-переменной `--font-display`.
4. **Изображения:** `<img src="/images/<slug>/<file>">` (абсолютные пути от корня сайта).
5. **Буквица:** `.entry p:first-of-type::first-letter` — крупная, цвет через `var(--drop-cap)`.
6. **Drop-cap и псевдоэлементы:** иллюстрации внутри `.entry` ОБЯЗАНЫ иметь `position: relative; z-index: 1` (см. `assets/styles/diary-effects.css`), иначе их перекроет фоновая текстура листа.
7. **Имена файлов изображений:** на русском с подчёркиваниями (`01_деревня.jpeg`) или просто числовые (`1.jpg`, `2.png`).
8. **Параграфы:** `text-align: justify`, `text-indent: 1.5em`.
9. **Языковая конвенция:** контент полностью на русском. Не переводить без явного запроса.

## Команды для запуска

Все команды выполняются **из корня репозитория** (не из `web/` — `web/` опустел после Фазы 8).

### Локальная разработка

```bash
npm install          # один раз (или npm ci после обновления lock)
npm run dev          # Vite dev-сервер на http://localhost:5173
```

Пути к шрифтам/изображениям работают корректно, потому что Vite резолвит `/fonts/*` и `/images/*` из `public/`.

### Сборка production-бандла

```bash
npm run build        # vue-tsc -b && vite build && node scripts/copy-404.cjs
```

Результат в `dist/`:

- `dist/index.html` — точка входа SPA (с restoration-скриптом)
- `dist/404.html` — генерируется `scripts/copy-404.cjs` (SPA fallback для refresh на глубоких маршрутах)
- `dist/assets/*.{js,css}` — lazy-loaded чанки страниц
- `dist/fonts/`, `dist/images/` — статика из `public/`

### Локальный preview собранного билда

```bash
npm run preview      # локальный сервер для dist/
```

### Тип-чек без сборки

```bash
npm run type-check   # vue-tsc --noEmit
```

**Тестирование:** отсутствует (проект контентный).
**Линтеры:** не используются.

## Деплой

### Текущий способ — GitHub Actions

`.github/workflows/deploy.yml`:

1. Триггер: `push` в `master` или `workflow_dispatch`.
2. **Node 24** (`FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: "true"` в env — убирает deprecation-варнинг от JS-actions, которые иначе цепляются за Node 20 из образа раннера).
3. `actions/checkout@v4` → `actions/setup-node@v4` (Node 24, кеш npm по `package-lock.json`) → `npm ci` → `npm run build`.
4. `actions/upload-pages-artifact@v3` загружает `./dist/` как артефакт.
5. `actions/deploy-pages@v4` деплоит артефакт на GitHub Pages (GitHub-native, без ветки `gh-pages`).

**Требования к репозиторию** (настраивается один раз через GitHub UI):

- Settings → Pages → Source: **GitHub Actions** (не branch).
- Settings → Actions → General → Workflow permissions: **Read and write permissions** + **Allow GitHub Actions to create and approve pull requests**.

### Как работает SPA fallback на GitHub Pages

GitHub Pages не умеет в rewrite для SPA history-mode. Используется техника rafgraph/spa-github-pages (MIT) — двухфайловая конструкция:

1. **`index.html`** содержит restoration-скрипт в `<head>`: если URL вида `/dnd-chrono-game/?/artur` (т.е. в `location.search` идёт `?/...`), скрипт декодирует query и заменяет URL на чистый `/dnd-chrono-game/artur` через `history.replaceState`. После этого Vue Router читает корректный маршрут.
2. **`dist/404.html`** генерируется `scripts/copy-404.cjs` после `vite build`: redirect-скрипт берёт текущий URL `/dnd-chrono-game/<route>`, отрезает сегменты до `pathSegmentsToKeep = 1` (т.е. оставляет `dnd-chrono-game`) и перенаправляет на `/dnd-chrono-game/?/<route>`.

Без этого refresh / прямой заход на `/artur`, `/aza`, … возвращал бы 404 → копию `index.html` → Vue Router видел бы `/404.html` → catch-all редиректил бы на `/`.

## Рабочий процесс с git

- Ветка: `master`.
- Remote: `origin` → `github.com:SiberianFoboZ/dnd-chrono-game.git`.
- Сообщения коммитов — на русском, формат «{Объект}: {действие}» (например, `artur: перенос в Vue-страницу и theme`).
- **НЕ коммитить** `dist/` и `node_modules/` (в `.gitignore` корня).
- **Push:** по явному запросу пользователя. Никогда не пушить автоматически.

## Заметки и ограничения

- **Vue 3.5 + TypeScript strict** — код в `src/**` типизирован; `vue-tsc -b` запускается на каждом билде.
- **Vite 8** с `base: '/dnd-chrono-game/'` — все ассеты подставляются с префиксом репозитория.
- **Vue Router history mode** + `404.html` fallback — refresh на `/artur`, `/aza`, … корректно работает на GitHub Pages.
- **Шрифты:** все `.ttf`/`.otf` лежат в `public/fonts/`. Подключаются через `src/assets/styles/fonts.css` (`@font-face`). Файл `ofont_ru_Corinthia.ttf` лежит рядом для архива, но не используется в активном CSS.
- **Изображения:** все скопированы в `public/images/<slug>/`. Исходники в корне репо удалены вместе со старой статикой (Фаза 8).
- **UUID-файл `public/images/aza/2DD617AE-5435-...jpg`** — случ. артефакт, скопирован как есть.
- **Извлечение иллюстраций из .docx:** skill `extract-docx`. Изображения хранятся в `word/media/` внутри docx. Извлекать в `<slug>/files/` с числовыми именами.
- **Git-ignored:** `.qwen/` (рабочая область Qwen Code), `*.bak`, `node_modules/`, `dist/`, `.vite/`, `*.tsbuildinfo`, `.env*`.
- **Связь персонажей:** Артур и Аза встретились первыми. Эл, Барандур, Малбрин и Зираэлла — часть того же отряда. В дневниках упоминаются друг друга.

## Текущее состояние рабочей копии (uncommitted)

`git status` показывает:

```
modified:   QWEN.md                              ← этот файл переписан полностью
modified:   src/assets/styles/diary-effects.css  ← +14 строк (.aza-edit, .aza-voice)
modified:   src/pages/ArturPage.vue              ← 1552 +/- 1579: перенос блока Азы
                                                в «Валлаки», вставка Irena-картинок,
                                                удаление дубля sidebar-note и мёртвых
                                                override, замена inline-стилей Азы
                                                на .aza-edit / .aza-voice
deleted:    public/images/artur/06_портрет_32_года.jpeg  ← сирота, не использовался

Untracked files:
        public/images/artur/Irena_1.jpg         ← вставлена в раздел «Валлаки»
        public/images/artur/Irena_2.jpg         ← вставлена в раздел «Валлаки»
        public/images/artur/Irena_3.jpg         ← вставлена в раздел «Валлаки»
        new_add_text/artur/                      ← черновики + новые иллюстрации
          artur/index.html
          artur/new text.txt
          artur/Irena_1.jpg, Irena_2.jpg, Irena_3.jpg  (уже интегрированы)
          aza/dnevnik_Azy.docx
```

### Что сделано в текущей сессии (2026-08-21)

1. **Очистка `ArturPage.vue`:**
   - Удалён дубликат `sidebar-note` про «Бросились в глаза» в разделе «Приют» (оставлено первое вхождение).
   - Удалён пустой `.artur-diary { /* комментарий */ }` из `<style scoped>`.
   - Удалён override `.typo { background: #ffe0e0; ... }` (класс нигде не использовался; после эксперимента с применением — откачено).
2. **Консолидация inline-стилей Азы:**
   - В `diary-effects.css` добавлены utility-классы `.aza-edit` (inline-вставки) и `.aza-voice` (sidebar).
   - В `ArturPage.vue` все 80 inline-стилей `style="font-style: italic; font-family: 'Corinthia', 'Great Vibes', cursive; color: #991007"` заменены на `<span class="aza-edit">`; все 24 `style="color: #991007; font-family: 'Corinthia', 'Great Vibes', cursive"` в `<div class="sidebar-note">` заменены на `<div class="sidebar-note aza-voice">`.
   - В scoped `ArturPage.vue` добавлен override `.sidebar-note.aza-voice { color: #991007; ... }` для перебивания scoped `.sidebar-note { color: #6a5a4a }` (специфичность data-атрибута).
3. **Интеграция картинок Ирины:**
   - Блок Азы про «Кстати, Артур, почему ты не обращаешь внимания на нашу новую спутницу…» **перемещён** из раздела «Пророчество» в раздел «Валлаки» (после абзаца «…Привал прошёл без происшествий. Почти.»).
   - В том же месте добавлены три `<img>` (`/images/artur/Irena_1.jpg`, `Irena_2.jpg`, `Irena_3.jpg`) подряд.
   - Файлы скопированы из `new_add_text/artur/` в `public/images/artur/`.
4. **Удалён сирота `06_портрет_32_года.jpeg`** (лежал в `public/images/artur/`, но не использовался в коде).

### Что осталось

- `ElPage.vue` всё ещё placeholder при `status: 'active'` — нужно либо доделать миграцию Эла, либо вернуть `'wip'` в `src/data/characters.ts` (см. «Известное расхождение» выше).
- Свежие неинтегрированные правки: `new_add_text/artur/new text.txt` и `new_add_text/aza/dnevnik_Azy.docx`.
