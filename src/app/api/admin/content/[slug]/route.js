import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Page from '@/models/Page';

export async function GET(req, { params }) {
  try {
    // Properly await the params
    const { slug } = await params;
    
    if (!slug || slug === 'null') {
      return NextResponse.json(
        { error: 'Invalid slug parameter' }, 
        { status: 400 }
      );
    }
    
    await dbConnect();
    const page = await Page.findOne({ slug });

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' }, 
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { slug } = await params;
    
    if (!slug || slug === 'null') {
      return NextResponse.json(
        { error: 'Invalid slug parameter' }, 
        { status: 400 }
      );
    }
    
    await dbConnect();
    const body = await req.json();

    const page = await Page.findOneAndUpdate(
      { slug },
      { 
        ...body, 
        lastUpdated: new Date() 
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;
    
    if (!slug || slug === 'null') {
      return NextResponse.json(
        { error: 'Invalid slug parameter' }, 
        { status: 400 }
      );
    }
    
    await dbConnect();
    const page = await Page.findOneAndDelete({ slug });

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' }, 
      { status: 500 }
    );
  }
}