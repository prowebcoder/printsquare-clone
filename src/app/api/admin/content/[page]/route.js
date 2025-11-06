import { NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/mongodb';
import PageContent from '../../../../../../models/PageContent';

import { isAuthenticated } from '../../../../../../lib/auth';
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { page } = params;
    
    const sections = await PageContent.find({ page });
    
    return NextResponse.json({ sections });
  } catch (error) {
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
    
    await dbConnect();
    const { page } = params;
    const contentData = await request.json();
    
    // Update or create section
    const section = await PageContent.findOneAndUpdate(
      { page, sectionId: contentData.sectionId },
      contentData,
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, section });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}