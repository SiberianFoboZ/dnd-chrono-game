# MIGRATION_PLAN_V1.MD

> План перехода `dnd-chrono-game` на **Vue 3 + TypeScript + Vite + Tailwind CSS**.
> Версия: 1 (зафиксирован после серии решений в QWEN-сессии).
> Хостинг остаётся **GitHub Pages**, репозиторий `SiberianFoboZ/dnd-chrono-game`, ветка `master`.

---

## 0. Принципы

- Сохранить весь существующий контент и визуальную идентичность каждого дневника 1:1.
- Убрать дублирование inline-стилей — один источник темы/палитры/шрифта на персонажа.
- Сохранить GitHub Pages как единственный хостинг (никакого сервера).
- Добавить типобезопасность (TypeScript strict) для реестра персонажей, маршрутов и тем.
- Не ломать текущую статику в проде до окончания миграции — собираем локально.

---

## 1. Зафиксированные архитектурные решения

| Решение | Выбор | Обоснование |
|---|---|---|
| Тип приложения | Vite SPA, статика после сборки | GitHub Pages не умеет в runtime SSR; содержимое статично |
| Роутинг | Vue Router history mode + `404.html` fallback | Красивые URL; fallback обязателен для refresh на глубоких маршрутах |
| Tailwind | **v3.4.x** | Стабильный, проверенный, много документации |
| State | **composables** (без Pinia) | Состояние минимальное (пара CSS-переменных); Pinia избыточен |
| Пакетный менеджер | **npm** | Уже стоит; pnpm не установлен |
| Хранение текстов | **inline в `<template>` .vue** | Тексты переплетены с орнаментами, drop-cap, обтеканием |
| Шрифты | `web/public/fonts/` + `@font-face` | Работает на GitHub Pages; имена файлов те же |
| Изображения | `web/public/images/<slug>/...` | Прямые ссылки, не импортируем каждый `<img>` |
| Спецэффекты | Tailwind `@layer components` + `diary-effects.css` для `::first-letter`/`::before`/`::after` | Tailwind не покрывает псевдоэлементы |
| TypeScript | strict | Проект новый, цена ошибки низкая |
| История миграции | **Постепенно** | Артур → Аза → Эл → Зираэлла → Барандур → Малбрин |
| Стратегия перехода | **Собирать локально, не выкатывать** | gh-pages раздаёт корень `master` со старой статикой, пока все 6 не готовы |
| Деплой | GitHub Actions | Автоматизация после полной готовности |

---

## 2. Структура переходного периода

```
dnd-chrono-game/                     ← корень репо (пока в нём же живёт старая статика)
├── index.html                       ← раздаётся gh-pages пока не мигрировано
├── Artur/, Aza/, El/, Ziraela/,     ← статические дневники в проде
│   Barandur/, Malbrin/
├── index.html.bak                   ← бэкап меню (историческое)
├── MIGRATION_PLAN_V1.MD             ← этот файл
├── QWEN.md                          ← документация
└── web/                             ← каталог разработки Vite-проекта (изолирован)
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── index.html                   ← шаблон Vite (НЕ дневник)
    ├── public/
    │   ├── fonts/                   ← все .ttf/.otf
    │   └── images/
    │       ├── artur/
    │       ├── aza/
    │       ├── el/
    │       └── ziraela/
    └── src/
        ├── main.ts
        ├── App.vue
        ├── router/index.ts
        ├── pages/
        ├── components/
        ├── composables/
        ├── themes/
        ├── data/
        ├── types/
        └── assets/styles/
```

Ключевое: `web/` изолирован. До Фазы 7 gh-pages его игнорирует.

---

## 3. Целевая структура (после Фазы 8)

```
dnd-chrono-game/
├── index.html                       ← результат `vite build`
├── assets/                          ← шрифты и картинки из public/
├── MIGRATION_PLAN_V1.MD
├── QWEN.md                          ← обновлён
├── README.md                        ← новый, для разработчика
├── src/                             ← бывший web/src/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
└── .github/workflows/deploy.yml     ← новый, автодеплой из dist/
```

---

## 4. Поэтапный план

### Фаза 0 — Решения

- [x] Определить хранение текстов: inline в `.vue` `<template>`.
- [x] Определить историю миграции: постепенно, с Артура.
- [x] Определить деплой: GitHub Actions.
- [x] Определить версию Tailwind: v3.4.x.
- [x] Определить стратегию перехода: собирать локально, не выкатывать.

