// printsquare-clone/app/api/admin/pages/[id]/route.js
import { NextResponse } from 'next/server';
import Page from '@/models/Page';
import dbConnect from '@/lib/mongodb';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('📄 Fetching page with ID:', id);
    
    const page = await Page.findById(id);
    
    if (!page) {
      console.log('❌ Page not found:', id);
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    console.log('✅ Page found:', page.title);
    return NextResponse.json(page);

  } catch (error) {
    console.error('❌ Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('📝 Updating page with ID:', id);
    
    const body = await request.json();
    const { title, slug, components, metaTitle, metaDescription, published } = body;

    console.log('📦 Update data:', { title, slug, componentsCount: components?.length });

    const page = await Page.findById(id);
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Update page fields
    page.title = title;
    page.slug = slug;
    page.components = components || [];
    page.metaTitle = metaTitle;
    page.metaDescription = metaDescription;
    page.published = published;

    await page.save();
    console.log('✅ Page updated successfully:', page._id);

    return NextResponse.json({ 
      success: true, 
      message: 'Page updated successfully',
      page 
    });

  } catch (error) {
    console.error('❌ Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('🗑️ Deleting page with ID:', id);
    
    const page = await Page.findById(id);
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    await Page.findByIdAndDelete(id);
    console.log('✅ Page deleted successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Page deleted successfully' 
    });

  } catch (error) {
    console.error('❌ Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page', details: error.message },
      { status: 500 }
    );
  }
}