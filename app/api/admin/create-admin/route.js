// app/api/admin/create-admin/route.js
export const dynamic = "force-dynamic";
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();

    // Check if there's already an admin user
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return new Response(JSON.stringify({ message: 'Admin user already exists' }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@printsquare.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();

    return new Response(JSON.stringify({ message: 'Admin user created successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Create admin error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}