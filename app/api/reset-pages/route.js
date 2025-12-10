import { dbConnect } from "@/lib/mongodb";
import Page from '@/models/Page';

export async function POST() {
  try {
    await dbConnect();
    
    // Delete all pages
    await Page.deleteMany({});
    
    // Create a new about page with components
    const aboutPage = new Page({
      title: 'About Us',
      slug: 'about',
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
        }
      ]
    });
    
    await aboutPage.save();
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Database reset and sample about page created'
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('Reset error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}