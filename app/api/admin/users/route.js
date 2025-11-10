// app/api/admin/users/route.js
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}