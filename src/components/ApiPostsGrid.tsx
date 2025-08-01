'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostCard } from './PostCard';
import { Post } from '@/lib/api';

interface ApiPostsGridProps {
  initialPosts?: Post[];
}

// API functions that use our Next.js API routes
async function fetchPostsFromApi(search?: string, page?: number, limit?: number) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());

  const response = await fetch(`/api/posts?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const data = await response.json();
  return data;
}

export function ApiPostsGrid({ initialPosts }: ApiPostsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['api-posts', searchQuery, page, limit],
    queryFn: () => fetchPostsFromApi(searchQuery, page, limit),
    initialData: initialPosts ? {
      success: true,
      data: initialPosts,
      total: initialPosts.length,
      filtered: initialPosts.length,
      pagination: {
        page: 1,
        limit: initialPosts.length,
        totalPages: 1
      }
    } : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const posts = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">
          Unable to load blog posts. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          
          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 group-hover:border-blue-300/50">
            <div className="flex items-center px-6 py-4">
              <div className="flex-shrink-0 mr-4">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1); // Reset to first page when searching
                }}
                placeholder="Search posts by title, description, or tags..."
                aria-label="Search blog posts"
                className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 text-lg font-medium focus:outline-none focus:ring-0 focus:placeholder-gray-400 transition-colors duration-200"
              />
              
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPage(1);
                  }}
                  className="flex-shrink-0 ml-4 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-gray-200/50">
          <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {searchQuery 
              ? `Found ${data?.filtered || 0} post${data?.filtered === 1 ? '' : 's'} for "${searchQuery}"`
              : `Showing ${data?.filtered || 0} post${data?.filtered === 1 ? '' : 's'}`
            }
          </span>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-t-2xl shimmer"></div>
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
      )}

      {/* Posts grid */}
      {!isLoading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post, index: number) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && posts.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-8">
            <svg
              className="mx-auto h-20 w-20 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {searchQuery ? 'No posts found' : 'No posts available'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchQuery 
              ? 'Try adjusting your search terms or browse all posts below.' 
              : 'Check back later for new content and exciting articles.'
            }
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setPage(1);
              }}
              className="btn-secondary"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 