import { NextRequest, NextResponse } from 'next/server';
import { fetchPost } from '@/lib/api';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Validate ID parameter
    if (!id || typeof id !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Invalid post ID',
        message: 'Post ID is required and must be a string'
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    // Fetch the specific post
    const post = await fetchPost(id);

    // Check if post exists
    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Post not found',
        message: `Post with ID ${id} does not exist`
      }, {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: post
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch post',
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