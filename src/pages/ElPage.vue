<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DiaryLayout from '@/components/DiaryLayout.vue'
</script>

<template>
  <DiaryLayout theme-key="el">
    <main class="placeholder">
      <p class="title">Эл</p>
      <p class="message">Дневник мигрируется на новую платформу…</p>
      <p class="theme-note">
        Тема: старая книга · шрифт Comforter · тёмная обложка с пожелтевшими
        краями.
      </p>
      <RouterLink to="/" class="back">← Вернуться к меню</RouterLink>
    </main>
  </DiaryLayout>
</template>

<style scoped>
.placeholder {
  max-width: 720px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
}

.title {
  font-size: 2.4rem;
  margin: 0 0 1rem;
  color: var(--color-ink, #2c2c2c);
}

.message {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.theme-note {
  font-size: 0.95rem;
  opacity: 0.7;
  margin-bottom: 3rem;
}

.back {
  display: inline-block;
  color: var(--color-accent, #8b1e2b);
  text-decoration: none;
  font-weight: 500;
}

.back:hover {
  text-decoration: underline;
}
</style>