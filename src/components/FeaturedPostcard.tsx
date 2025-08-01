import Link from 'next/link';
import { Post } from '@/lib/api';

interface FeaturedPostCardProps {
  post: Post;
  otherPosts?: Post[];
}

export function FeaturedPostCard({ post, otherPosts = [] }: FeaturedPostCardProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Featured Post */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-md col-span-2">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
          {post.tags && post.tags.length > 0 && (
            <span className="inline-block bg-white/10 border border-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm mb-3">
              {post.tags[0]}
            </span>
          )}
          <Link href={`/posts/${post.id}`}>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight hover:text-blue-300 transition-colors">
              {post.title}
            </h1>
          </Link>
        </div>
      </div>

      {/* Other Featured Posts */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Other featured posts</h3>
        <ul className="space-y-4">
          {otherPosts.slice(0, 5).map((p) => (
            <li key={p.id} className="flex items-center gap-4 hover:bg-gray-100 rounded-xl p-2 transition">
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-16 h-16 object-cover rounded-xl"
                />
              )}
              <Link href={`/posts/${p.id}`} className="text-sm text-gray-800 font-medium hover:underline">
                {p.title.length > 60 ? p.title.slice(0, 57) + '...' : p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