### Фаза 1 — Инициализация (`web/`)

- [ ] `npm init -y` внутри `web/`.
- [ ] Установить runtime: `vue@^3`, `vue-router@^4`.
- [ ] Установить dev: `vite@^5`, `@vitejs/plugin-vue`, `typescript@^5`, `vue-tsc`, `@types/node`, `tailwindcss@^3.4`, `postcss`, `autoprefixer`.
- [ ] Создать `vite.config.ts`: `base: '/dnd-chrono-game/'`, `build.outDir: 'dist'`.
- [ ] Создать `tailwind.config.ts` (кастомные цвета по персонажам — см. §5).
- [ ] Создать `tsconfig.json` + `tsconfig.node.json` (strict, alias `@/`).
- [ ] Скопировать шрифты в `web/public/fonts/`.
- [ ] Скопировать изображения персонажей в `web/public/images/<slug>/`.
- [ ] Не трогать `index.html`, `Artur/`, `Aza/`, `El/`, `Ziraela/`, `Barandur/`, `Malbrin/`, `index.html.bak` — они продолжают жить в корне.
- [ ] `.gitignore` (в корне): добавить `web/node_modules/`, `web/dist/`.
- [ ] `.gitignore` (внутри `web/`): добавить `node_modules/`, `dist/`.
- [ ] Первый коммит: `web: инициализация Vite + Vue + TS + Tailwind скета`.

### Фаза 2 — Базовая инфраструктура

- [ ] `web/index.html`: шаблон Vite (`<div id="app"></div>` + `<script type="module" src="/src/main.ts">`).
- [ ] `web/src/main.ts`: `createApp(App).use(router).mount('#app')`.
- [ ] `web/src/App.vue`: `<router-view />`.
- [ ] `web/src/router/index.ts`: `createWebHistory(import.meta.env.BASE_URL)`, маршруты:
  - `/` → `HomePage`
  - `/artur` → `ArturPage` (пока заглушка «Артур: мигрируется»)
  - `/aza` → `AzaPage` (заглушка)
  - `/el` → `ElPage` (заглушка)
  - `/ziraela` → `ZiraelaPage` (заглушка)
  - `/barandur` → `BarandurPage` (заглушка)
  - `/malbrin` → `MalbrinPage` (заглушка)
  - `/:pathMatch(.*)*` → редирект на `/`
- [ ] `web/src/types/character.ts`:
  ```ts
  export type Status = 'active' | 'wip'
  export interface Character {
    id: string
    name: string
    slug: string
    title: string
    role: string
    status: Status
    themeKey: 'artur' | 'aza' | 'el' | 'ziraela' | 'barandur' | 'malbrin'
  }
  ```
- [ ] `web/src/data/characters.ts`: реестр всех шести персонажей.
- [ ] Промежуточный коммит: `web: базовая инфраструктура (router, types, characters)`.

### Фаза 3 — Дизайн-система

- [ ] `web/src/themes/artur.ts`, `aza.ts`, `el.ts`, `ziraela.ts`, `barandur.ts`, `malbrin.ts` —
  каждый возвращает:
  ```ts
  {
    palette: Record<string, string>
    fontFamily: string
    background: 'parchment' | 'gothic' | 'book' | 'forest' | 'minimal'
    ornamentTop: string
    ornamentBottom: string
    dropCapColor: string
  }
  ```
- [ ] `web/src/composables/useTheme.ts`:
  - принимает `slug`,
  - возвращает тему + ставит CSS-переменные на `<html>` (`document.documentElement.style.setProperty`).
