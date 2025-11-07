import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

export async function GET(request, { params }) {
  try {
    // In Next.js 14, params is an object, not a promise
    const { page } = params;
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    const sections = await PageContent.find({ page });
    
    // Convert to object for easier access
    const contentMap = {};
    sections.forEach(section => {
      contentMap[section.sectionId] = section;
    });
    
    return NextResponse.json({ content: contentMap });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}