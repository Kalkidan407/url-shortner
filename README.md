# UrlShortener - Frontend

A URL shortening application built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Features

- ✨ **Smart URL Shortening** - Convert long URLs into concise short links
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 💾 **Persistent Storage** - Links are saved locally in your browser
- 🎯 **Click Tracking** - Monitor the number of clicks for each shortened link
- 🏷️ **Site Categorization** - Organize links by site/project name
- 🔗 **Instant Sharing** - One-click copy to clipboard
- ⚡ **Real-time Updates** - Instant feedback and link generation
- 🎨 **Dark Theme UI** - Beautiful gradient design with Tailwind CSS

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- **Storage**: Browser localStorage with Zustand persistence
- **API Client**: Fetch API with error handling

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── api/
│   │   ├── shorten/        # URL shortening API route
│   │   └── resolve/        # URL resolution API route
│   ├── links/
│   │   └── page.tsx        # Links history page
│   └── r/
│       └── [shortCode]/    # Short link redirect handler
├── components/
│   ├── ShortenForm.tsx     # Main form component
│   └── LinkCard.tsx        # Link display card
├── lib/
│   ├── api.ts              # API client functions
│   └── constants.ts        # Application constants
├── store/
│   └── useLinksStore.ts    # Global state store
└── styles/
    └── globals.css         # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ or Bun
- npm, yarn, or Bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kalkidan407/url-shortner.git
   cd url-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
# Backend API base URL (defaults to Render deployment)
NEXT_PUBLIC_API_BASE_URL=https://url-shortener-a697.onrender.com
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Backend API

The frontend communicates with a Spring Boot backend API that handles:

- **URL Shortening**: Generate unique short codes for long URLs
- **URL Resolution**: Redirect short codes to original URLs
- **Click Tracking**: Count and track link usage
- **Link Management**: Store and retrieve link metadata

### Backend Repository

[URL-Shortener Backend](https://github.com/Kalkidan407/URL-Shortener) - Built with Spring Boot


## How It Works

### URL Shortening Flow

1. User enters a long URL and optional site name
2. Frontend validates and sends request to `/api/shorten`
3. Backend API (`/api/urls/post`) generates a unique short code
4. Frontend constructs the short URL: `{API_BASE}/r/{shortCode}`
5. Short link is displayed and saved to browser storage
6. User can copy and share the shortened link

### Link Resolution Flow

1. User clicks or visits a short link: `{API_BASE}/r/{shortCode}`
2. Frontend route handler calls backend `/api/redirect/{shortCode}`
3. Backend returns redirect information
4. User is redirected to original URL
5. Click count is incremented on backend

## Components

### ShortenForm
Main form component for URL shortening. Handles:
- URL input validation
- Form submission and API calls
- Error handling and display
- Latest link preview
- All links display

### LinkCard
Reusable card component displaying link information:
- Original and shortened URLs
- Click count
- Site/project name
- Created date
- Copy to clipboard functionality

## State Management

Using Zustand for lightweight state management:
- Stores all shortened links
- Persists to browser localStorage automatically
- Survives page refreshes and browser restarts
- Clean add/clear API

```typescript
const addLink = useLinksStore((s) => s.add)
const links = useLinksStore((s) => s.links)
const clearLinks = useLinksStore((s) => s.clear)
```


## Future Enhancements

- [ ] Analytics dashboard with charts
- [ ] Link expiration settings
- [ ] Custom short codes
- [ ] User authentication
- [ ] Link groups/collections
- [ ] QR code generation
- [ ] API rate limiting
- [ ] Dark/light theme toggle

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions:
- Frontend: [URL-Shortener Frontend Issues](https://github.com/Kalkidan407/url-shortner/issues)
- Backend: [URL-Shortener Backend Issues](https://github.com/Kalkidan407/URL-Shortener/issues)

## Author

[Kalkidan407](https://github.com/Kalkidan407)

---

**Happy URL Shortening! 🚀**
