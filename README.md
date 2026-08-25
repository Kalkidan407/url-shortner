# URL Frontend

Quick start (using Bun):

1. Install dependencies with Bun:

```bash
cd url-frontend
bun install
```

2. Run development server:

```bash
bun run dev
# or with npm/yarn: npm run dev
```

Environment:
- `NEXT_PUBLIC_API_BASE_URL` - base URL for the backend API (defaults to `https://url-shortener-a697.onrender.com`)

Notes:
- Components use small shadcn-like Tailwind utilities (no external shadcn package required). 
- Small state store uses `zustand` to keep created links in memory.

Adjust API paths in `src/lib/api.ts` if the backend expects a different endpoint shape.
