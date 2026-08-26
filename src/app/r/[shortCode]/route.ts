import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://url-shortener-a697.onrender.com'

/**
 * GET /r/[shortCode]
 * Shorter redirect route for shortened URLs
 * Resolves short code and performs a 302 redirect to the original URL
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    const shortCode = params.shortCode
    const upstreamUrl = `${API_BASE}/api/redirect/${encodeURIComponent(shortCode)}`

    const upstreamRes = await fetch(upstreamUrl, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        Accept: 'text/plain, */*',
      },
    })

    const location = upstreamRes.headers.get('location') || null
    const rawBody = await upstreamRes.text()
    
    const normalizedBody = rawBody.trim()
    const parsedLocation =
      location ||
      (normalizedBody.startsWith('redirect:')
        ? normalizedBody.replace(/^redirect:/i, '').trim()
        : normalizedBody.match(/https?:\/\/[^\s]+/i)?.[0] ?? null)

    if (parsedLocation) {
      return NextResponse.redirect(parsedLocation, { status: 302 })
    }

    return NextResponse.json(
      {
        message: 'Short code not found',
      },
      { status: 404 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || 'Unable to resolve short link',
      },
      { status: 500 }
    )
  }
}
