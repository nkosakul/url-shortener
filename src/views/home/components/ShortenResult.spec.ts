import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ShortenResult from './ShortenResult.vue'
import type { ShortenResponse } from '@/types/shortener'

const defaultProps: ShortenResponse = {
  shortCode: 'abc12345',
  shortUrl: 'http://localhost/r/abc12345',
  longUrl: 'https://example.com/page',
}

describe('ShortenResult', () => {
  const writeText = vi.fn()

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText },
    })
    writeText.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('copies short URL to clipboard when copy button is clicked', async () => {
    const wrapper = mount(ShortenResult, {
      props: { shortenedLink: defaultProps },
    })
    await wrapper.find('[data-test="copy-button"]').trigger('click')
    expect(writeText).toHaveBeenCalledWith(defaultProps.shortUrl)
  })

  it('shows "Copied to clipboard!" after copy button is clicked', async () => {
    const wrapper = mount(ShortenResult, {
      props: { shortenedLink: defaultProps },
    })
    await wrapper.find('[data-test="copy-button"]').trigger('click')
    await flushPromises()
    const notification = wrapper.find('[data-test="copy-notification"]')
    expect(notification.exists()).toBe(true)
    expect(notification.text()).toBe('Copied to clipboard!')
  })
})
