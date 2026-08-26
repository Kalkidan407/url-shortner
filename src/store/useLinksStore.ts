import create from 'zustand'
import { persist } from 'zustand/middleware'

type LinkItem = {
  id: string
  original: string
  short: string
  target?: string
  siteName?: string
  clickCount?: number
  createdAt?: string
}

type State = {
  links: LinkItem[]
  add: (l: LinkItem) => void
  clear: () => void
}

const useLinksStore = create<State>()(
  persist(
    (set) => ({
      links: [],
      add: (l) => set((s) => ({ links: [l, ...s.links] })),
      clear: () => set({ links: [] }),
    }),
    {
      name: 'links-store',
    }
  )
)

export default useLinksStore
