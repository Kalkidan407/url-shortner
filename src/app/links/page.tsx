'use client'

import Link from 'next/link'
import LinkCard from '../../components/LinkCard'
import useLinksStore from '../../store/useLinksStore'

export default function LinksPage() {
  const links = useLinksStore((s) => s.links)

  return (
    <div className="min-h-screen overflow-hidden bg-[#06111f80] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-10 top-24 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-12 top-32 h-36 w-36 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-12 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0,_transparent_52%,_rgba(15,23,42,0.72)_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22 viewBox=%220 0 240 240%22%3E%3Cg fill=%22none%22 stroke=%22rgba(148,163,184,0.35)%22 stroke-width=%221.2%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M84 72h36a16 16 0 0 1 16 16v20m-52 52H84a16 16 0 0 1-16-16V92m40 16h16m-16 0v16m-24-8h24m24 0h24m-8 8v24m0-24h-24%22/%3E%3C/g%3E%3C/svg%3E');background-size:320px_320px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <header className="mb-10 flex items-center  gap-28 rounded-full border border-slate-700/80 bg-[#06111f62] px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500/65 to-sky-500 font-black text-white shadow-lg shadow-violet-500/30">
              U
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white">UrlShortner</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Smart links</div>
            </div>
          </div>

          <nav className="flex items-center gap-8 text-sm text-slate-300">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <Link href="/links" className="transition hover:text-white">Links</Link>
          </nav>
          
        </header>

        <section className="rounded-[28px] border border-slate-700/80  bg-[#1c67ca0e] p-4 shadow-2xl shadow-slate-950/50 sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sky-300">Overview</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Your links</h1>
            </div>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
              {links.length} {links.length === 1 ? 'link' : 'links'}
            </span>
          </div>

          {links.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-10 text-center text-slate-400">
              No links yet. Create one from the home page.
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <LinkCard key={link.id} item={link} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
