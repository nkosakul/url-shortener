<script setup lang="ts">
import { ref } from 'vue'
import { shortenUrl } from '@/api/shortener'
import type { ShortenResponse } from '@/types/shortener'

const longUrl = ref('')
const loading = ref(false)
const hasValidationError = ref(false)

const emit = defineEmits<{
  success: [payload: ShortenResponse]
}>()

const validate = (): boolean => {
  const value = longUrl.value.trim()
  if (!value) return false

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

const handleSubmit = async (): Promise<void> => {
  hasValidationError.value = false

  // validate URL
  const isValid = validate()
  if (!isValid) {
    hasValidationError.value = true
    return
  }

  loading.value = true

  const res = await shortenUrl(longUrl.value)

  emit('success', res)

  loading.value = false
}
</script>

<template>
  <form data-test="shorten-form" @submit.prevent="handleSubmit" class="form">
    <div class="form__row">
      <div class="form__item">
        <label for="long-url" class="label" :class="{ 'label--error': hasValidationError }">
          URL
        </label>
        <input
          id="long-url"
          data-test="long-url-input"
          v-model="longUrl"
          type="text"
          inputmode="url"
          placeholder="https://example.com/very/long/url"
          class="form__input"
          :disabled="loading"
          :aria-invalid="!!hasValidationError"
          :aria-describedby="hasValidationError ? 'long-url-error' : undefined"
        />
        <span
          v-if="hasValidationError"
          id="long-url-error"
          data-test="validation-error"
          class="form__error"
        >
          Please enter a valid URL (like https://example.com).
        </span>
      </div>

      <button
        type="submit"
        data-test="submit-button"
        class="button form__submit"
        :disabled="loading"
      >
        Shorten Link
      </button>
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

.form__input {
  font-size: clamp(1rem, 0.943rem + 0.286vw, 1.2rem);
  min-height: 3.75rem;
  padding: 1rem;
  border: 1px solid var(--color-bg-dark);
  border-radius: var(--border-radius);
  width: 100%;
}

.form__input[aria-invalid='true'] {
  border-color: var(--color-error);
}

.form__submit {
  min-height: 3.75rem;
}

.form__error {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(calc(100% + 0.25rem));
  color: var(--color-error);
  font-size: 0.9rem;
}
</style>
