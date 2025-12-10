// app/api/admin/pages/[id]/set-homepage/route.js
import { NextResponse } from 'next/server';
import Page from '@/models/Page';
import dbConnect from "@/lib/mongodb";

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('🏠 Setting page as homepage:', id);
    
    // Get the page
    const page = await Page.findById(id);
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Clear any existing homepage
    await Page.updateMany(
      { _id: { $ne: id }, isHomepage: true },
      { $set: { isHomepage: false } }
    );

    // Set this page as homepage
    page.isHomepage = true;
    page.slug = ''; // Homepage has empty slug
    await page.save();

    console.log('✅ Page set as homepage:', page.title);

    return NextResponse.json({ 
      success: true, 
      message: 'Page set as homepage successfully',
      page 
    });

  } catch (error) {
    console.error('❌ Error setting homepage:', error);
    return NextResponse.json(
      { 
        error: 'Failed to set homepage', 
        details: error.message,
        validationErrors: error.errors 
      },
      { status: 500 }
    );
  }
}