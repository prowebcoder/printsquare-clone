// app/api/admin/auth/verify/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from "@/lib/mongodb";

import User from '@/models/User';

export async function GET(request) {
  try {
    await dbConnect();

    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 });
      }

      return NextResponse.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (jwtError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}