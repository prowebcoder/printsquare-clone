import dbConnect from '@/lib/db';
import Page from '@/models/Page';

export async function GET() {
  try {
    await dbConnect();
    
    // Check if about page exists and its components
    const aboutPage = await Page.findOne({ slug: 'about' });
    
    return new Response(JSON.stringify({
      aboutPageExists: !!aboutPage,
      aboutPageId: aboutPage?._id,
      aboutPageComponents: aboutPage?.components || [],
      aboutPageComponentsCount: aboutPage?.components?.length || 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}