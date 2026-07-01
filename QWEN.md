# QWEN.md — Хроники отряда (dnd-chrono-game)

## Обзор проекта

**Летопись D&D-кампании** в виде дневников шести персонажей отряда, входящего в туман Баровии. Каждый персонаж ведёт свой собственный дневник с уникальным визуальным стилем (шрифт, палитра, орнаменты, эффекты бумаги).

- **Тип:** Контентный (творческий писательский проект). **Vue 3 + Vite + TypeScript + Tailwind CSS**, деплой как статика на GitHub Pages.
- **Язык:** Русский (`<html lang="ru">` на всех страницах, включая имена файлов, комментарии в CSS и текст).
- **Хостинг:** **GitHub Pages** (репозиторий `SiberianFoboZ/dnd-chrono-game`, ветка `master`).
- **Repo URL:** `github.com:SiberianFoboZ/dnd-chrono-game.git`
- **Путь в файловой системе:** `C:\Users\vk241\.github\dnd-chrono-game\`

## Состояние миграции (Vue 3)

Проект мигрирует с inline-HTML (по одному `.html` на персонажа) на Vue SPA. План зафиксирован в `MIGRATION_PLAN_V1.MD`.

| Фаза | Содержание | Статус |
|---|---|---|
| 1 | Инициализация `web/` (Vite + Vue + TS + Tailwind) | ✅ |
| 2 | Базовая инфраструктура (router, types, characters) | ✅ |
| 3 | Дизайн-система (themes, `useTheme`, CSS-эффекты) | ✅ |
| 4 | Переиспользуемые компоненты (DiaryLayout, Chapter, Paragraph, Image, Backgrounds) | ✅ |
| 5.1 | Миграция Артура | ✅ |
| 5.2 | Миграция Азы | ✅ |
| 5.3 | Миграция Эла | 🟡 заглушка (финал отдельно) |
| 5.4 | Миграция Зираэллы | ✅ |
| 5.5 | Минимальные заглушки Барандура + Малбрина | ✅ |
| 5.6 | HomePage (главное меню) | ✅ |
| 7 | GitHub Actions + 404.html | ✅ |
| 8 | Удаление старой статики + перенос `web/*` в корень + push | ⏸ отложено |

**Переходный период:** старая статика в корне (`Artur/`, `Aza/`, `El/`, `Ziraela/`, `Barandur/`, `Malbrin/`, `index.html`) продолжает обслуживаться gh-pages до завершения Фазы 8. Новый билд в `web/dist/` существует параллельно.

## Структура каталога

```
C:\Users\vk241\.github\dnd-chrono-game\
├── index.html              # Главное меню (СТАРОЕ, прод пока на нём)
├── MIGRATION_PLAN_V1.MD    # План миграции (источник истины)
├── QWEN.md                 # Этот файл
├── .gitignore              # Игнорирует .qwen/, *.bak, web/{node_modules,dist}/
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions → Pages
│
│   ─────── Старая статика (до Фазы 8) ───────
├── Artur/                  # Артур — Паладин (статический HTML)
├── Aza/                    # Аза — Бард (статический HTML)
├── El/                     # Эл — Дроу (статический HTML)
├── Ziraela/                # Зираэлла — Высший эльф (статический HTML)
├── Barandur/               # Заглушка
├── Malbrin/                # Заглушка
│
│   ─────── Новый Vue-проект (миграция) ───────
└── web/                    # Vue 3 + Vite + TS + Tailwind
    ├── package.json        # type: module, build генерирует 404.html
    ├── package-lock.json
    ├── vite.config.ts      # base: '/dnd-chrono-game/', outDir: dist
    ├── tailwind.config.ts  # Палитры для 6 персонажей
    ├── postcss.config.js   # Tailwind + Autoprefixer
    ├── tsconfig.json       # References → app + node
    ├── tsconfig.app.json   # strict, paths @/* → src/*
    ├── tsconfig.node.json
    ├── index.html          # Vite-шаблон (<div id="app"></div>)
    │
    ├── scripts/
    │   └── copy-404.cjs    # Постбилд: dist/index.html → dist/404.html
    │
    ├── public/             # Статика, копируется 1:1 в dist/
    │   ├── fonts/          # 4 шрифта (GreatVibes, Comforter, Agretta, ofont_ru_Corinthia)
    │   └── images/
    │       ├── artur/      # 14 jpeg (русские имена с подчёркиваниями)
    │       ├── aza/        # 17 jpg (1.jpg … 16.jpg + UUID-артефакт)
    │       ├── el/         # 63 файла (image1.jpeg … image63.jpeg)
    │       └── ziraela/    # 4 файла (1.png, 2.png, 3.jpeg, 4.png)
    │
    └── src/
        ├── main.ts         # createApp + router + mount
        ├── App.vue         # <router-view />
        │
        ├── router/index.ts # 7 маршрутов + redirect 404
        │
        ├── types/
        │   └── character.ts  # Character, Status, ThemeKey
        ├── data/
        │   └── characters.ts # Реестр 6 персонажей
        │
        ├── themes/
        │   ├── index.ts       # Theme type + getTheme(slug)
        │   ├── artur.ts       # parchment, "Ink Free..."
        │   ├── aza.ts         # gothic, "Corinthia"
        │   ├── el.ts          # book, "Comforter"
        │   ├── ziraela.ts     # forest, "Agretta"
        │   ├── barandur.ts    # minimal
        │   └── malbrin.ts     # minimal
        │
        ├── composables/
        │   └── useTheme.ts    # CSS-переменные на <html>: --font-display, --drop-cap, --color-*
        │
        ├── components/
        │   ├── DiaryLayout.vue     # themeKey + Background-компонент + слот
        │   ├── DiaryChapter.vue    # <h2> + ::before/::after орнаменты
        │   ├── DiaryParagraph.vue  # text-indent + drop-cap
        │   ├── DiaryImage.vue      # img + caption (left/right/none)
        │   ├── ImageCaption.vue    # <p class="image-caption">
        │   ├── DiaryFooter.vue     # «Запись обрывается...»
        │   └── backgrounds/
        │       ├── ParchmentBackground.vue  # светлая бумага
        │       ├── GothicBackground.vue     # тёмная готика + звёздная пыль
        │       ├── BookBackground.vue       # старая книга + пожелтение
        │       ├── ForestBackground.vue     # лес + луна + звёзды
        │       └── MinimalBackground.vue    # для заглушек
        │
        ├── pages/
        │   ├── HomePage.vue       # Список из characters.ts + статусы + цитата
        │   ├── ArturPage.vue      # 21 страница + 14 иллюстраций
        │   ├── AzaPage.vue        # Один <article class="entry"> с rotate(-0.15deg) + SVG torn-edge
        │   ├── ElPage.vue         # Заглушка «мигрируется»
        │   ├── ZiraelaPage.vue    # 9 <article class="entry"> + forest-silhouette SVG
        │   ├── BarandurPage.vue   # «Эти страницы ещё не написаны...»
        │   └── MalbrinPage.vue    # «Эти страницы ещё не написаны...»
        │
        └── assets/styles/
            ├── tailwind.css       # @tailwind + @layer components (.diary-page-artur/-aza/...)
            ├── diary-effects.css  # .drop-cap, .diary-image.left/.right, .typo, .margin-note, ...
            └── fonts.css          # @font-face Corinthia, Comforter, Agretta
```

## Персонажи и состояние дневников

| Персонаж              | Класс / роль               | Статус        | Шрифт / тема (Vue) |
|-----------------------|----------------------------|---------------|--------------------|
| **Артур Могрейн**     | Паладин, бывший каратель   | ✅ мигрирован  | `artur` — `"Ink Free", "Segoe Print"...` · `parchment` · drop-cap `#2c2c2c` |
| **Аза** (Пепельная Роза) | Бард, цыганка, рассказчица | ✅ мигрирован  | `aza` — `"Corinthia"` · `gothic` · drop-cap `#8b1e2b` · ♥ ♥ ♥ |
| **Эл**                | Дроу, покинувшая подземье  | 🟡 заглушка  | `el` — `'Comforter'` · `book` · drop-cap `#2a1f14` |
| **Барандур**          | Дварф                      | ✅ minimal    | `barandur` — `"Ink Free"...` · `minimal` |
| **Малбрин**           | Дроу (светлая)             | ✅ minimal    | `malbrin` — `"Ink Free"...` · `minimal` |
| **Зираэлла Ларус**    | Высший эльф, охотница      | ✅ мигрирован  | `ziraela` — `"Agretta"` · `forest` · drop-cap `#3a5e3a` · ❦ ✦ ❦ |

Источник истины: `web/src/data/characters.ts` (реестр) и `web/src/themes/*.ts` (темы).

## Стилистические конвенции (Vue)

В Vue-проекте конвенции вынесены в:

### CSS-переменные темы (устанавливаются `useTheme` на `<html>`)
- `--font-display` — основной шрифт персонажа
- `--drop-cap` — цвет буквицы
- `--color-{paletteKey}` — цвета палитры (paper, ink, accent, gold, bg, moss, violet, …)
- `--ornament-top`, `--ornament-bottom` — строки орнаментов (`♥ ♥ ♥`, `❦ ✦ ❦`, ``)

### Общие классы (в `assets/styles/diary-effects.css`)
- `.text-indent-paragraph` — параграф с книжным отступом
- `.drop-cap::first-letter` — буквица
- `.diary-image` — изображение с `position: relative; z-index: 1` (важно — иначе перекроется фоном `.entry::before/::after`)
- `.diary-image.left` / `.right` — обтекание с `--rot`
- `.image-caption` — подпись
- `.typo`, `.strikethrough`, `.strikethrough-red` — зачёркивания
- `.margin-note`, `.sidebar-note` — заметки
- `.shout`, `.underline-wavy`, `.insert-above` — эффекты текста
- `.section-break`, `.chapter-break`, `.chapter-label` — разрывы
- `.prophecy-box`, `.gem-box` (`.red/.green/.blue`) — рамки

### Tailwind `@layer components` (в `assets/styles/tailwind.css`)
- `.diary-page-artur` — светлая бумага, max-width 14.8cm
- `.diary-page-aza` — без фона (фон даёт GothicBackground), max-width 820px
- `.diary-page-el` — тёмный фон, max-width 1200px
- `.diary-page-ziraela` — без фона (фон даёт ForestBackground), max-width 820px
- `.diary-page-minimal` — для заглушек Барандура/Малбрина

### Соглашения по написанию Vue-страниц дневника

1. **`<template>` оборачивает контент в `<DiaryLayout theme-key="<slug>">`** — он подставляет фон и тему.
2. **Все стили — `<style scoped>`** в `.vue`-файле (никаких внешних CSS-файлов на страницу).
3. **Шрифты** подключены глобально через `assets/styles/fonts.css` (`@font-face`); семейство доступно по CSS-переменной `--font-display`.
4. **Изображения:** `<img src="/images/<slug>/<file>">` (абсолютные пути от корня сайта).
5. **Буквица:** `.entry p:first-of-type::first-letter` — крупная, цвет через `var(--drop-cap)`.
6. **Drop-cap и псевдоэлементы:** иллюстрации внутри `.entry` ОБЯЗАНЫ иметь `position: relative; z-index: 1` (см. `assets/styles/diary-effects.css`), иначе их перекроет фоновая текстура листа.
7. **Имена файлов изображений:** на русском с подчёркиваниями (`01_деревня.jpeg`) или просто числовые (`1.jpg`, `2.png`).
8. **Параграфы:** `text-align: justify`, `text-indent: 1.5em`.
9. **Языковая конвенция:** контент полностью на русском. Не переводить без явного запроса.

## Команды для запуска

### Локальная разработка

```bash
cd web
npm install          # один раз (или npm ci после обновления lock)
npm run dev          # запускает Vite dev-сервер на http://localhost:5173
```

Пути к шрифтам/изображениям работают корректно, потому что Vite резолвит `/fonts/*` и `/images/*` из `public/`.

### Сборка production-бандла

```bash
cd web
npm run build        # vue-tsc -b && vite build && node scripts/copy-404.cjs
```

Результат:
- `web/dist/index.html` — точка входа SPA
- `web/dist/404.html` — копия для GitHub Pages SPA fallback (history mode)
- `web/dist/assets/*.{js,css}` — lazy-loaded чанки страниц
- `web/dist/fonts/`, `web/dist/images/` — статика из `public/`

### Локальный preview собранного билда

```bash
cd web
npm run preview      # локальный сервер для dist/
```

### Тип-чек без сборки

```bash
cd web
npm run type-check   # vue-tsc --noEmit
```

**Тестирование:** отсутствует (проект контентный).
**Линтеры:** не используются.

## Деплой

### Текущий способ — GitHub Actions

`.github/workflows/deploy.yml`:
1. Триггер: `push` в `master` или `workflow_dispatch`.
2. `actions/setup-node@v4` (Node 20) → `npm ci` в `web/` → `npm run build`.
3. `actions/upload-pages-artifact@v3` загружает `web/dist/` как артефакт.
4. `actions/deploy-pages@v4` деплоит артефакт на GitHub Pages (GitHub-native, не требует ветки `gh-pages`).

**Требования к репозиторию** (настраивается один раз через GitHub UI):
- Settings → Pages → Source: **GitHub Actions** (не branch).
- Settings → Actions → General → Workflow permissions: **Read and write permissions** + **Allow GitHub Actions to create and approve pull requests**.

### Сайт

`https://siberianfoboz.github.io/dnd-chrono-game/`

## Рабочий процесс с git

- Ветка: `master`.
- Remote: `origin` → `github.com:SiberianFoboZ/dnd-chrono-game.git`.
- Сообщения коммитов — на русском, формат «{Объект}: {действие}» (например, `artur: перенос в Vue-страницу и theme`).
- **НЕ коммитить** `web/dist/` и `web/node_modules/` (в `.gitignore` внутри `web/`).
- **НЕ коммитить** рабочий прогресс в старых файлах (`Aza/index.html`, `Aza/new_text.txt`) без явного запроса.
- **Push:** по явному запросу пользователя. Никогда не пушить автоматически.

## Заметки и ограничения

- **Vue 3.5 + TypeScript strict** — код в `web/src/**` типизирован; `vue-tsc -b` запускается на каждом билде.
- **Vite 5** с `base: '/dnd-chrono-game/'` — все ассеты подставляются с префиксом репозитория.
- **Vue Router history mode** + `404.html` fallback — refresh на `/artur`, `/aza`, … корректно работает на GitHub Pages.
- **Шрифты:** все `.ttf`/`.otf` лежат в `web/public/fonts/`; `ofont_ru_Corinthia.ttf` — резервный (не подключается в активном CSS, но скопирован для архива).
- **Изображения:** все скопированы из старых `<character>/files/` (или из корня для Артура/Эла) в `web/public/images/<slug>/`. Исходники в корне не тронуты до Фазы 8.
- **`hdphoto*.wdp` в El** — формат Windows HD Photo, могут быть сырыми заготовками для конвертации. Не задействованы в `index.html`. Размер велик — рассмотреть удаление, если не нужны.
- **UUID-файл `Aza/files/2DD617AE-5435-...jpg`** — случ. артефакт, скопирован в `web/public/images/aza/` как есть.
- **Git-ignored:** `.qwen/` (рабочая область Qwen Code), `*.bak`, `web/node_modules/`, `web/dist/`, `*.tsbuildinfo`.
- **Связь персонажей:** Артур и Аза встретились первыми. Эл, Барандур, Малбрин и Зираэлла — часть того же отряда. В дневниках упоминаются друг друга.
- **Извлечение иллюстраций из .docx:** skill `extract-docx`. Изображения хранятся в `word/media/` внутри docx. Извлекать в `<character>/files/` с числовыми именами.