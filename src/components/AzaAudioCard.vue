<script setup lang="ts">
import { ref } from "vue";

// Vite base = '/dnd-chrono-game/' (production и dev), иначе 404 на /audio/*
// С BASE_URL мы корректно собираем абсолютный путь под текущий base path.
const sonataUrl = `${import.meta.env.BASE_URL}audio/sonata.mp3`;
const sonata = ref<HTMLAudioElement | null>(null);
const sonataPlaying = ref(false);

function toggleSonata() {
  const a = sonata.value;
  if (!a) return;
  if (a.paused) {
    void a.play();
  } else {
    a.pause();
  }
}
</script>

<template>
  <div
    class="audio-card"
    :class="{ playing: sonataPlaying }"
    role="button"
    tabindex="0"
    aria-label="Воспроизвести мелодию: Моя песня — SoNata"
    @click="toggleSonata"
    @keydown.enter.prevent="toggleSonata"
    @keydown.space.prevent="toggleSonata"
  >
    <img
      class="diary-image"
      src="/images/aza/27.jpg"
      alt="Концерт на площади"
    />
    <span class="audio-card__badge" aria-hidden="true">
      {{ sonataPlaying ? "❚❚" : "▶" }}
    </span>
    <audio
      ref="sonata"
      :src="sonataUrl"
      preload="none"
      @play="sonataPlaying = true"
      @pause="sonataPlaying = false"
      @ended="sonataPlaying = false"
    ></audio>
  </div>
</template>

<style scoped>
/* Интерактивный аудио-портрет (image 27 — sonata.mp3).
   Стилизовано как карточка-обложка: при клике играет соната,
   бейдж в углу переключается между ▶ и ❚❚, при playing — пульсация. */
.audio-card {
  position: relative;
  float: right;
  margin: 0 0 1em 1em;
  transform: rotate(var(--rot, 0.8deg));
  cursor: pointer;
  z-index: 1;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s ease;
}
.audio-card:hover,
.audio-card:focus-visible {
  transform: rotate(var(--rot, 0.8deg)) scale(1.025);
}
.audio-card:focus-visible {
  box-shadow: 0 0 0 2px var(--color-gold);
  border-radius: 2px;
}
/* Перебивает глобальные .diary-image (из diary-effects.css и AzaMainPage)
   для картинки внутри аудио-карточки: без margin/box-shadow paper-стиля. */
.audio-card .diary-image {
  display: block;
  position: relative;
  z-index: 1;
  max-width: 100%;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.audio-card__badge {
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  z-index: 2;
  width: 2.4em;
  height: 2.4em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 10, 10, 0.78);
  color: var(--color-gold, #b89968);
  border: 1px solid rgba(184, 153, 104, 0.55);
  border-radius: 50%;
  font-size: 1em;
  line-height: 1;
  text-shadow: 0 0 8px rgba(184, 153, 104, 0.55);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  transition:
    background 0.2s,
    transform 0.2s;
}
.audio-card:hover .audio-card__badge {
  transform: scale(1.08);
}
.audio-card.playing {
  animation: audio-card-pulse 1.6s ease-in-out infinite;
}
.audio-card.playing .diary-image {
  box-shadow:
    0 0 0 2px rgba(184, 153, 104, 0.55),
    0 2px 14px rgba(184, 153, 104, 0.25),
    0 2px 8px rgba(0, 0, 0, 0.15);
}
.audio-card.playing .audio-card__badge {
  background: rgba(139, 30, 43, 0.9);
  color: #fff;
  border-color: rgba(184, 153, 104, 0.7);
  box-shadow: 0 0 12px rgba(184, 153, 104, 0.6);
}
@keyframes audio-card-pulse {
  0%,
  100% {
    box-shadow:
      0 0 0 0 rgba(184, 153, 104, 0.5),
      0 4px 12px rgba(0, 0, 0, 0.25);
  }
  50% {
    box-shadow:
      0 0 0 10px rgba(184, 153, 104, 0),
      0 4px 12px rgba(0, 0, 0, 0.25);
  }
}
@media (max-width: 600px) {
  .audio-card {
    float: none !important;
    margin: 1em auto !important;
    transform: none !important;
  }
  .audio-card:hover,
  .audio-card:focus-visible {
    transform: scale(1.02);
  }
}
</style>