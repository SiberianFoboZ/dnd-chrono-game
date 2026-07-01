<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt: string
  position?: 'left' | 'right' | 'none'
  caption?: string
  width?: string
}>(), {
  position: 'none',
  caption: '',
  width: '',
})
</script>

<template>
  <figure class="diary-image-figure">
    <img
      :src="src"
      :alt="alt"
      class="diary-image"
      :class="position !== 'none' ? position : ''"
      :style="width ? { width } : {}"
    />
    <figcaption v-if="caption" class="image-caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.diary-image-figure {
  margin: 0;
}
</style>