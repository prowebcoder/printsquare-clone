import dbConnect from '@/lib/db';
import Page from '@/models/Page';

export async function GET() {
  try {
    await dbConnect();
    
    const pages = await Page.find({});
    console.log('📄 All pages in database:', pages.length);
    
    const pagesWithDetails = pages.map(page => ({
      _id: page._id,
      title: page.title,
      slug: page.slug,
      published: page.published,
      componentsCount: page.components?.length || 0,
      components: page.components?.map(comp => ({
        type: comp.type,
        id: comp.id,
        contentKeys: Object.keys(comp.content || {})
      }))
    }));

    return new Response(JSON.stringify(pagesWithDetails), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('❌ Debug error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}