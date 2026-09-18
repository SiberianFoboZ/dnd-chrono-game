<script setup lang="ts">
import DiaryLayout from "@/components/DiaryLayout.vue";
import { RouterLink } from "vue-router";

import AzaChapter1 from "./main/aza/AzaChapter1.vue";
import AzaChapter2 from "./main/aza/AzaChapter2.vue";
import AzaChapter3 from "./main/aza/AzaChapter3.vue";
import AzaChapter4 from "./main/aza/AzaChapter4.vue";
import AzaChapter5 from "./main/aza/AzaChapter5.vue";
import AzaChapter6 from "./main/aza/AzaChapter6.vue";
import AzaChapter7 from "./main/aza/AzaChapter7.vue";
import AzaChapter8 from "./main/aza/AzaChapter8.vue";
import AzaChapter9 from "./main/aza/AzaChapter9.vue";
import AzaChapter10 from "./main/aza/AzaChapter10.vue";
import AzaChapter11 from "./main/aza/AzaChapter11.vue";
import AzaChapter12 from "./main/aza/AzaChapter12.vue";
import AzaChapter13 from "./main/aza/AzaChapter13.vue";
import AzaChapter14 from "./main/aza/AzaChapter14.vue";
import AzaChapter15 from "./main/aza/AzaChapter15.vue";
import AzaChapter16 from "./main/aza/AzaChapter16.vue";
import AzaChapter17 from "./main/aza/AzaChapter17.vue";
import AzaChapter18 from "./main/aza/AzaChapter18.vue";
import AzaChapter19 from "./main/aza/AzaChapter19.vue";
import AzaChapter20 from "./main/aza/AzaChapter20.vue";
import AzaChapter21 from "./main/aza/AzaChapter21.vue";

// Аудио-карточка с sonata.mp3 живёт в AzaChapter20.vue (внутри главы «Валлаки»),
// а её логика и стили — в отдельном компоненте src/components/AzaAudioCard.vue.
</script>

<template>
  <DiaryLayout theme-key="aza">
    <!-- SVG-фильтр для рваного края бумаги -->
    <svg style="position: absolute; width: 0; height: 0">
      <defs>
        <filter id="torn-edge">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="5"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>

    <!-- Заголовок дневника -->
    <header>
      <h1>Дневник Азалии Корвары</h1>
      <div class="subtitle">— той, что известна как Пепельная Роза —</div>
      <div class="epigraph">
        «Я не могу допустить, чтобы моё имя кануло в безвестность после этой
        авантюры. О, разумеется, я достойна войти в анналы истории, но если
        судьба окажется ко мне несправедлива — пусть хотя бы эти строки сохранят
        память о моей персоне.»
      </div>
    </header>

    <div class="divider">✦ ❦ ✦</div>

    <article class="entry">
      <AzaChapter1 />
      <AzaChapter2 />
      <AzaChapter3 />
      <AzaChapter4 />
      <AzaChapter5 />
      <AzaChapter6 />
      <AzaChapter7 />
      <AzaChapter8 />
      <AzaChapter9 />
      <AzaChapter10 />
      <AzaChapter11 />
      <AzaChapter12 />
      <AzaChapter13 />
      <AzaChapter14 />
      <AzaChapter15 />
      <AzaChapter16 />
      <AzaChapter17 />
      <AzaChapter18 />
      <AzaChapter19 />
      <AzaChapter20 />
      <AzaChapter21 />
    </article>

    <footer>
      «Моя звезда — ярко, ослепительно, неукротимо.<br />
      И я намерена гореть так, чтобы этот свет увидели все — и запомнили
      навсегда.»
      <br /><br />
      <RouterLink to="/" class="back">← Вернуться к меню</RouterLink>
    </footer>
  </DiaryLayout>
</template>

