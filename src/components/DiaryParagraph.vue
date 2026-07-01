<script setup lang="ts">
withDefaults(defineProps<{
  dropCap?: boolean
}>(), {
  dropCap: false,
})
</script>

<template>
  <p class="text-indent-paragraph" :class="{ 'drop-cap': dropCap }">
    <slot />
  </p>
</template>