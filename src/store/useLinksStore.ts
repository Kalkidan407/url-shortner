import create from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Represents a shortened URL link
 */
export type LinkItem = {
  id: string
  original: string
  short: string
  target?: string
  siteName?: string
  clickCount?: number
  createdAt?: string
}

/**
 * Links store state and actions
 */
type LinksState = {
  links: LinkItem[]
  add: (link: LinkItem) => void
  clear: () => void
}

/**
 * Global store for managing shortened links with localStorage persistence
 */
const useLinksStore = create<LinksState>()(
  persist(
    (set) => ({
      links: [],
      add: (link) => set((state) => ({ links: [link, ...state.links] })),
      clear: () => set({ links: [] }),
    }),
    {
      name: 'links-store', // localStorage key
    }
  )
)

export default useLinksStore
