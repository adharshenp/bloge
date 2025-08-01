export interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  tags?: string[];
}

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15',
    description: 'Learn how to build modern web applications with Next.js 15 and the App Router. Discover the latest features and best practices for server-side rendering.',
    content: `Next.js 15 introduces several exciting new features that make building modern web applications easier than ever. The App Router provides a more intuitive way to structure your application, while the new server components offer better performance and SEO.

In this comprehensive guide, we'll explore:
- Setting up a new Next.js 15 project
- Understanding the App Router structure
- Working with server and client components
- Implementing data fetching strategies
- Optimizing for performance and SEO

Whether you're new to Next.js or upgrading from a previous version, this guide will help you get up to speed with the latest features and best practices.`,
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    tags: ['Next.js', 'React', 'Web Development']
  },
  {
    id: '2',
    title: 'Mastering React Query for Data Fetching',
    description: 'Explore React Query (TanStack Query) and learn how to efficiently manage server state in your React applications with caching, synchronization, and background updates.',
    content: `React Query has revolutionized how we handle server state in React applications. It provides powerful features like automatic caching, background refetching, and optimistic updates that make building data-driven applications much easier.

Key benefits of React Query:
- Automatic caching and background updates
- Built-in loading and error states
- Optimistic updates for better UX
- Infinite queries for pagination
- Mutations with automatic cache invalidation

In this deep dive, we'll cover advanced patterns and real-world examples that will help you build more robust applications.`,
    author: 'Michael Chen',
    publishedAt: '2024-01-12T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['React Query', 'Data Fetching', 'State Management']
  },
  {
    id: '3',
    title: 'Building Accessible Web Applications',
    description: 'Learn the fundamentals of web accessibility and how to implement WCAG guidelines in your React applications to ensure they work for everyone.',
    content: `Web accessibility is not just a legal requirement—it's a fundamental aspect of good web development. By following WCAG guidelines, we can create applications that work for users with disabilities and provide a better experience for everyone.

Essential accessibility practices:
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader optimization

This guide will walk you through implementing these practices in React applications, with practical examples and testing strategies.`,
    author: 'Emily Rodriguez',
    publishedAt: '2024-01-10T09:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    tags: ['Accessibility', 'WCAG', 'React']
  },
  {
    id: '4',
    title: 'Advanced TypeScript Patterns for React',
    description: 'Discover advanced TypeScript patterns and techniques that will help you write more maintainable and type-safe React applications.',
    content: `TypeScript has become an essential tool for building large-scale React applications. By leveraging advanced patterns, we can create more maintainable codebases with better developer experience.

Advanced patterns we'll explore:
- Generic components and hooks
- Conditional types and mapped types
- Utility types for props and state
- Type guards and narrowing
- Advanced component patterns

These patterns will help you write more expressive and type-safe React code while improving the overall development experience.`,
    author: 'David Kim',
    publishedAt: '2024-01-08T16:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    tags: ['TypeScript', 'React', 'Advanced Patterns']
  },
  {
    id: '5',
    title: 'Performance Optimization in Modern React',
    description: 'Learn advanced techniques for optimizing React application performance, from code splitting to memoization and beyond.',
    content: `Performance optimization is crucial for providing a great user experience. Modern React applications can benefit from various optimization techniques that improve loading times and runtime performance.

Key optimization strategies:
- Code splitting and lazy loading
- React.memo and useMemo optimization
- Virtual scrolling for large lists
- Bundle analysis and optimization
- Server-side rendering strategies

This comprehensive guide will help you identify performance bottlenecks and implement effective solutions.`,
    author: 'Lisa Wang',
    publishedAt: '2024-01-05T11:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tags: ['Performance', 'React', 'Optimization']
  },
  {
    id: '6',
    title: 'State Management with Zustand',
    description: 'Explore Zustand, a lightweight state management solution that offers simplicity and performance for React applications.',
    content: `Zustand has gained popularity as a lightweight alternative to Redux and other state management libraries. Its simple API and excellent TypeScript support make it an attractive choice for many React applications.

Why Zustand?
- Minimal boilerplate code
- Excellent TypeScript support
- Built-in devtools
- Easy testing and debugging
- Flexible architecture

We'll explore how to integrate Zustand into your React applications and compare it with other state management solutions.`,
    author: 'Alex Thompson',
    publishedAt: '2024-01-03T13:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
    tags: ['State Management', 'Zustand', 'React']
  }
];

export async function fetchPosts(): Promise<Post[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return mockPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPost(id: string): Promise<Post | null> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find post by ID
    const post = mockPosts.find(p => p.id === id);
    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
} 