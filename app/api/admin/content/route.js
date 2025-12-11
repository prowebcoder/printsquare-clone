// app/api/admin/content/route.js
export const dynamic = "force-dynamic";

import dbConnect from '@/lib/mongodb';
import Page from '@/models/Page';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('page') || 'home';
    
    // Find the page by slug
    const page = await Page.findOne({ slug: pageSlug });
    
    if (!page) {
      return new Response(JSON.stringify({ 
        message: 'Page not found',
        sections: []
      }), { status: 404 });
    }
    
    // Return the page components as sections
    const sections = page.components.map(comp => ({
      sectionId: comp.type,
      content: comp.content,
      order: comp.order
    }));
    
    return new Response(JSON.stringify({
      page: page.title,
      sections: sections
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Content fetch error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch content',
      details: error.message 
    }), { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('page') || 'home';
    const body = await request.json();
    
    // Find and update the page
    const page = await Page.findOne({ slug: pageSlug });
    
    if (!page) {
      return new Response(JSON.stringify({ 
        error: 'Page not found' 
      }), { status: 404 });
    }
    
    // Update the specific component
    const componentIndex = page.components.findIndex(comp => comp.type === body.sectionId);
    
    if (componentIndex === -1) {
      return new Response(JSON.stringify({ 
        error: 'Section not found' 
      }), { status: 404 });
    }
    
    // Update component content
    page.components[componentIndex].content = {
      ...page.components[componentIndex].content,
      ...body.updates
    };
    
    await page.save();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Content updated successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Content update error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update content',
      details: error.message 
    }), { status: 500 });
  }
}