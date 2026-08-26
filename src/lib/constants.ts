// API Configuration
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://url-shortener-a697.onrender.com'

// Default Values
export const DEFAULT_SITE_NAME = 'web'

// UI Constants
export const ERROR_MESSAGES = {
  EMPTY_URL: 'Please paste a URL',
  NO_SHORT_CODE: 'Backend did not return a short code',
  REQUEST_FAILED: 'Request failed',
}

export const UI_LABELS = {
  SHORTEN_BUTTON: 'Shorten Now',
  WORKING_BUTTON: 'Working…',
  COPY_BUTTON: 'Copy',
  LATEST_LINK: 'Latest generated link',
}
