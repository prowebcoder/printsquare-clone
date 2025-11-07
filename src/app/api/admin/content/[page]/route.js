import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';
import { isAuthenticated } from '@/lib/auth';

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

export async function POST(request, { params }) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // In Next.js 14, params is an object, not a promise
    const { page } = params;
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const contentData = await request.json();
    
    // Update or create section
    const section = await PageContent.findOneAndUpdate(
      { page, sectionId: contentData.sectionId },
      { 
        ...contentData,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, section });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}