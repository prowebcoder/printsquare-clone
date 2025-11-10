import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add authentication logic here if needed
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};