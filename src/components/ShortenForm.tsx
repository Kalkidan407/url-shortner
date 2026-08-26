"use client"

import { useState } from 'react'
import { resolveShort, shorten } from '../lib/api'
import useLinksStore from '../store/useLinksStore'
import LinkCard from './LinkCard'

export default function ShortenForm() {
  const [input, setInput] = useState('')
  const [siteName, setSiteName] = useState('web')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [latest, setLatest] = useState<null | {
    id: string
    original: string
    short: string
    shortCode: string
    target?: string
    siteName?: string
    clickCount?: number
    createdAt?: string
  }>(null)

  const addLink = useLinksStore((s) => s.add)
  const links = useLinksStore((s) => s.links)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setError(null)

    if (!input.trim()) {
      setError('Please paste a URL')
      return
    }

    setLoading(true)

    try {
      const data = await shorten(input.trim(), siteName.trim() || 'web')
      const shortCode = data.shortCode

      if (!shortCode) {
        throw new Error('Backend did not return a short code')
      }

      const apiBase =
        process.env.NEXT_PUBLIC_API_BASE_URL ??
        'https://url-shortener-a697.onrender.com'

      const fullShort = `${apiBase}/r/${shortCode}`
      const resolved = await resolveShort(shortCode)
      const targetUrl = resolved.location || data.originalUrl || input
      const finalSiteName = data.siteName || siteName || 'web'

      const item = {
        id: data.id ?? Date.now().toString(),
        original: data.originalUrl ?? input,
        short: fullShort,
        target: targetUrl,
        siteName: finalSiteName,
        clickCount: Number(data.clickCount ?? 0),
        createdAt: data.createdAt ?? new Date().toISOString(),
      }

      addLink(item)
      setLatest({
        id: item.id,
        original: item.original,
        short: item.short,
        shortCode,
        target: targetUrl,
        siteName: finalSiteName,
        clickCount: item.clickCount,
        createdAt: item.createdAt,
      })

      setInput('')
      setSiteName('web')
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Request failed'

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            className="input flex-1 border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-400"
            placeholder="https://github.com/your/repo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />

          <input
            className="input w-full md:w-40 border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-400"
            placeholder="site name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            className="button-primary min-w-[180px] rounded-xl bg-gradient-to-r from-[#02091373] to-orange-500/65 px-5 py-3 font-semibold text-white hover:from-violet-400 hover:to-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            {loading ? 'Working…' : 'Shorten Now'}
          </button>
        </div>

        {error && <div className="text-sm text-rose-400">{error}</div>}
      </form>

      {latest && (
        <div className="rounded-2xl border border-sky-500/30 bg-slate-900/70 p-4 shadow-lg shadow-sky-900/30">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Latest generated link</p>
            <button
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:border-sky-400 hover:text-sky-300"
              onClick={() => navigator.clipboard.writeText(latest.short)}
            >
              Copy
            </button>
          </div>

          <div className="space-y-3 text-sm text-slate-200">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Site</p>
              <p className="font-medium text-sky-300">{latest.siteName || 'web'}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Original</p>
              <a href={latest.target || latest.original} target="_blank" rel="noreferrer" className="break-all text-slate-100 hover:text-sky-300">
                {latest.original}
              </a>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Short</p>
              <a href={latest.target || latest.short} target="_blank" rel="noreferrer" className="break-all font-medium text-violet-300 hover:text-violet-200">
                {latest.short}
              </a>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-700/70 bg-slate-950/70 px-3 py-2">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Clicks</span>
              <span className="text-sm font-semibold text-slate-100">{latest.clickCount ?? 0}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}