// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = sessionStorage.get('authToken');

  // List of protected routes
  const protectedRoutes = ['/', '/profile', '/calendar'];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Continue with the request
  return NextResponse.next();
}

// Define which paths should use this middleware
export const config = {
  matcher: ['/',  '/profile', '/calendar/:path*'], // Add paths to be protected
};
