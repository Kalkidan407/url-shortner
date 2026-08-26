import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://url-shortener-a697.onrender.com'

/**
 * POST /api/shorten
 * Creates a shortened URL by forwarding the request to the backend API
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { originalUrl, siteName = 'web' } = body ?? {}

    // Validate input
    if (!originalUrl) {
      return NextResponse.json(
        { message: 'originalUrl is required' },
        { status: 400 }
      )
    }

    const upstreamRes = await fetch(`${API_BASE}/api/urls/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originalUrl,
        siteName,
      }),
    })

    const text = await upstreamRes.text()

    if (!upstreamRes.ok) {
      let payload: any = {}
      try {
        payload = JSON.parse(text)
      } catch {
        payload = { message: text || 'Request failed' }
      }

      return NextResponse.json(
        {
          message: payload?.message || payload?.error || 'Request failed',
        },
        { status: upstreamRes.status }
      )
    }

    try {
      return NextResponse.json(JSON.parse(text), {
        status: upstreamRes.status,
      })
    } catch {
      return new NextResponse(text, {
        status: upstreamRes.status,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      })
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || 'Unexpected server error',
      },
      { status: 500 }
    )
  }
}
