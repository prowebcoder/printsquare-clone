export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Page from '@/models/Page';

export async function POST() {
  try {
    await dbConnect();
    
    // Find the about page
    const aboutPage = await Page.findOne({ slug: 'about' });
    
    if (!aboutPage) {
      return new Response(JSON.stringify({ error: 'About page not found' }), {
        status: 404,
      });
    }

    console.log('🔧 Fixing about page:', aboutPage._id);
    
    // Add some default components if none exist
    if (!aboutPage.components || aboutPage.components.length === 0) {
      aboutPage.components = [
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
            description1: 'Print Seoul is a leading publication printer based in South Korea, specializing in premium-quality printing for books, magazines, catalogs, and corporate publications.',
            description2: 'With a perfect blend of traditional craftsmanship and modern printing technology, we bring creativity to life through precision and quality.',
            description3: 'Whether you need small-batch art books or large-scale commercial runs, Print Seoul ensures consistent quality, timely delivery, and eco-conscious production.',
            description4: 'Our mission is to make South Korean printing excellence accessible worldwide.',
            buttonText: 'Get a Quote',
            buttonLink: '/quote',
            image: '/about/About.jpg',
            quote: 'Precision in every print — from Seoul to the world.'
          },
          order: 1
        }
      ];
      
      await aboutPage.save();
      console.log('✅ Added default components to about page');
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'About page fixed',
      componentsAdded: aboutPage.components.length
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('❌ Fix error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fix page',
      details: error.message 
    }), { status: 500 });
  }
}