import { NextResponse } from 'next/server';
import { localAuthCheck } from '@/lib/auth-local';

export async function GET(request) {
  try {
    console.log('🔍 Auth check started...');

    // Try to get token from localStorage via query parameter
    const url = new URL(request.url);
    const tokenFromQuery = url.searchParams.get('token');
    
    // Use localStorage authentication check
    const result = await localAuthCheck(tokenFromQuery);

    if (result.error) {
      console.log('❌ Auth check failed:', result.error);
      return NextResponse.json(
        { error: result.error, code: 'AUTH_FAILED' },
        { status: 401 }
      );
    }

    console.log('✅ Auth check successful for:', result.user.email);
    
    return NextResponse.json(result.user);
  } catch (error) {
    console.error('❌ Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}