- [ ] `web/src/assets/styles/tailwind.css`:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`
- [ ] `web/src/assets/styles/diary-effects.css`:
  - `.diary-page-rotate { transform: rotate(var(--rot, 0deg)); }`
  - `.text-indent-paragraph { text-indent: 1.5em; text-align: justify; }`
  - `.drop-cap::first-letter { font-size: 3.2em; float: left; line-height: 0.9; color: var(--drop-cap); padding: 0 0.15em 0 0; }`
  - `.diary-image { position: relative; z-index: 1; max-width: 100%; }`
  - `.diary-image.left { float: left; margin: 0 1em 1em 0; transform: rotate(var(--rot, -0.8deg)); }`
  - `.diary-image.right { float: right; margin: 0 0 1em 1em; transform: rotate(var(--rot, 0.8deg)); }`
  - `.image-caption { font-style: italic; font-size: 0.9em; opacity: 0.8; text-align: center; margin: 0.5em 0 1.5em; clear: both; }`
  - `.typo { text-decoration: line-through; opacity: 0.6; }`
  - `.strikethrough { text-decoration: line-through; opacity: 0.5; font-style: italic; }`
- [ ] Tailwind `@layer components` для обёрток страниц (`diary-page-artur`, `-aza`, `-el`, `-ziraela`).
- [ ] Промежуточный коммит: `web: дизайн-система и эффекты`.

### Фаза 4 — Переиспользуемые компоненты

- [ ] `DiaryLayout.vue`: проп `themeKey`, рендерит нужный background-компонент, ставит CSS-переменные. Слот для содержимого.
- [ ] `DiaryChapter.vue`: проп `ornamentTop`/`ornamentBottom`, рендерит `<h2>` + `::before`/`::after` через CSS-класс.
- [ ] `DiaryParagraph.vue`: проп `dropCap: boolean`, рендерит `<p class="text-indent-paragraph" :class="{ 'drop-cap': dropCap }">`.
- [ ] `DiaryImage.vue`: пропы `src`, `alt`, `position: 'left'|'right'`, `caption?`.
- [ ] `ImageCaption.vue`: текст подписи под изображением.
- [ ] `DiaryFooter.vue`: подвал дневника («Запись обрывается...»).
- [ ] Backgrounds (`ParchmentBackground.vue`, `GothicBackground.vue`, `BookBackground.vue`, `ForestBackground.vue`, `MinimalBackground.vue`): корневой `<div class="absolute inset-0 -z-10">` с фоновыми слоями через CSS.
- [ ] Промежуточный коммит: `web: переиспользуемые компоненты дневника`.

### Фаза 5 — Миграция контента (поочерёдно)

Каждый персонаж = отдельный коммит `{slug}: перенос в Vue-страницу и theme`.

#### 5.1 Артур (`ArturPage.vue`)

- [ ] Перенести все `<article class="entry">` в `<template>`.
- [ ] Сохранить `page-break-before: always; page-break-inside: avoid;` через CSS.
- [ ] Ширина страницы `14.8cm` сохранить как max-width обёртки.
- [ ] Иллюстрации 14 шт. → `/images/artur/01_деревня.jpeg … 14_две_могилы.jpeg`.
- [ ] Обновить статус в `characters.ts` (после успешной миграции).

#### 5.2 Аза (`AzaPage.vue`)

- [ ] Один `<article class="entry">` с `rotate(-0.15deg)`.
- [ ] `<h2>` с орнаментом `♥ ♥ ♥` сверху (через `::before` для не-первых) и `♥ ♥ ♥` снизу (`::after`).
- [ ] Drop-cap бордового цвета `#8b1e2b`.
- [ ] 16 фото с паттерном **L L R R × 4** + обязательно `position: relative; z-index: 1`.
- [ ] Тёмная готика: фон `#0e0a0a`, бумага `#efe4d0`/`#d9c9a8`, акцент `#8b1e2b`, золото `#b89968`.
- [ ] Звёздная пыль в `body::before` (или `<GothicBackground>`).

#### 5.3 Эл (`ElPage.vue`)

- [ ] `.book-container` с двойным `box-shadow`.
- [ ] `repeating-linear-gradient` для текстуры бумаги.
- [ ] Два `linear-gradient` в `::after` для пожелтения краёв.
- [ ] `max-width: 1200px` (книжный разворот).
- [ ] Шрифт `'Comforter'` из `ofont_ru_Comforter.ttf`.

#### 5.4 Зираэлла (`ZiraelaPage.vue`)

- [ ] Один `<article class="entry">` с `rotate(-0.25deg)`.
- [ ] `<h2>` в цвете лесного мха `#3a5e3a`, орнамент `❦ ✦ ❦` снизу.
- [ ] Лесной дизайн: фон `#050a08 → #112420`, пергамент `#f3ead0 / #e3d4ad`.
- [ ] Звёздное небо / лунный свет в `body::before` (радиальные градиенты с золотыми, серебряными, фиолетовыми бликами).
- [ ] Лунная дымка в `body::after` (правый верхний угол).
- [ ] Drop-cap цвета лесного мха.
- [ ] 4 фото L L R R, золотая рамка `border: 1px solid rgba(184, 152, 85, 0.5)`.

