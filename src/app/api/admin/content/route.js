import { NextResponse } from 'next/server';
import Content from '@/models/Content';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    const contents = await Content.find().sort({ pageName: 1 });
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const content = await Content.findOneAndUpdate(
      { pageId: data.pageId },
      data,
      { upsert: true, new: true }
    );
    
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}