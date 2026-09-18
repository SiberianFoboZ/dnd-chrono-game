<script setup lang="ts">
import DiaryLayout from "@/components/DiaryLayout.vue";
import { RouterLink } from "vue-router";

import ArturChapter1 from "./main/artur/ArturChapter1.vue";
import ArturChapter2 from "./main/artur/ArturChapter2.vue";
import ArturChapter3 from "./main/artur/ArturChapter3.vue";
import ArturChapter4 from "./main/artur/ArturChapter4.vue";
import ArturChapter5 from "./main/artur/ArturChapter5.vue";
import ArturChapter6 from "./main/artur/ArturChapter6.vue";
import ArturChapter7 from "./main/artur/ArturChapter7.vue";
import ArturChapter8 from "./main/artur/ArturChapter8.vue";
import ArturChapter9 from "./main/artur/ArturChapter9.vue";
import ArturChapter10 from "./main/artur/ArturChapter10.vue";
import ArturChapter11 from "./main/artur/ArturChapter11.vue";
import ArturChapter12 from "./main/artur/ArturChapter12.vue";
import ArturChapter13 from "./main/artur/ArturChapter13.vue";
import ArturChapter14 from "./main/artur/ArturChapter14.vue";
import ArturChapter15 from "./main/artur/ArturChapter15.vue";
import ArturChapter16 from "./main/artur/ArturChapter16.vue";
import ArturChapter17 from "./main/artur/ArturChapter17.vue";
import ArturChapter18 from "./main/artur/ArturChapter18.vue";
import ArturChapter19 from "./main/artur/ArturChapter19.vue";
import ArturChapter20 from "./main/artur/ArturChapter20.vue";
import ArturChapter21 from "./main/artur/ArturChapter21.vue";
import ArturChapter22 from "./main/artur/ArturChapter22.vue";
import ArturChapter23 from "./main/artur/ArturChapter23.vue";
import ArturChapter24 from "./main/artur/ArturChapter24.vue";
import ArturChapter25 from "./main/artur/ArturChapter25.vue";
import ArturChapter26 from "./main/artur/ArturChapter26.vue";
import ArturChapter27 from "./main/artur/ArturChapter27.vue";
import ArturChapter28 from "./main/artur/ArturChapter28.vue";
import ArturChapter29 from "./main/artur/ArturChapter29.vue";
import ArturChapter30 from "./main/artur/ArturChapter30.vue";
</script>

<template>
  <DiaryLayout theme-key="artur">
    <article class="artur-diary">
      <ArturChapter1 />
      <ArturChapter2 />
      <ArturChapter3 />
      <ArturChapter4 />
      <ArturChapter5 />
      <ArturChapter6 />
      <ArturChapter7 />
      <ArturChapter8 />
      <ArturChapter9 />
      <ArturChapter10 />
      <ArturChapter11 />
      <ArturChapter12 />
      <ArturChapter13 />
      <ArturChapter14 />
      <ArturChapter15 />
      <ArturChapter16 />
      <ArturChapter17 />
      <ArturChapter18 />
      <ArturChapter19 />
      <ArturChapter20 />
      <ArturChapter21 />
      <ArturChapter22 />
      <ArturChapter23 />
      <ArturChapter24 />
      <ArturChapter25 />
      <ArturChapter26 />
      <ArturChapter27 />
      <ArturChapter28 />
      <ArturChapter29 />
      <ArturChapter30 />
    </article>

    <RouterLink to="/" class="back">← Вернуться к меню</RouterLink>
  </DiaryLayout>
</template>

<style scoped>
/* === Artur: главы лежат в дочерних компонентах, поэтому стили пробивают
   через :deep(). Все правила для .page/.entry/.image-caption/.sidebar-note/
   .margin-note/.shout/.prophecy-box/.gem-box/p — это контент-уровень,
   а .back — это прямая ссылка в шаблоне main-страницы. === */

:deep(.page) {
  margin-bottom: 2em;
  page-break-before: always;
  page-break-inside: avoid;
}

:deep(.page:first-of-type) {
  page-break-before: avoid;
}

:deep(.entry) {
  margin-bottom: 0.3em;
}

:deep(.entry-date) {
  font-size: 10pt;
  color: #8a7a6a;
  margin-bottom: 0.3em;
  border-bottom: 1px dashed #d8c8b0;
  padding-bottom: 0.3em;
}

:deep(.entry-title) {
  font-size: 13pt;
  color: #5a4a3a;
  margin-bottom: 0.8em;
  font-weight: normal;
}

:deep(.image-caption) {
  color: #8a7a6a;
  font-size: 0.75em;
  margin-top: 0.3em;
  margin-bottom: 1em;
  opacity: 1;
}

/* Artur-specific: тихая чернила для заметок на полях */
:deep(.margin-note) {
  margin: 0.4em 0 0.4em 1.5em;
  padding: 0;
  font-size: 0.88em;
  color: #6a5a4a;
  font-style: italic;
  background: none;
  border: none;
  transform: none;
}
:deep(.margin-note::before) {
  content: none;
}

:deep(.sidebar-note) {
  float: right;
  clear: right;
  width: 32%;
  margin: 0.4em 0 0.4em 0.8em;
  padding: 0;
  font-size: 0.85em;
  color: #6a5a4a;
  font-style: italic;
  background: none;
  border: none;
  transform: none;
  shape-margin: 0.3em;
}

/* Перебиваем scoped .sidebar-note для голоса Азы
   (специфичность .sidebar-note.aza-voice > .sidebar-note) */
:deep(.sidebar-note.aza-voice) {
  color: #991007;
  font-family: "Corinthia", "Great Vibes", cursive;
}

:deep(p) {
  margin-bottom: 0.6em;
  text-indent: 0.6em;
}

:deep(.shout) {
  text-align: center;
}

:deep(.prophecy-box p),
:deep(.gem-box p) {
  text-indent: 0;
}

/* === Адаптация мобильных/планшетов === */
@media (max-width: 600px) {
  :deep(.margin-note) {
    margin: 0.4em 0;
  }
  :deep(.sidebar-note) {
    float: none;
    width: auto;
    margin: 0.5em 0;
  }
  :deep(.diary-image.left),
  :deep(.diary-image.right) {
    float: none;
    max-width: 90% !important;
    margin: 1em auto !important;
    display: block;
  }
}

/* === Ссылка «назад» — прямая в шаблоне main-страницы, без :deep() === */
.back {
  display: block;
  text-align: center;
  margin: 2rem auto;
  color: var(--color-accent, #5a4a2c);
  text-decoration: none;
  font-weight: 500;
}
.back:hover {
  text-decoration: underline;
}

/* === Печать A5 === */
@media print {
  :deep(.page) {
    page-break-before: always;
  }
  :deep(.page:first-of-type) {
    page-break-before: avoid;
  }
  :deep(.diary-image),
  :deep(.image-caption) {
    page-break-inside: avoid;
  }
}
</style>