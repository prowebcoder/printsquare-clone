// app/api/admin/setup/route.js
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@printsquare.com' });
    
    if (existingAdmin) {
      return new Response(JSON.stringify({ 
        message: 'Admin user already exists',
        email: 'admin@printsquare.com'
      }), { status: 200 });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@printsquare.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();

    return new Response(JSON.stringify({
      message: 'Admin user created successfully!',
      email: 'admin@printsquare.com',
      password: 'admin123',
      note: 'Please change this password after first login'
    }), { status: 201 });

  } catch (error) {
    console.error('Setup error:', error);
    return new Response(JSON.stringify({ 
      message: 'Error creating admin user',
      error: error.message 
    }), { status: 500 });
  }
}