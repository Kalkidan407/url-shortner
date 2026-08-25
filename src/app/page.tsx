import Link from 'next/link'
import ShortenForm from '../components/ShortenForm'

export default function Page() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#06111f65] text-white">

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-10 top-24 h-28 w-28 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute right-12 top-32 h-36 w-36 rounded-full bg-orange-500/30 blur-3xl" />
        <div className="absolute bottom-12 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0,_transparent_52%,_rgba(15,23,42,0.72)_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22 viewBox=%220 0 240 240%22%3E%3Cg fill=%22none%22 stroke=%22rgba(148,163,184,0.35)%22 stroke-width=%2２1.２%２ stroke-linecap=%２round%２ stroke-linejoin=%２round%２%3E%3Cpath d=%２M84 7２h36a16 16 0 0 1 16 16v２０m-5２ 5２H84a16 16 0 0 1-16-16V9２m4０ １６h１６m-１６ ０v１６m-２４-８h２４m２４ ０h２４m-８ ８v２４m０-２４h-２４%２/%３E%3C/g%３E%3C/svg%３E');background-size:3₂₀px_3₂₀px]" />
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

        <main className="space-y-10">
          <section className="px-3 pt-8 text-center sm:px-8">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
                Transform your <span className="text-sky-400">long links</span> into powerful URLs
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
                Shorten, customize, and track your links with advanced analytics for your online campaigns.
              </p>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#5e5e5f6c] bg-[#040e1a6e] p-4 shadow-2xl shadow-[#06111f6b] sm:p-6 lg:p-8">
            <ShortenForm />
          </section>
        </main>
      </div>
    </div>
  )
}
