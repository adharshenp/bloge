# Bloge - Modern SSR Blog

A modern server-side rendered blog application built with Next.js 15, React Query, and Tailwind CSS v4.

## Features

- ✅ **Server-Side Rendering (SSR)** - Fast initial page loads with SEO optimization
- ✅ **React Query Integration** - Efficient data fetching and caching
- ✅ **Dynamic Routing** - Individual blog post pages with Next.js App Router
- ✅ **Search Functionality** - Real-time search across posts by title, description, and tags
- ✅ **Responsive Design** - Mobile-first design with Tailwind CSS
- ✅ **Accessibility** - WCAG compliant with proper ARIA labels and semantic HTML
- ✅ **SEO Optimized** - Meta tags, structured data, and proper heading hierarchy
- ✅ **Modern UI** - Clean, modern design inspired by the Dribbble reference

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Data Fetching**: React Query (TanStack Query)
- **Data**: Local mock data (easily replaceable with any API)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bloge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── posts/
│       └── [id]/
│           ├── page.tsx   # Individual post page
│           └── not-found.tsx
├── components/            # Reusable components
│   ├── Providers.tsx     # React Query provider
│   ├── SearchBar.tsx     # Search functionality
│   └── PostCard.tsx      # Post card component
└── lib/                  # Utilities and API
    ├── api.ts           # API functions and mock data
    └── queryClient.ts   # React Query configuration
```

## Data Configuration

The application currently uses local mock data for demonstration. To use your own API:

1. Update the `fetchPosts` and `fetchPost` functions in `src/lib/api.ts`
2. Ensure your API returns data in the expected format:

```typescript
interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  tags?: string[];
}
```

### Example API Integration

```typescript
// Replace the mock data with your API calls
export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://your-api.com/posts');
  return response.json();
}

export async function fetchPost(id: string): Promise<Post | null> {
  const response = await fetch(`https://your-api.com/posts/${id}`);
  return response.json();
}
```

## Features in Detail

### Server-Side Rendering
- Homepage data is pre-fetched on the server
- Individual post pages use React Query for client-side data fetching
- Proper error handling and loading states

### Search Functionality
- Real-time search as you type
- Searches across post titles, descriptions, and tags
- Responsive search results with proper accessibility

### Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly interactions

### Accessibility
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## Deployment

The application can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables

No environment variables are required for the demo, but you may want to add:

```env
NEXT_PUBLIC_API_URL=your-api-url
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Design inspiration from [Dribbble](https://dribbble.com/shots/23491039-Blog-page-UI-design-Beyond-UI)
- Built with Next.js, React Query, and Tailwind CSS
