import { NextRequest, NextResponse } from 'next/server';
import { fetchPosts } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');

    // Fetch posts from our data source
    const posts = await fetchPosts();

    // Apply search filter if provided
    let filteredPosts = posts;
    if (search) {
      filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        (post.tags && post.tags.some(tag => 
          tag.toLowerCase().includes(search.toLowerCase())
        ))
      );
    }

    // Apply pagination if provided
    if (limit && page) {
      const limitNum = parseInt(limit);
      const pageNum = parseInt(page);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      filteredPosts = filteredPosts.slice(startIndex, endIndex);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: filteredPosts,
      total: posts.length,
      filtered: filteredPosts.length,
      pagination: {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : posts.length,
        totalPages: limit ? Math.ceil(posts.length / parseInt(limit)) : 1
      }
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch posts',
      message: 'Internal server error'
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

// Handle other HTTP methods
export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    message: 'Only GET requests are supported for this endpoint'
  }, {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    message: 'Only GET requests are supported for this endpoint'
  }, {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    message: 'Only GET requests are supported for this endpoint'
  }, {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    }
  });
} 