#### 5.5 Заглушки (`BarandurPage.vue`, `MalbrinPage.vue`)

- [ ] Один `<DiaryLayout>` с `MinimalBackground`.
- [ ] Текст «Эти страницы ещё не написаны...».
- [ ] Ссылка `← Вернуться к меню` через `<router-link to="/">`.

#### 5.6 Главная (`HomePage.vue`)

- [ ] Список `.diary-link` из `characters.ts` (v-for).
- [ ] Индикатор статуса `.status.active` (● зелёный) vs обычный (○ серый).
- [ ] Цитата в подвале: «Запись обрывается. Продолжение следует, если я останусь жив.»

### Фаза 6 — Сверка визуала

- [ ] `npm run dev` внутри `web/`.
- [ ] Открыть `/`, `/artur`, `/aza`, `/el`, `/ziraela`, `/barandur`, `/malbrin`.
- [ ] Сравнить бок-о-бок со старыми версиями (в корне `Artur/index.html` и т.д.).
- [ ] Тюнинг: `rotate(--rot)`, размер drop-cap, интенсивность фонов, отступы для float-картинок.
- [ ] Проверить корректность `lang="ru"` в `web/index.html`.

### Фаза 7 — Деплой (только когда все 6 готовы)

- [ ] `web/vite.config.ts`: проверить `base: '/dnd-chrono-game/'`.
- [ ] Создать `404.html` (копия `index.html` после сборки) для history fallback.
- [ ] `.github/workflows/deploy.yml`:
  - `actions/checkout@v4`
  - `actions/setup-node@v4` (Node 20+)
  - `working-directory: web`, `run: npm ci && npm run build`
  - `peaceiris/actions-gh-pages@v4` (или `actions/deploy-pages@v4` с артефактом)
  - `publish_dir: ./web/dist` или артефакт
- [ ] Промежуточный коммит: `ci: GitHub Actions деплой на gh-pages`.

### Фаза 8 — Финализация

- [ ] `web/dist/` собирается без ошибок и предупреждений (`npm run build`).
- [ ] Удалить из корня репо:
  - `index.html`
  - `index.html.bak`
  - `Artur/`, `Aza/`, `El/`, `Ziraela/`, `Barandur/`, `Malbrin/`
- [ ] Переместить `web/*` в корень (`mv web/* ./` или новая структура — обсуждаемо).
- [ ] `.gitignore` корня: убрать `web/node_modules/` и `web/dist/` (они стали единственными).
- [ ] Один сводный коммит: `chore: переход на Vue 3 + Vite + TS + Tailwind, очистка старой статики`.
- [ ] Push → Actions деплоит → проверка на `https://siberianfoboz.github.io/dnd-chrono-game/`.

---

## 5. Цветовые палитры (источник истины для `tailwind.config.ts` и тем)

```ts
theme: { extend: {
  colors: {
    artur: {
      paper: '#f5f0e8',
      ink:   '#2c2c2c',
    },
    aza: {
      bg:     '#0e0a0a',
      paper:  '#efe4d0',
      paper2: '#d9c9a8',
      accent: '#8b1e2b',
      gold:   '#b89968',
    },
    el: {
      bg:    '#2a1f14',
      paper: '#f4e8d0',
    },
    ziraela: {
      bgDeep: '#050a08',
      bgMid:  '#112420',
      paper:  '#f3ead0',
      paper2: '#e3d4ad',
      moss:   '#3a5e3a',
      gold:   '#b89968',
      silver: '#c2c7d4',
      violet: '#8a5cb6',
    },
    placeholder: {
      paper: '#f5f0e8',
      ink:   '#4a4a4a',
    },
  }
}}
```

---

## 6. Шрифты (источник истины для `web/public/fonts/`)

| Файл | Семейство в CSS | Кто использует |
|---|---|---|
| `InkFree.ttf` (или уже используемое имя) | `"Ink Free", "Segoe Print", cursive` | Артур, Барандур, Малбрин, главное меню |
| `GreatVibes-Regular.ttf` | `"Corinthia"` (семейство в CSS переименовано) | Аза |
| `ofont_ru_Corinthia.ttf` | резервный, не подключается | — |
| `ofont_ru_Comforter.ttf` | `'Comforter'` | Эл |
| `Ira-Dvilyuk-Agretta-Hills-Cyrillic-Script.otf` | `"Agretta"` | Зираэлла |

