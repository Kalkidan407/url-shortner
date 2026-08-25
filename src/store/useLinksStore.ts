import create from 'zustand'

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

const useLinksStore = create<State>((set) => ({
  links: [],
  add: (l) => set((s) => ({ links: [l, ...s.links] })),
  clear: () => set({ links: [] }),
}))

export default useLinksStore
