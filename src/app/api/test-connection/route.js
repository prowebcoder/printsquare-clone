// app/api/test-connection/route.js
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    // Test if we can query users
    const userCount = await User.countDocuments();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Database connected successfully',
      userCount,
      connection: 'Online MongoDB'
    }), { status: 200 });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      connection: 'Failed to connect to MongoDB'
    }), { status: 500 });
  }
}