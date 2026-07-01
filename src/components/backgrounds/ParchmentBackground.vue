<template>
  <div class="parchment-bg" aria-hidden="true"></div>
</template>

<style scoped>
.parchment-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(180, 160, 120, 0.07) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(120, 100, 60, 0.05) 0%, transparent 50%),
    #f5f0e8;
  pointer-events: none;
}
</style>