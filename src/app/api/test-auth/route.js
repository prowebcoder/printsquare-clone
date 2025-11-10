// app/api/test-auth/route.js
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();
    console.log('✅ Database connected for test-auth');
    
    const { email, password } = await request.json();
    console.log('🔍 Testing auth for:', email);

    // Find user
    const user = await User.findOne({ email });
    console.log('👤 User found:', user ? user.email : 'No user found');

    if (!user) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'User not found',
        userFound: false
      }), { status: 200 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Password valid:', isPasswordValid);

    return new Response(JSON.stringify({
      success: true,
      userFound: true,
      passwordValid: isPasswordValid,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash: user.password.substring(0, 20) + '...' // For debugging
      }
    }), { status: 200 });
    
  } catch (error) {
    console.error('❌ Test auth error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { status: 500 });
  }
}