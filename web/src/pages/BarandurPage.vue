<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DiaryLayout from '@/components/DiaryLayout.vue'
</script>

<template>
  <DiaryLayout theme-key="barandur">
    <main class="placeholder">
      <p class="title">Барандур</p>
      <p class="message">Эти страницы ещё не написаны...</p>
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
  font-size: 2.2rem;
  margin: 0 0 1rem;
}

.message {
  font-size: 1.15rem;
  font-style: italic;
  margin-bottom: 3rem;
  opacity: 0.8;
}

.back {
  display: inline-block;
  color: #8b1e2b;
  text-decoration: none;
  font-weight: 500;
}

.back:hover {
  text-decoration: underline;
}
</style>