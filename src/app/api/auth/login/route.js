import { NextResponse } from 'next/server';
import { localAuthLogin, setAuthToken } from '@/lib/auth-local';

export async function POST(request) {
  try {
    console.log('🔐 Login API called');
    
    const { email, password } = await request.json();
    console.log('📧 Login attempt for:', email);

    // Use local authentication
    const result = await localAuthLogin(email, password);

    if (result.error) {
      console.log('❌ Login failed:', result.error);
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    console.log('✅ Login successful for:', result.user.email);

    // Return both user data and token
    return NextResponse.json({
      message: 'Login successful',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}