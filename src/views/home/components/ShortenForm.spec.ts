import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ShortenForm from './ShortenForm.vue'
import { shortenUrl } from '@/api/shortener'

vi.mock('@/api/shortener', () => ({
  shortenUrl: vi.fn(),
}))

const mockShortenUrl = vi.mocked(shortenUrl)

describe('ShortenForm', () => {
  it('renders input and submit button', () => {
    const wrapper = mount(ShortenForm)

    expect(wrapper.find('[data-test="long-url-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="submit-button"]').exists()).toBe(true)
  })

  it('shows validation error on submit with empty URL', async () => {
    const wrapper = mount(ShortenForm)

    await wrapper.find('[data-test="shorten-form"]').trigger('submit.prevent')

    expect(wrapper.find('[data-test="validation-error"]').exists()).toBe(true)
    expect(mockShortenUrl).not.toHaveBeenCalled()
  })

  it('shows validation error on submit with invalid URL', async () => {
    const wrapper = mount(ShortenForm)

    await wrapper.find('[data-test="long-url-input"]').setValue('not-a-valid-url')
    await wrapper.find('[data-test="shorten-form"]').trigger('submit.prevent')

    expect(wrapper.find('[data-test="validation-error"]').exists()).toBe(true)
    expect(mockShortenUrl).not.toHaveBeenCalled()
  })

  it('calls shortenUrl and emits success with valid URL', async () => {
    mockShortenUrl.mockResolvedValue({
      shortCode: 'abc12345',
      shortUrl: 'http://localhost/r/abc12345',
      longUrl: 'https://example.com',
    })

    const wrapper = mount(ShortenForm)

    await wrapper.find('[data-test="long-url-input"]').setValue('https://example.com')
    await wrapper.find('[data-test="shorten-form"]').trigger('submit.prevent')

    expect(mockShortenUrl).toHaveBeenCalledWith('https://example.com')
    expect(wrapper.emitted('success')).toHaveLength(1)
    expect(wrapper.emitted('success')![0]).toEqual([
      {
        shortCode: 'abc12345',
        shortUrl: 'http://localhost/r/abc12345',
        longUrl: 'https://example.com',
      },
    ])
  })
})
