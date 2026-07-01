<script setup lang="ts">
import { computed } from 'vue'
import type { ThemeKey } from '@/types/character'
import { useTheme } from '@/composables/useTheme'
import { getTheme } from '@/themes'
import ParchmentBackground from './backgrounds/ParchmentBackground.vue'
import GothicBackground from './backgrounds/GothicBackground.vue'
import BookBackground from './backgrounds/BookBackground.vue'
import ForestBackground from './backgrounds/ForestBackground.vue'
import MinimalBackground from './backgrounds/MinimalBackground.vue'

const props = defineProps<{ themeKey: ThemeKey }>()

useTheme(() => props.themeKey)

const theme = computed(() => getTheme(props.themeKey))

const pageClass = computed(() => {
  const k = props.themeKey
  return k === 'barandur' || k === 'malbrin'
    ? 'diary-page-minimal'
    : `diary-page-${k}`
})
</script>

<template>
  <div class="diary-layout" :style="{ fontFamily: theme.fontFamily }">
    <ParchmentBackground v-if="theme.background === 'parchment'" />
    <GothicBackground v-else-if="theme.background === 'gothic'" />
    <BookBackground v-else-if="theme.background === 'book'" />
    <ForestBackground v-else-if="theme.background === 'forest'" />
    <MinimalBackground v-else />

    <main class="diary-layout__main" :class="pageClass">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.diary-layout {
  position: relative;
  min-height: 100vh;
  isolation: isolate;
}

.diary-layout__main {
  position: relative;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  max-width: 794px; /* A4 safety net — на случай если Tailwind класс diary-page-* не подхватится */
  width: 100%;
}
</style>