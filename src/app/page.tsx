'use client';

import { useEffect, useState, useMemo } from 'react';
import { fetchPosts } from '@/lib/api';
import { FeaturedPostCard } from '@/components/FeaturedPostcard';
import { SearchBar } from '@/components/SearchBar';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setAllPosts(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return allPosts;
    const term = searchTerm.toLowerCase();

    return allPosts.filter((post) => {
      const title = typeof post.title === 'string' ? post.title.toLowerCase() : '';
      const excerpt = typeof post.excerpt === 'string' ? post.excerpt.toLowerCase() : '';
      let tags: string[] = [];

      if (Array.isArray(post.tags)) {
        tags = post.tags
          .filter((tag: string) => typeof tag === 'string')
          .map((tag: string) => tag.toLowerCase());
      }

      return (
        title.includes(term) ||
        excerpt.includes(term) ||
        tags.some((tag) => tag.includes(term))
      );
    });
  }, [allPosts, searchTerm]);

  const featured = filteredPosts.slice(0, 1)[0];
  const others = filteredPosts.slice(1, 6);
  const recent = filteredPosts.slice(6);

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Search Bar */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {isLoading ? (
          <PostsLoading />
        ) : (
          <>
            {/* Featured Post */}
            {featured && <FeaturedPostCard post={featured} otherPosts={others} />}

            {/* Recent Posts */}
            <h2 className="text-2xl font-semibold mb-6 mt-16 justify-between">Recent Posts</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(recent.length > 0 ? recent : [...Array(6)]).map((post: any, index: number) => {
                const title = post?.title ?? `Dummy Post Title ${index + 1}`;
                const excerpt =
                  post?.excerpt ??
                  `it is the most important...... ${index + 1}.`;
                const slug = post?.slug ?? '#';
                const image =
                 "https://www.techtarget.com/rms/onlineimages/what_is_a_blog_used_for-f_mobile.png";

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-52 object-cover rounded-t-2xl"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-3">{excerpt}</p>
                      <h5
                        
                        className="inline-block text-blue-600 hover:underline font-medium text-sm"
                      >
                      michael      .  4 min Read 
                      </h5> 
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

// Skeleton Loader
function PostsLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse"
        >
          <div className="aspect-[4/3] bg-gray-200 rounded-t-2xl shimmer"></div>
          <div className="p-8">
            <div className="h-6 bg-gray-200 rounded mb-3 shimmer"></div>
            <div className="h-6 bg-gray-200 rounded mb-3 w-3/4 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 shimmer"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded shimmer"></div>
              <div className="h-4 bg-gray-200 rounded shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
