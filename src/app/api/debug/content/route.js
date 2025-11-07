//src/app/api/debug/content/route.js


import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

export async function GET() {
  try {
    await dbConnect();
    
    const allContent = await PageContent.find({});
    console.log('All content in database:', allContent);
    
    return NextResponse.json({ 
      success: true, 
      content: allContent,
      count: allContent.length 
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}