import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of routes that require CSRF protection
const protectedRoutes = [
  '/api/subscriptions',
  '/api/users',
  '/api/auth/logout',
  // Add other routes that modify data
];

// List of routes that require authentication
const authRequiredRoutes = [
  '/dashboard',
  '/subscription',
  '/api/subscriptions',
  // Add other routes that require authentication
];

// List of admin-only routes
const adminRoutes = [
  '/admin',
  '/api/admin',
  // Add other admin routes
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Check for CSRF protection on data-modifying routes
  if (
    protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) &&
    ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)
  ) {
    const csrfToken = request.cookies.get('csrf_token')?.value;
    const headerToken = request.headers.get('X-CSRF-Token');
    
    if (!csrfToken || !headerToken || csrfToken !== headerToken) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
  }
  
  // Check authentication for protected routes
  if (authRequiredRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    const userId = request.cookies.get('user_id')?.value;
    
    if (!userId) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  
  // Check admin authorization
  if (adminRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    // This would need to be expanded to check the user's role from the database
    // For now, we'll use a simple check based on the URL
    const userId = request.cookies.get('user_id')?.value;
    
    if (!userId) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // In a real implementation, you would check the user's role here
    // For now, we'll just let it pass and handle the check in the API routes
  }
  
  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/subscription/:path*',
    '/admin/:path*',
    '/api/:path*',
  ],
};