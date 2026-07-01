<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <h2 class="diary-chapter">
    <slot>{{ title }}</slot>
  </h2>
</template>

<style scoped>
.diary-chapter {
  text-align: center;
  margin: 2.5em 0 1.5em;
  position: relative;
  font-weight: 600;
}

.diary-chapter:not(:first-of-type)::before {
  content: var(--ornament-top);
  display: block;
  margin-bottom: 0.4em;
  opacity: 0.85;
  font-size: 0.9em;
}

.diary-chapter::after {
  content: var(--ornament-bottom);
  display: block;
  margin-top: 0.4em;
  opacity: 0.85;
  font-size: 0.9em;
}
</style>