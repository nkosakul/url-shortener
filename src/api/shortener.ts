import { nanoid } from 'nanoid'
import type { ResolveResponse, ShortenResponse } from '@/types/shortener'

const KEY = 'url-shortener'

const getStore = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

/*
 * Since we dont have a backend,
 * we will use localStorage as our "database" to store the short codes and their corresponding long URLs.
 */
const setStore = (store: Record<string, string>): void => {
  localStorage.setItem(KEY, JSON.stringify(store))
}

export const shortenUrl = (longUrl: string): Promise<ShortenResponse> => {
  const url = longUrl.trim()

  const store = getStore() // get the current store (localStorage)
  const shortCode = nanoid(8) // generate a unique short code

  store[shortCode] = url

  // save the updated store back to localStorage
  setStore(store)

  return Promise.resolve({
    shortCode,
    shortUrl: `${window.location.origin}/r/${shortCode}`,
    longUrl: url,
  })
}

export const resolveShortCode = (shortCode: string): Promise<ResolveResponse> => {
  const store = getStore()
  const url = store[shortCode.trim()]

  if (!url) return Promise.reject(new Error('Short link not found'))

  return Promise.resolve({ url })
}
