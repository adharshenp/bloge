'use client';

import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search posts..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12">
      <div className="relative group">
        {/* Background glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-opacity duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Search input container */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 group-hover:border-blue-300/50">
          <div className="flex items-center px-6 py-4">
            {/* Search icon */}
            <div className="flex-shrink-0 mr-4">
              <svg
                className={`h-6 w-6 transition-colors duration-200 ${
                  isFocused ? 'text-blue-600' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            {/* Input field */}
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              aria-label="Search blog posts"
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 text-lg font-medium focus:outline-none focus:ring-0 focus:placeholder-gray-400 transition-colors duration-200"
            />
            
            {/* Clear button */}
            {value && (
              <button
                onClick={() => onChange('')}
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
      
      {/* Search suggestions */}
      {isFocused && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-strong z-10 animate-fade-in">
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Next.js', 'Web Development', 'Performance'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onChange(suggestion)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-all duration-200 hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 