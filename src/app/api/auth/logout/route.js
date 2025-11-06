import { NextResponse } from 'next/server';

export async function POST() {
  console.log('🚪 Logout requested');
  
  const response = NextResponse.json({ 
    message: 'Logout successful',
    timestamp: new Date().toISOString()
  });

  // Clear the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });

  console.log('✅ Token cookie cleared');
  
  return response;
}

// Also allow GET for easy testing
export async function GET() {
  const response = NextResponse.json({ 
    message: 'Logout successful via GET',
    timestamp: new Date().toISOString()
  });

  response.cookies.set('token', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });

  return response;
}