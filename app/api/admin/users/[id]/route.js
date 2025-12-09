// printsquare-clone/app/api/admin/users/[id]/route.js
import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/db';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('👤 Fetching user with ID:', id);
    
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      console.log('❌ User not found:', id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('✅ User found:', user.name);
    return NextResponse.json(user);

  } catch (error) {
    console.error('❌ Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('📝 Updating user with ID:', id);
    
    const body = await request.json();
    const { name, email, role, isActive } = body;

    console.log('📦 Update data:', { name, email, role, isActive });

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();
    console.log('✅ User updated successfully:', user._id);

    // Return user without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json({ 
      success: true, 
      message: 'User updated successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('❌ Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('🗑️ Deleting user with ID:', id);
    
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await User.findByIdAndDelete(id);
    console.log('✅ User deleted successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'User deleted successfully' 
    });

  } catch (error) {
    console.error('❌ Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user', details: error.message },
      { status: 500 }
    );
  }
}