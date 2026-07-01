<template>
  <div class="book-bg" aria-hidden="true">
    <div class="paper-texture"></div>
    <div class="yellowing"></div>
  </div>
</template>

<style scoped>
.book-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: #2a1f14;
  pointer-events: none;
}

.paper-texture {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(244, 232, 208, 0.04) 0px,
      rgba(244, 232, 208, 0.04) 1px,
      transparent 1px,
      transparent 4px
    );
}

.yellowing {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      rgba(60, 40, 20, 0.7) 0%,
      transparent 8%,
      transparent 92%,
      rgba(60, 40, 20, 0.7) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(60, 40, 20, 0.7) 0%,
      transparent 8%,
      transparent 92%,
      rgba(60, 40, 20, 0.7) 100%
    );
}
</style>