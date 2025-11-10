// app/api/admin/pages/route.js
import dbConnect from '@/lib/db';
import Page from '@/models/Page';

export async function GET() {
  try {
    await dbConnect();
    
    const pages = await Page.find({}).sort({ updatedAt: -1 });
    console.log('📖 Fetched pages:', pages.length);
    
    return new Response(JSON.stringify(pages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Pages fetch error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch pages',
      details: error.message 
    }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log('🆕 Creating page with data:', JSON.stringify(body, null, 2));

    const { title, slug, components = [], metaTitle, metaDescription, published = false } = body;

    // Validation
    if (!title || !slug) {
      return new Response(JSON.stringify({ error: 'Title and slug are required' }), {
        status: 400,
      });
    }

    // Generate clean slug
    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    console.log('🔧 Cleaned slug:', cleanSlug);

    // Check if slug exists
    const existingPage = await Page.findOne({ slug: cleanSlug });
    if (existingPage) {
      return new Response(JSON.stringify({ error: 'Slug already exists' }), {
        status: 400,
      });
    }

    // Process components to ensure they have proper structure
    const processedComponents = components.map((comp, index) => {
      console.log(`🔧 Processing component ${index}:`, comp.type, comp.content);
      
      // Ensure the component has all required fields
      const processedComp = {
        type: comp.type,
        id: comp.id || `comp-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        content: comp.content || {},
        order: comp.order || index
      };

      return processedComp;
    });

    console.log('✅ Processed components:', processedComponents.length);

    // Create page
    const page = new Page({
      title: title.trim(),
      slug: cleanSlug,
      components: processedComponents,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      published: Boolean(published),
    });

    const savedPage = await page.save();
    console.log('💾 Page created successfully:', savedPage._id);
    console.log('📊 Saved components:', savedPage.components.length);

    return new Response(JSON.stringify({ 
      success: true, 
      page: savedPage 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Page creation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create page',
      details: error.message 
    }), { status: 500 });
  }
}