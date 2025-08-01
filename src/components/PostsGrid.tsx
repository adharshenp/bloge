'use client';

import { useState } from 'react';
import { PostCard } from './PostCard';
import { Post } from '@/lib/api';

interface PostsGridProps {
  posts: Post[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.tags && post.tags.some(tag => 
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full"></div>
            <svg
              className="absolute inset-0 w-full h-full text-gray-300 p-6"
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
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          {searchQuery ? 'No articles found' : 'No articles available'}
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {searchQuery 
            ? 'Try adjusting your search terms or browse all articles below.' 
            : 'Check back later for new content and exciting articles.'
          }
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, description, or tags..."
            aria-label="Search blog posts"
            className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-700 rounded-full shadow-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold">
            {searchQuery 
              ? `Found ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} for "${searchQuery}"`
              : `Showing ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'}`
            }
          </span>
        </div>
      </div>
      
      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPosts.map((post: Post, index: number) => (
          <div
            key={post.id}
            className="transform hover:scale-[1.02] transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PostCard post={post} index={index} />
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      {!searchQuery && filteredPosts.length > 0 && (
        <div className="text-center pt-12">
          <button className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
} 