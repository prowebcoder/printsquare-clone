// app/api/admin/pages/[id]/route.js
import { NextResponse } from 'next/server';
import Page from '@/models/Page';
import dbConnect from '@/lib/db';

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
    const { title, slug, components, metaTitle, metaDescription, published, isHomepage } = body;

    console.log('📦 Update data:', { 
      title, 
      slug, 
      isHomepage,
      componentsCount: components?.length 
    });

    // Find the page
    const page = await Page.findById(id);
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Handle homepage logic
    if (isHomepage === true) {
      console.log('🏠 Setting page as homepage');
      
      // Clear any existing homepage first
      await Page.updateMany(
        { _id: { $ne: id }, isHomepage: true },
        { $set: { isHomepage: false } }
      );
      
      // Update this page
      page.title = title;
      page.isHomepage = true;
      page.slug = ''; // Homepage has empty slug
      page.components = components || [];
      page.metaTitle = metaTitle;
      page.metaDescription = metaDescription;
      page.published = published;
    } else {
      // Regular page update
      page.title = title;
      page.isHomepage = false;
      page.slug = slug;
      page.components = components || [];
      page.metaTitle = metaTitle;
      page.metaDescription = metaDescription;
      page.published = published;
    }

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
      { 
        error: 'Failed to update page', 
        details: error.message,
        validationErrors: error.errors 
      },
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

    // Don't delete if it's the homepage
    if (page.isHomepage) {
      return NextResponse.json(
        { error: 'Cannot delete the homepage. Set another page as homepage first.' },
        { status: 400 }
      );
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