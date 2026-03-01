<script setup lang="ts">
import ShortenForm from './components/ShortenForm.vue'
</script>

<template>
  <div class="home container">
    <div class="card">
      <h1 class="title title--brackets"><em class="title__highlight">URL</em> Shortener</h1>
      <p class="tagline">Paste a long URL and get a short link.</p>

      <ShortenForm />
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: clamp(2.25rem, 1.893rem + 1.786vw, 3.5rem);
  font-family: 'hasklig', monospace;
  font-weight: 700;
  margin: 0;
  text-align: center;
}

.title--brackets::before {
  content: '{'/'';
  padding-right: 0.25em;
}

.title--brackets::after {
  content: '};'/'';
  padding-left: 0.25em;
}

.title__highlight {
  color: var(--color-primary);
  font-style: normal;
}

.tagline {
  text-align: center;
}
</style>
