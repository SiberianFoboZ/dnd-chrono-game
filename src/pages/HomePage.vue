<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import DiaryLayout from '@/components/DiaryLayout.vue'
import DiaryFooter from '@/components/DiaryFooter.vue'
import { characters, HIDDEN_SLUGS, SECRET_CODE, STORAGE_KEY } from '@/data/characters'

const statusLabel = (status: 'active' | 'wip'): string =>
  status === 'active' ? '● доступен' : '○ в процессе'

const visibleChars = computed(() =>
  characters.filter((c) => !HIDDEN_SLUGS.includes(c.slug))
)
const hiddenChars = computed(() =>
  characters.filter((c) => HIDDEN_SLUGS.includes(c.slug))
)

const unlocked = ref(false)
const typedBuffer = ref('')

function persist(value: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  } catch {
    /* localStorage недоступен — работаем только в памяти сессии */
  }
}

function toggleUnlock() {
  unlocked.value = !unlocked.value
  persist(unlocked.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  if (e.key === 'Backspace') {
    typedBuffer.value = typedBuffer.value.slice(0, -1)
    return
  }
  if (e.key.length !== 1) return

  typedBuffer.value = (typedBuffer.value + e.key.toLowerCase()).slice(-SECRET_CODE.length)

  if (typedBuffer.value === SECRET_CODE && !unlocked.value) {
    unlocked.value = true
    persist(true)
    typedBuffer.value = ''
  }
}

onMounted(() => {
  try {
    unlocked.value = localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    /* ничего — остаёмся заблокированными */
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <DiaryLayout theme-key="artur">
    <main class="home">
      <h1>Хроники отряда</h1>
      <p class="lead">Летопись шести путников, вошедших в туман Баровии.</p>

      <ul class="diary-list">
        <li v-for="c in visibleChars" :key="c.id">
          <RouterLink :to="`/${c.slug}`" class="diary-link">
            <span class="name">{{ c.name }}</span>
            <span class="role">{{ c.title }}</span>
            <span class="status" :class="{ active: c.status === 'active' }">
              {{ statusLabel(c.status) }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <section
        v-if="unlocked"
        class="hidden-section"
        aria-label="Скрытые хроники"
      >
        <header class="hidden-header">
          <span class="lock-icon" aria-hidden="true">🔓</span>
          <h2>Скрытые хроники</h2>
          <button
            type="button"
            class="lock-toggle"
            @click="toggleUnlock"
            aria-label="Скрыть хроники"
          >
            скрыть
          </button>
        </header>
        <ul class="diary-list">
          <li v-for="c in hiddenChars" :key="c.id">
            <RouterLink :to="`/${c.slug}`" class="diary-link hidden-link">
              <span class="name">{{ c.name }}</span>
              <span class="role">{{ c.title }}</span>
              <span class="status" :class="{ active: c.status === 'active' }">
                {{ statusLabel(c.status) }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </section>

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

h2 {
  font-size: 1.3rem;
  margin: 0;
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

.hidden-link {
  background: #f0e6d4;
  border-style: dashed;
  border-color: #8a7a5a;
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

.hidden-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  border: 1px solid #8a7a5a;
  border-radius: 4px;
  background: rgba(255, 248, 235, 0.5);
  animation: fade-in 0.4s ease-out;
}

.hidden-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.lock-icon {
  font-size: 1.2rem;
}

.lock-toggle {
  margin-left: auto;
  background: transparent;
  border: 1px solid #8a7a5a;
  color: #5a4a2c;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 3px;
  cursor: pointer;
  font-family: inherit;
}

.lock-toggle:hover {
  background: rgba(138, 122, 90, 0.1);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