CSS-переменные в `useTheme.ts`:

```ts
:root {
  --font-display: "Ink Free", "Segoe Print", cursive;
  --font-aza:     "Corinthia", serif;
  --font-el:      "Comforter", cursive;
  --font-ziraela: "Agretta", cursive;
}
```

---

## 7. Маппинг «старое → новое»

| Сейчас в корне | Станет |
|---|---|
| `index.html` (главное меню) | `src/pages/HomePage.vue` |
| `Artur/index.html` | `src/pages/ArturPage.vue` |
| `Aza/index.html` | `src/pages/AzaPage.vue` |
| `El/index.html` | `src/pages/ElPage.vue` |
| `Ziraela/index.html` | `src/pages/ZiraelaPage.vue` |
| `Barandur/index.html` | `src/pages/BarandurPage.vue` |
| `Malbrin/index.html` | `src/pages/MalbrinPage.vue` |
| `Artur/01_деревня.jpeg` | `public/images/artur/01_деревня.jpeg` |
| `Aza/01_wood.jpg` и т.д. (есть в `Aza/files/`) | `public/images/aza/01_wood.jpg` |
| `El/image1.jpg` … | `public/images/el/image1.jpg` |
| `Ziraela/files/*.png|*.jpeg` | `public/images/ziraela/*.png|*.jpeg` |
| `Aza/GreatVibes-Regular.ttf` | `public/fonts/GreatVibes-Regular.ttf` |
| `El/ofont_ru_Comforter.ttf` | `public/fonts/ofont_ru_Comforter.ttf` |
| `Ziraela/Ira-Dvilyuk-...otf` | `public/fonts/Ira-Dvilyuk-...otf` |
| inline `<style>` в каждом HTML | `src/themes/<key>.ts` + `src/assets/styles/diary-effects.css` + Tailwind config |

---

## 8. Что остаётся неизменным

- Шрифты — те же файлы, те же имена.
- Изображения — те же имена файлов (русский язык, подчёркивания).
- Тексты дневников — побайтово.
- `lang="ru"` во всех страницах.
- Git-flow: ветка `master`, сообщения на русском, формат `{Объект}: {действие}`.
- Хостинг: **GitHub Pages**, репозиторий `SiberianFoboZ/dnd-chrono-game`.

---

## 9. Критерий завершения миграции

Миграция считается завершённой, когда:

1. `web/dist/` собирается без ошибок и предупреждений (`npm run build` exit 0).
2. Локально (`npm run dev`) все 6 маршрутов отображаются идентично прежним статическим страницам (визуальная сверка по чек-листу).
3. Удалена вся старая статика из корня репо.
4. `.github/workflows/deploy.yml` публикует `dist/` на `https://siberianfoboz.github.io/dnd-chrono-game/`.
5. На проде нет 404 ни на одной странице (refresh на `/artur` корректно работает через `404.html` fallback).
6. `QWEN.md` обновлён: отражены новая структура, команды, удалены устаревшие секции.
7. `README.md` создан с инструкцией для разработчика.

---

## 10. Правила PR / коммитов во время миграции

| Что | Формат сообщения |
|---|---|
| Инициализация Vite-скета | `web: инициализация Vite + Vue + TS + Tailwind` |
| Базовая инфраструктура | `web: базовая инфраструктура (router, types, characters)` |
| Дизайн-система | `web: дизайн-система и эффекты` |
| Компоненты | `web: переиспользуемые компоненты дневника` |
| Миграция Артура | `artur: перенос в Vue-страницу и theme` |
| Миграция Азы | `aza: перенос в Vue-страницу и theme` |
| (и т.д.) | `{slug}: перенос в Vue-страницу и theme` |
| Деплой Actions | `ci: GitHub Actions деплой на gh-pages` |
| Финализация | `chore: переход на Vue 3 + Vite + TS + Tailwind, очистка старой статики` |

Каждый коммит — атомарный и откатываемый.

---

## 11. Сводка для исполнителя

- Перед стартом любой фазы — `npm run dev` в `web/` для визуальной сверки.
- Не коммитить изменения в корне репо (`index.html`, `Artur/`, ...) до Фазы 8.
- На любой стадии можно откатиться, удалив `web/` из `master` — старая статика работоспособна.
- Шрифты и изображения сначала копируются в `web/public/`, исходники в корне не трогаем до Фазы 8.

---

*Конец плана v1.*
