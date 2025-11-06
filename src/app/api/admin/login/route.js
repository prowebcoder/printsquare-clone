import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    if (verifyCredentials(username, password)) {
      // Simple token-based auth
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      });
      
      // Set a simple cookie (in production, use secure HttpOnly cookies)
      response.cookies.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
      });
      
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}