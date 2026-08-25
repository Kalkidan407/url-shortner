const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://url-shortener-a697.onrender.com'

export const shorten = async (url: string, siteName = 'web') => {
  const res = await fetch('/api/shorten', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      originalUrl: url,
      siteName,
    }),
  })

  const payload = await res.json().catch(() => ({}))

  if (!res.ok) {
    const message =
      payload?.message ||
      payload?.error ||
      'Request failed'

    throw new Error(message)
  }

  return payload
}

/**
 * Resolve a short link to its original URL.
 */
export const resolveShort = async (shortId: string) => {
  const targetUrl = `/api/resolve/${encodeURIComponent(shortId)}`

  try {
    const res = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'manual',
    })

    const payload = await res.json().catch(() => ({}))
    const location = payload?.location ?? null

    return {
      status: res.status,
      location,
    }
  } catch (err) {
    throw err
  }
}

export default {
  shorten,
  resolveShort,
}