"use client"

import React from 'react'

export default function LinkCard({
  item,
}: {
  item: {
    id: string
    original: string
    short: string
    target?: string
    siteName?: string
    clickCount?: number
    createdAt?: string
  }
}) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/30">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-sky-300">
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-1">
              {item.siteName || 'web'}
            </span>
            <span className="text-slate-400">{item.clickCount ?? 0} clicks</span>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Original URL</p>
            <a
              href={item.target || item.original}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-sm text-slate-200 hover:text-sky-300"
            >
              {item.original}
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Short Link</p>
            <a
              href={item.target || item.short}
              target="_blank"
              rel="noreferrer"
              className="block break-all text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              {item.short}
            </a>
          </div>
        </div>

        <div className="flex min-w-[110px] flex-col items-stretch gap-2">
          <button
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
            onClick={() => navigator.clipboard.writeText(item.short)}
          >
            Copy
          </button>
          {item.createdAt && (
            <span className="text-center text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
