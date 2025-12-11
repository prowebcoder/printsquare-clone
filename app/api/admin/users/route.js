// printsquare-clone/app/api/admin/users/route.js

export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    console.log('👥 Fetching users from database...');
    
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    console.log(`✅ Found ${users.length} users`);
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, email, password, role } = body;

    console.log('📝 Creating new user:', { name, email, role });

    // Check if user with same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      email,
      password, // Make sure to hash this in the model
      role: role || 'user'
    });

    await user.save();
    console.log('✅ User created successfully:', user._id);

    // Return user without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json({ 
      success: true, 
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('❌ Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}