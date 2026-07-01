<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DiaryLayout from '@/components/DiaryLayout.vue'
import DiaryFooter from '@/components/DiaryFooter.vue'
import { characters } from '@/data/characters'

const statusLabel = (status: 'active' | 'wip'): string =>
  status === 'active' ? '● доступен' : '○ в процессе'
</script>

<template>
  <DiaryLayout theme-key="artur">
    <main class="home">
      <h1>Хроники отряда</h1>
      <p class="lead">Летопись шести путников, вошедших в туман Баровии.</p>

      <ul class="diary-list">
        <li v-for="c in characters" :key="c.id">
          <RouterLink :to="`/${c.slug}`" class="diary-link">
            <span class="name">{{ c.name }}</span>
            <span class="role">{{ c.title }}</span>
            <span class="status" :class="{ active: c.status === 'active' }">
              {{ statusLabel(c.status) }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <DiaryFooter />
    </main>
  </DiaryLayout>
</template>

<style scoped>
.home {
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

h1 {
  font-size: 2.4rem;
  margin: 0 0 0.5rem;
  color: var(--color-ink, #2c2c2c);
}

.lead {
  font-style: italic;
  color: var(--color-accent, #5a4a2c);
  margin-bottom: 3rem;
  opacity: 0.85;
}

.diary-list {
  list-style: none;
  padding: 0;
  margin: 0 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.diary-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  background: #fff8eb;
  border: 1px solid var(--color-accent, #d9c9a8);
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s, box-shadow 0.15s;
}

.diary-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-ink, #2c2c2c);
}

.role {
  font-size: 0.95rem;
  color: #5a5a5a;
  font-style: italic;
}

.status {
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.25rem;
}

.status.active {
  color: #2d7a3f;
}
</style>