<style scoped>
/* === Заголовок (прямой в шаблоне main-страницы) === */
header {
  text-align: center;
  padding: 60px 20px 40px;
  color: var(--color-gold);
  position: relative;
}
header::before,
header::after {
  content: "✦";
  display: block;
  font-size: 28px;
  color: var(--color-accent);
  margin: 10px 0;
  letter-spacing: 20px;
}
header h1 {
  font-family: "Corinthia", cursive;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: linear-gradient(
    180deg,
    #e6c98a 0%,
    var(--color-gold) 50%,
    #8b6f3f 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(184, 153, 104, 0.3);
}
header .subtitle {
  font-family: "Corinthia", cursive;
  font-size: clamp(22px, 3vw, 30px);
  color: #c9a876;
  margin-top: 12px;
  font-style: italic;
}
header .epigraph {
  margin-top: 30px;
  font-style: italic;
  font-size: 18px;
  color: #a89078;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* === Разделитель (прямой) === */
.divider {
  text-align: center;
  color: var(--color-gold);
  font-size: 22px;
  letter-spacing: 15px;
  margin: 20px 0;
  opacity: 0.6;
}

/* === Лист бумаги (прямой <article class="entry"> в шаблоне) === */
.entry {
  padding: 45px 55px;
  margin: 40px 0;
  position: relative;
  font-size: 19px;
  line-height: 1.75;
  color: #2b1a12;
  z-index: 1;
}

/* Фон бумаги с рваными краями */
.entry::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(139, 30, 43, 0.08) 0%,
      transparent 8%
    ),
    radial-gradient(
      circle at 85% 75%,
      rgba(90, 60, 30, 0.1) 0%,
      transparent 12%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(139, 110, 70, 0.05) 0%,
      transparent 40%
    ),
    linear-gradient(135deg, var(--color-paper) 0%, var(--color-paper2) 100%);
  filter: url(#torn-edge);
  z-index: -2;
  margin: -4px;
}

/* Тень и объём */
.entry::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 15px 40px rgba(0, 0, 0, 0.6),
    inset 0 0 80px rgba(139, 30, 43, 0.08);
  filter: url(#torn-edge);
  z-index: -1;
  margin: -4px;
  pointer-events: none;
}

/* === Заголовки глав (h2 живут в дочерних компонентах, через :deep) === */
:deep(.entry h2:not(:first-of-type)) {
  margin-top: 55px;
  padding-top: 0;
}
:deep(.entry h2:not(:first-of-type))::before {
  content: "♥ ♥ ♥";
  display: block;
  color: var(--color-gold);
  font-size: 18px;
  letter-spacing: 14px;
  opacity: 0.7;
  margin-bottom: 14px;
  text-align: center;
}
:deep(.entry h2) {
  font-family: "Corinthia", cursive;
  font-size: 24px;
  color: var(--color-accent);
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
}
:deep(.entry h2)::after {
  content: "♥ ♥ ♥";
  display: block;
  color: var(--color-gold);
  font-size: 14px;
  letter-spacing: 8px;
  margin-top: 12px;
  text-align: center;
}

/* === Параграфы и drop-cap (в дочерних главах) === */
:deep(.entry p) {
  text-align: justify;
  text-indent: 1.5em;
  margin-bottom: 14px;
  font-family: "Corinthia", cursive;
}
/* drop-cap — только у первого <p> первой главы (как в исходнике) */
:deep(.entry p:first-of-type::first-letter) {
  font-family: "Corinthia", cursive;
  font-size: 58px;
  float: left;
  line-height: 0.9;
  padding: 6px 8px 0 0;
  color: var(--color-accent);
  font-weight: 700;
}

/* === P.S. (в дочерних главах) === */
:deep(.entry .ps) {
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px dashed #6b5d54;
  font-style: italic;
  color: #6b5d54;
  font-size: 17px;
}

/* === Иллюстрации (img теги в дочерних главах) === */
:deep(.diary-image) {
  margin: 0.5em 0;
  max-width: 45%;
  background: var(--color-paper);
  border: 1px solid rgba(139, 30, 43, 0.35);
  padding: 4px;
  border-radius: 2px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 6px 16px rgba(0, 0, 0, 0.4),
    inset 0 0 20px rgba(139, 30, 43, 0.08);
  transform: rotate(var(--rot, 0deg));
  display: block;
  position: relative;
  z-index: 1;
}
:deep(.diary-image.left) {
  float: left;
  margin: 0.4em 1.2em 0.6em 0;
  --rot: -0.8deg;
}
:deep(.diary-image.right) {
  float: right;
  margin: 0.4em 0 0.6em 1.2em;
  --rot: 0.8deg;
}

/* === Подвал дневника (прямой в main) === */
footer {
  text-align: center;
  color: #6b5d54;
  padding: 40px 20px;
  font-style: italic;
  font-size: 16px;
  letter-spacing: 2px;
}
footer::before {
  content: "✦ ✦ ✦";
  display: block;
  color: var(--color-accent);
  margin-bottom: 20px;
  letter-spacing: 15px;
}

/* === Ссылка назад (прямая в main) === */
.back {
  display: inline-block;
  color: var(--color-gold);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
}
.back:hover {
  text-decoration: underline;
}

/* === Адаптив === */
@media (max-width: 600px) {
  header {
    padding: 30px 16px 20px;
  }
  header::before,
  header::after {
    margin: 6px 0;
    letter-spacing: 14px;
  }
  header .epigraph {
    font-size: 16px;
    margin-top: 20px;
  }
  .divider {
    margin: 16px 0;
    letter-spacing: 10px;
  }
  /* .entry — прямая (статья в main) */
  .entry {
    padding: 25px 20px;
    margin: 20px 0;
    font-size: 16px;
    line-height: 1.7;
  }
  :deep(.entry h2) {
    font-size: 20px;
    letter-spacing: 2px;
    margin-bottom: 18px;
  }
  :deep(.entry h2:not(:first-of-type)) {
    margin-top: 35px;
  }
  :deep(.entry h2:not(:first-of-type))::before {
    font-size: 14px;
    letter-spacing: 10px;
    margin-bottom: 10px;
  }
  :deep(.entry h2)::after {
    font-size: 12px;
    letter-spacing: 6px;
    margin-top: 8px;
  }
  :deep(.entry p) {
    text-indent: 1.2em;
    margin-bottom: 12px;
  }
  :deep(.entry p:first-of-type::first-letter) {
    font-size: 40px;
    padding: 4px 6px 0 0;
  }
  :deep(.entry .ps) {
    font-size: 15px;
    margin-top: 18px;
    padding-top: 12px;
  }
  :deep(.diary-image) {
    max-width: 100%;
    float: none;
    margin: 1em auto;
  }
  footer {
    padding: 25px 16px;
    font-size: 15px;
  }
  footer::before {
    letter-spacing: 10px;
  }
}

@media (max-width: 380px) {
  header h1 {
    font-size: 28px;
  }
  header .subtitle {
    font-size: 18px;
  }
  /* .entry — прямая */
  .entry {
    padding: 18px 14px;
    font-size: 15px;
  }
  :deep(.entry h2) {
    font-size: 18px;
  }
  :deep(.entry p:first-of-type::first-letter) {
    font-size: 34px;
  }
}

/* === Аудио-карточка перенесена в AzaChapter20 + src/components/AzaAudioCard.vue ===
   Все .audio-card* правила теперь живут в компоненте AzaAudioCard.vue
   (там же, где логика sonata и шаблон карточки). === */
</style>