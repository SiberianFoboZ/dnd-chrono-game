<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="placeholder">
    <p class="title">Зираэлла Ларус</p>
    <p class="message">Дневник мигрируется на новую платформу…</p>
    <RouterLink to="/" class="back">← Вернуться к меню</RouterLink>
  </main>
</template>

<style scoped>
.placeholder {
  max-width: 720px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
}

.title {
  font-size: 2rem;
  margin: 0 0 1rem;
}

.message {
  font-size: 1.1rem;
  color: #4a4a4a;
  font-style: italic;
  margin-bottom: 3rem;
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