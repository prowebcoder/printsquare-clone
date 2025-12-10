// app/api/admin/auth/login/route.js
import { dbConnect } from "@/lib/mongodb";
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ 
        message: 'Email and password are required' 
      }), { status: 400 });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ 
        message: 'Invalid email or password' 
      }), { status: 401 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ 
        message: 'Invalid email or password' 
      }), { status: 401 });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return new Response(JSON.stringify({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ 
      message: 'Internal server error',
      error: error.message 
    }), { status: 500 });
  }
}