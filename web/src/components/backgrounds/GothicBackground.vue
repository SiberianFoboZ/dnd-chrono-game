<template>
  <div class="gothic-bg" aria-hidden="true">
    <div class="stars"></div>
  </div>
</template>

<style scoped>
.gothic-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: #0e0a0a;
  pointer-events: none;
}

.stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, rgba(255, 215, 130, 0.7), transparent),
    radial-gradient(1px 1px at 40% 70%, rgba(184, 153, 104, 0.5), transparent),
    radial-gradient(1px 1px at 60% 20%, rgba(255, 215, 130, 0.6), transparent),
    radial-gradient(1px 1px at 80% 50%, rgba(184, 153, 104, 0.5), transparent),
    radial-gradient(1px 1px at 10% 80%, rgba(255, 215, 130, 0.4), transparent),
    radial-gradient(1px 1px at 50% 10%, rgba(184, 153, 104, 0.6), transparent),
    radial-gradient(1px 1px at 90% 90%, rgba(255, 215, 130, 0.5), transparent),
    radial-gradient(1px 1px at 30% 50%, rgba(184, 153, 104, 0.4), transparent);
  background-size: 240px 240px;
}
</style>