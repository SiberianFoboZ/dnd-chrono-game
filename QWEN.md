# QWEN.md — Хроники отряда (dnd-chrono-game)

> **Актуально по состоянию на 2026-09-05.** Миграция на Vue 3 + Vite + TypeScript + Tailwind **завершена** (включая Фазу 8 — перенос в корень). Последняя сессия — добавление продолжения Баровии в `ArturPage.vue` (7 новых сцен + 7 иллюстраций), регистрация Ирины в реестре, публикация коммита `2b5a397`. Запланирован рефакторинг модулей дневников (см. раздел ниже).

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
| 5.2 | Миграция Азы | ✅ |
| 5.3 | Миграция Эла | ✅ |
| 5.4 | Миграция Зираэллы | ✅ |
| 5.5 | Заглушки Барандура + Малбрина | ✅ |
| 5.6 | HomePage (главное меню) | ✅ |
| 7 | GitHub Actions + 404.html | ✅ |
| 8 | Удаление старой статики + перенос в корень | ✅ (192b2cd) |

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
│       ├── irena/          # заглушка (персонаж не имеет иллюстраций)
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
│   │   ├── irena.ts        # minimal (регистрация)
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
│   │   ├── ArturPage.vue      # 24 страницы + 23 иллюстрации (~2272 строк)
│   │   ├── AzaPage.vue        # Один <article class="entry"> + SVG torn-edge (~2376 строк)
│   │   ├── ElPage.vue         # 47 эпизодов + 58 иллюстраций (~719 строк, табличный layout)
│   │   ├── ZiraelaPage.vue    # 9 <article class="entry"> + forest-silhouette SVG (~917 строк)
│   │   ├── IrenaPage.vue      # «Эти страницы ещё не написаны...»
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

## Персонажи и состояние дневников

| Персонаж              | Класс / роль               | Status     | Шрифт / тема (Vue) | Состояние страницы |
|-----------------------|----------------------------|------------|--------------------|--------------------|
| **Артур Могрейн**     | Паладин, бывший каратель   | `active`   | `artur` — `"Ink Free", "Segoe Print"...` · `parchment` · drop-cap `#2c2c2c` | `ArturPage.vue` (~**2272** строк, 24 страницы + 23 иллюстрации). Конвенция «двух рук» (Артур + Аза): классы `.strikethrough` (рука Артура) и `.aza-edit` / `.aza-voice` (рука Азы) — см. `diary-effects.css`. |
| **Аза** (Пепельная Роза) | Бард, цыганка, рассказчица | `active`   | `aza` — `"Corinthia"` · `gothic` · drop-cap `#8b1e2b` · ♥ ♥ ♥ | `AzaPage.vue` (~**2376** строк — самый крупный файл дневника, включает SVG torn-edge) |
| **Эл**                | Дроу, покинувшая подземье  | `active`   | `el` — `'Comforter'` · `book` · drop-cap `#2a1f14` | `ElPage.vue` (~**719** строк, 47 эпизодов + 58 иллюстраций, табличный layout) |
| **Барандур**          | Дварф                      | `wip`      | `barandur` — `"Ink Free"...` · `minimal` | `BarandurPage.vue` (~46 строк, заглушка) |
| **Малбрин**           | Дроу (светлая)             | `wip`      | `malbrin` — `"Ink Free"...` · `minimal` | `MalbrinPage.vue` (~46 строк, заглушка) |
| **Ирина Колян**       | Дочь бургомистра           | `wip`      | `irena` — `"Ink Free"...` · `minimal` | `IrenaPage.vue` (~46 строк, заглушка; зарегистрирована в `characters.ts`, есть 3 фото в `public/images/artur/Irena_*.jpg` как diegetic-вставки) |
| **Зираэлла Ларус**    | Высший эльф, охотница      | `active`   | `ziraela` — `"Agretta"` · `forest` · drop-cap `#3a5e3a` · ❦ ✦ ❦ | `ZiraelaPage.vue` (~**917** строк, 9 `<article class="entry">` + forest-silhouette SVG) |

