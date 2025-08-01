import Link from 'next/link';
import { Post } from '@/lib/api';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <article className="group bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      {post.imageUrl && (
        <div className="relative overflow-hidden h-64">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/posts/${post.id}`} className="group">
          <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3 leading-snug">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {post.publishedAt && (
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            )}
            {post.author && <span>· {post.author}</span>}
          </div>

          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-all"
          >
            Read more
            <svg
              className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
