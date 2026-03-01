<script setup lang="ts">
import { ref } from 'vue'
import type { ShortenResponse } from '@/types/shortener'
import CopyIcon from '@/assets/icons/copy.svg'

const { shortenedLink } = defineProps<{
  shortenedLink: ShortenResponse
}>()

const alertMessage = ref('')
const copied = ref(false)

const copyShortUrl = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(shortenedLink.shortUrl)
    alertMessage.value = 'Copied to clipboard!'
    copied.value = true

    setTimeout(() => {
      copied.value = false
      alertMessage.value = ''
    }, 2000)
  } catch {
    alertMessage.value = 'Could not copy to clipboard'
  }
}
</script>

<template>
  <div data-test="shorten-result" class="shorten-result">
    <div class="shorten-result__field">
      <label for="short-link" class="label">Shortened link</label>
      <input
        id="short-link"
        data-test="short-link-input"
        type="text"
        :value="shortenedLink.shortUrl"
        readonly
        class="shorten-result__input"
      />
    </div>
    <button
      data-test="copy-button"
      class="copy-button"
      @click="copyShortUrl"
      aria-label="Copy short URL to clipboard"
    >
      <CopyIcon class="copy-button__svg" aria-hidden="true" />
    </button>

    <div data-test="copy-notification" role="alert" v-show="copied" class="copy-notification">
      {{ alertMessage }}
    </div>
  </div>
</template>

<style scoped>
.shorten-result {
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-bg-dark);
}

.shorten-result__field {
  flex: 1;
}

.shorten-result__input {
  font-size: clamp(1rem, 0.971rem + 0.143vw, 1.1rem);
  width: 100%;
  border: none;
  border-radius: var(--border-radius);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.5rem;
  min-height: 3.125rem;
}

.copy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-light);
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  min-height: 3.125rem;
  min-width: 3.125rem;
  cursor: pointer;
}

.copy-button:hover,
.copy-button:focus-visible {
  background-color: var(--color-primary-dark);
}

.copy-button__svg {
  width: 1.2rem;
  height: auto;
}

.copy-notification {
  z-index: 9;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(calc(100% + 0.5rem));
  background-color: var(--color-success-light);
  border: 1px solid var(--color-success);
  color: var(--color-success-dark);
  font-size: 0.95rem;
  padding: 0.6rem;
  border-radius: 2px;
}
</style>
