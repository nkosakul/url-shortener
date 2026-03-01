import { beforeEach, describe, expect, it } from 'vitest'
import { resolveShortCode, shortenUrl } from './shortener'

const KEY = 'url-shortener'

describe('shortener API', () => {
  beforeEach(() => {
    localStorage.removeItem(KEY)
  })

  describe('shortenUrl', () => {
    it('returns shortCode, shortUrl and longUrl', async () => {
      const res = await shortenUrl('https://example.com')

      expect(res).toMatchObject({
        longUrl: 'https://example.com',
      })
      expect(res.shortCode).toHaveLength(8)
      expect(res.shortUrl).toBe(`${window.location.origin}/r/${res.shortCode}`)
    })

    it('stores mapping in localStorage', async () => {
      const res = await shortenUrl('https://vuejs.org')
      const stored = JSON.parse(localStorage.getItem(KEY) ?? '{}')

      expect(stored[res.shortCode]).toBe('https://vuejs.org')
    })
  })

  describe('resolveShortCode', () => {
    it('returns url when code exists', async () => {
      const res = await shortenUrl('https://example.com')
      const resolved = await resolveShortCode(res.shortCode)

      expect(resolved.url).toBe('https://example.com')
    })

    it('rejects when code not found', async () => {
      await expect(resolveShortCode('nonexistent')).rejects.toThrow('Short link not found')
    })

    it('trims shortCode', async () => {
      const res = await shortenUrl('https://example.com')
      const resolved = await resolveShortCode(`  ${res.shortCode}  `)

      expect(resolved.url).toBe('https://example.com')
    })
  })
})