Источник истины: `src/data/characters.ts` (реестр) и `src/themes/*.ts` (темы).

### Рост файлов дневников (для контекста при планировании рефакторинга)

| Файл | Строк | Тренд |
|------|-------|-------|
| `ArturPage.vue` | 2272 | рос за каждую сессию: 1422 → 1762 → 1909 → 2272 (+360 за последнее добавление Баровии) |
| `AzaPage.vue`   | 2376 | рос быстрее всех: 1024 → 2376 (за счёт inline-заметок «двух рук» и SVG-декораций) |
| `ZiraelaPage.vue` | 917 | стабильно, добавлялось постепенно |
| `ElPage.vue`    | 719 | финализирован в одну сессию (47 эпизодов + табличный layout) |

**Порог неудобства:** при ~2000+ строк в одном файле затрудняются правки (скролл, мержи, поиск). Рефакторинг запланирован, но **не начинать без явного согласования** — см. раздел ниже.

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

## Запланированный рефакторинг модулей дневников

> ⚠️ **ВАЖНО:** Этот раздел — план на будущее. **Не приступать к рефакторингу без явного согласования с пользователем.** Любые предложения «а давайте сразу разобьём ArturPage на компоненты» — останавливать и спрашивать подтверждения.

### Проблема

По состоянию на 2026-09-05 два дневника превысили 2000 строк в одном файле:

- `AzaPage.vue` — **2376** строк (самый крупный)
- `ArturPage.vue` — **2272** строк (после добавления Баровии в этой сессии)

Дальнейший рост приведёт к:
- трудностям в редактировании (длинный скролл, тяжёлый поиск)
- проблемам при слиянии параллельных правок (особенно заметки Азы в ArturPage)
- замедлению type-check / IDE

### Рассмотренные подходы

| Подход | Суть | Плюсы | Минусы |
|--------|------|-------|--------|
| **A. Глава = компонент** | Каждый `<div class="page">` — отдельный `.vue` файл в `src/components/<slug>/chapters/` | Минимальное изменение конвенций; проще мержить; лучше LSP | Весь дневник остаётся в одном чанке (lazy нет); scoped-стили дублируются |
| **B. Lazy chapters** | A + `defineAsyncComponent()` для динамической подгрузки | Падение initial bundle (ArturPage был 132 kB) | Чуть сложнее: нужен IntersectionObserver для триггера |
| **C. Контент в data-файле** | Текст в типизированный TS-массив `data/<slug>-diary.ts`; страница — тонкий рендер | Радикальное решение; **упрощает работу не-тех. коллаборатора (Азы)** — править `paragraphs[i].content` без `<span>`-ов; легче аудит осиротевших изображений | Большой рефактор (~2300 строк переписать); inline-стили теряются (нужны utility-классы, например `.klatva-block` для латинских клятв) |

### Рекомендуемая последовательность (НЕ выполнять без согласования)

1. **Этап 1 (ближайший, когда станет совсем неудобно):** подход A для `ArturPage.vue` (или для самого большого — `AzaPage.vue`). Общие стили выносятся в `assets/styles/diary-effects.css`.
2. **Этап 2 (когда следующий персонаж достигнет ~1500 строк):** подход C. Шаблон `<Slug>Page.vue` становится универсальным рендером, контент — в `data/<slug>-diary.ts`. Естественно ложится на память про **не-тех. коллаборатора** — заметки Азы редактируются в массиве.

Подход B пропускается: для контентного сайта экономия bundle не критична (пользователь всё равно читает все главы).

### Что должно предшествовать любому рефакторингу

- Согласование выбранного подхода (A / C) с пользователем.
- Снимок текущего состояния (`git status` чистый, ветка `master` синхронизирована).
- Описание в этом разделе конкретного плана: какие файлы создаются, какая конвенция меняется, как обновляются памяти и `MIGRATION_PLAN_V1.MD`.
- После завершения — обновить «Актуально по состоянию на …» в первой строке этого файла.
