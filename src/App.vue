<script setup lang="ts">
import StarIcon from '@/assets/icons/star.svg'
import CircleIcon from '@/assets/icons/circle.svg'
</script>

<template>
  <div class="layout">
    <main class="main">
      <RouterView />
    </main>

    <!-- background svg's -->
    <div class="bg-icons">
      <StarIcon class="bg-icon bg-icon--left" aria-hidden="true" />
      <CircleIcon class="bg-icon bg-icon--right" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  width: 100%;
  max-width: min(70rem, 100%);
  margin-left: auto;
  margin-right: auto;
  flex: 1;
  padding: clamp(1.5rem, 1.071rem + 2.143vw, 3rem);
}

.bg-icons {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.bg-icon {
  position: absolute;
  z-index: -1;
  width: 50vw;
}

.bg-icon--left {
  top: 0;
  left: 0;
  transform: translateX(-40%) translateY(-40%);
}

.bg-icon--right {
  right: 0;
  bottom: 0;
  transform: translateX(50%) translateY(50%);
}
</style>
