<template>
  <div class="forest-bg" aria-hidden="true">
    <div class="stars"></div>
    <div class="moon-haze"></div>
    <div class="moon"></div>
  </div>
</template>

<style scoped>
.forest-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: linear-gradient(180deg, #050a08 0%, #112420 100%);
  pointer-events: none;
}

.stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 15% 25%, rgba(194, 199, 212, 0.75), transparent),
    radial-gradient(1px 1px at 35% 15%, rgba(184, 152, 85, 0.55), transparent),
    radial-gradient(1px 1px at 55% 35%, rgba(194, 199, 212, 0.65), transparent),
    radial-gradient(1px 1px at 75% 10%, rgba(184, 152, 85, 0.45), transparent),
    radial-gradient(1px 1px at 25% 45%, rgba(138, 92, 182, 0.55), transparent),
    radial-gradient(1px 1px at 85% 50%, rgba(194, 199, 212, 0.6), transparent),
    radial-gradient(1px 1px at 5% 60%, rgba(184, 152, 85, 0.5), transparent),
    radial-gradient(1px 1px at 45% 5%, rgba(138, 92, 182, 0.45), transparent);
  background-size: 260px 260px;
}

.moon-haze {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  background: radial-gradient(
    ellipse at top right,
    rgba(194, 199, 212, 0.12) 0%,
    transparent 70%
  );
}

.moon {
  position: absolute;
  top: 8%;
  right: 12%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(230, 230, 210, 0.85),
    rgba(194, 199, 212, 0.25) 50%,
    transparent 75%
  );
  filter: blur(1.5px);
}
</style>