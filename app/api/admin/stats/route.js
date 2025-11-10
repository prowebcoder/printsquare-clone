// app/api/admin/stats/route.js
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import Page from '@/models/Page';
import Media from '@/models/Media';

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    
    const usersCount = await User.countDocuments();
    const pagesCount = await Page.countDocuments();
    const mediaCount = await Media.countDocuments();
    
    // Mock page views for now
    const pageViews = Math.floor(Math.random() * 1000) + 500;

    return new Response(JSON.stringify({
      users: usersCount,
      pages: pagesCount,
      media: mediaCount,
      pageViews: pageViews,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}