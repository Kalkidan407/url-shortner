import '../styles/globals.css'

import { ReactNode } from 'react'



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-3xl">{children}</div>
        </main>
      </body>
    </html>
  )
}
