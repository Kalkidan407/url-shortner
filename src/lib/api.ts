const API_BASE = process.env.NEXT_API_BASE_UR ;

interface ShortenResponse {
  id: string
  shortCode: string
  originalUrl: string
  siteName?: string
  clickCount?: number
  createdAt?: string
}

interface ResolveResponse {
  status: number
  location: string | null
}

/**
 * Shorten a long URL using the backend API
 */
export const shorten = async (url: string, siteName = 'web'): Promise<ShortenResponse> => {
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
    const message = payload?.message || payload?.error || 'Request failed'
    throw new Error(message)
  }

  return payload
}

/**
 * Resolve a short code to its original URL
 */
export const resolveShort = async (shortId: string): Promise<ResolveResponse> => {
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