// app/api/admin/pages/route.js
import { NextResponse } from 'next/server';
import Page from '@/models/Page';
import dbConnect from '@/lib/db';

export async function GET(request) {
  try {
    await dbConnect();
    console.log('📄 Fetching pages from database...');
    
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    let query = Page.find({}).sort({ updatedAt: -1 });
    
    // Apply limit if provided
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    const pages = await query.exec();
    console.log(`✅ Found ${pages.length} pages`);
    
    return NextResponse.json(pages);
  } catch (error) {
    console.error('❌ Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, slug, components, metaTitle, metaDescription, published } = body;

    console.log('📝 Creating new page:', { title, slug });

    // Check if page with same slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      );
    }

    const page = new Page({
      title,
      slug,
      components: components || [],
      metaTitle,
      metaDescription,
      published: published || false
    });

    await page.save();
    console.log('✅ Page created successfully:', page._id);

    return NextResponse.json({ 
      success: true, 
      message: 'Page created successfully',
      page 
    });

  } catch (error) {
    console.error('❌ Error creating page:', error);
    return NextResponse.json(
      { error: 'Failed to create page', details: error.message },
      { status: 500 }
    );
  }
}