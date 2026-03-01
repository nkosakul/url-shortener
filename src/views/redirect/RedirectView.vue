<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { resolveShortCode } from '@/api/shortener'

const route = useRoute()

type Status = 'loading' | 'redirecting' | 'not-found'
const status = ref<Status>('loading')
const longUrl = ref('')

const doRedirect = (url: string) => {
  status.value = 'redirecting'
  window.location.href = url
}

const tryResolveCode = async (code: string) => {
  if (!code) {
    status.value = 'not-found'
    return
  }

  status.value = 'loading'

  try {
    const { url } = await resolveShortCode(code)
    longUrl.value = url
    doRedirect(url)
  } catch {
    status.value = 'not-found'
  }
}

onMounted(() => tryResolveCode(route.params.shortCode as string))

watch(
  () => route.params.shortCode,
  (code) => {
    if (!code) return
    tryResolveCode(code as string)
  },
)
</script>

<template>
  <div class="redirect">
    <div class="card redirect__card">
      <p v-if="status === 'loading'">Resolving…</p>
      <p v-else-if="status === 'redirecting'">Redirecting to {{ longUrl }}…</p>
      <div v-else class="redirect__error">
        <p>Short link not found</p>
        <p>This short link doesn't exist or has expired.</p>
        <router-link to="/" class="button">Create a short link</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.redirect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.redirect p {
  margin: 0;
}

.card {
  width: 100%;
  background: var(--color-bg-light);
  border-radius: var(--border-radius);
  padding: clamp(1.5rem, 1rem + 2.5vw, 3.25rem);
}

.redirect__card {
  text-align: center;
}

.redirect__error {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
