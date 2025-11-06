import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '08001c2e49654a2db0df3b4d1384c6b4';

export function middleware(request) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the token
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};