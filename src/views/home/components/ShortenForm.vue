<script setup lang="ts">
import { ref } from 'vue'

const longUrl = ref('')
</script>

<template>
  <form class="form">
    <div class="form__row">
      <div class="form__item">
        <label for="long-url" class="form__label">URL</label>
        <input
          id="long-url"
          v-model="longUrl"
          type="url"
          placeholder="https://example.com/very/long/url"
          class="form__input"
        />
      </div>

      <button type="submit" class="button form__submit">Shorten Link</button>
    </div>
  </form>
</template>

<style scoped>
.form__row {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

.form__item {
  flex: 1;
  position: relative;
}

.form__label {
  margin-bottom: 0.2rem;
  display: inline-block;
  font-size: 0.9rem;
}

.form__input {
  font-size: clamp(1rem, 0.943rem + 0.286vw, 1.2rem);
  min-height: 3.75rem;
  padding: 1rem;
  border: 1px solid var(--color-bg-dark);
  border-radius: var(--border-radius);
  width: 100%;
}

.form__submit {
  min-height: 3.75rem;
}
</style>
