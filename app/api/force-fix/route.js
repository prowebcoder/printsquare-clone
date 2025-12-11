export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Page from '@/models/Page';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { slug } = await request.json();
    
    // Delete the existing page
    await Page.deleteOne({ slug: slug });
    console.log('🗑️ Deleted old page:', slug);
    
    // Create a new page with proper structure
    const newPage = new Page({
      title: slug === 'about' ? 'About Us' : 'New Page',
      slug: slug,
      published: true,
      components: [
        {
          type: 'aboutHero',
          id: `comp-${Date.now()}-0`,
          content: {
            title: 'About',
            highlightedTitle: 'Us',
            subtitle: 'Precision. Passion. Printing Excellence from South Korea.',
            backgroundImage: '/about/about-banner.jpg'
          },
          order: 0
        },
        {
          type: 'aboutUs',
          id: `comp-${Date.now()}-1`,
          content: {
            title: 'About Print Seoul',
            description1: 'Print Seoul is a leading publication printer based in South Korea.',
            description2: 'With a perfect blend of traditional craftsmanship and modern printing technology.',
            buttonText: 'Get a Quote',
            buttonLink: '/quote',
            image: '/about/About.jpg',
            quote: 'Precision in every print — from Seoul to the world.'
          },
          order: 1
        }
      ]
    });
    
    await newPage.save();
    console.log('✅ Created new page with components:', newPage.components.length);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: `Page ${slug} has been completely reset and fixed`,
      pageId: newPage._id,
      componentsCount: newPage.components.length
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('❌ Force fix error:', error);
    return new Response(JSON.stringify({ 
      error: 'Force fix failed',
      details: error.message 
    }), { status: 500 });
  }
}