import dbConnect from '@/lib/db';
import Page from '@/models/Page';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    console.log('🔍 Fetching page with ID:', params.id);
    
    const page = await Page.findById(params.id);
    
    if (!page) {
      return new Response(JSON.stringify({ error: 'Page not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(page), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Page fetch error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch page',
      details: error.message 
    }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    
    console.log('🔄 UPDATE REQUEST for page:', params.id);
    console.log('📦 Received data:', {
      title: body.title,
      slug: body.slug,
      componentsCount: body.components?.length,
      hasComponents: !!body.components
    });

    // Validate required fields
    if (!body.title || !body.slug) {
      return new Response(JSON.stringify({ 
        error: 'Title and slug are required' 
      }), { status: 400 });
    }

    // Find the existing page
    const existingPage = await Page.findById(params.id);
    if (!existingPage) {
      return new Response(JSON.stringify({ 
        error: 'Page not found' 
      }), { status: 404 });
    }

    // Check for slug conflict with other pages
    if (body.slug !== existingPage.slug) {
      const slugExists = await Page.findOne({ 
        slug: body.slug, 
        _id: { $ne: params.id } 
      });
      if (slugExists) {
        return new Response(JSON.stringify({ 
          error: 'Slug already exists' 
        }), { status: 400 });
      }
    }

    // Process components to ensure they have proper structure
    const processedComponents = (body.components || []).map((comp, index) => {
      return {
        type: comp.type || 'text',
        id: comp.id || `comp-${Date.now()}-${index}`,
        content: comp.content || {},
        order: comp.order || index
      };
    });

    console.log('✅ Processed components:', processedComponents.length);
    processedComponents.forEach((comp, idx) => {
      console.log(`   ${idx + 1}. ${comp.type} - ${comp.id}`);
    });

    // Update the page
    const updatedPage = await Page.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        slug: body.slug,
        components: processedComponents,
        metaTitle: body.metaTitle || body.title,
        metaDescription: body.metaDescription || '',
        published: body.published !== undefined ? body.published : existingPage.published
      },
      { 
        new: true, // Return updated document
        runValidators: true 
      }
    );

    if (!updatedPage) {
      return new Response(JSON.stringify({ 
        error: 'Failed to update page' 
      }), { status: 500 });
    }

    console.log('💾 Page updated successfully! Components:', updatedPage.components.length);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Page updated successfully',
      page: updatedPage
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ UPDATE ERROR:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update page',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const page = await Page.findByIdAndDelete(params.id);
    
    if (!page) {
      return new Response(JSON.stringify({ error: 'Page not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Page deleted successfully' 
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to delete page'
    }), { status: 500 });
  }
}