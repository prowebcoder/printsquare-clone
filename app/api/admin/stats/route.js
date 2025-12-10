// printsquare-clone/app/api/admin/stats/route.js
import { NextResponse } from 'next/server';
import User from '@/models/User';
import Page from '@/models/Page';
import Media from '@/models/Media';
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    
    // Get counts from all collections
    const [usersCount, pagesCount, mediaCount] = await Promise.all([
      User.countDocuments(),
      Page.countDocuments(),
      Media.countDocuments()
    ]);

    // For page views, you might want to track this separately
    // For now, we'll use a placeholder
    const pageViews = 0;

    const stats = {
      users: usersCount,
      pages: pagesCount,
      media: mediaCount,
      pageViews: pageViews
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error.message },
      { status: 500 }
    );
  }
}