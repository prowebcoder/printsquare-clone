import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

// Import all renderers
import * as Renderers from './components/renderers';

async function getPageData(slug) {
  try {
    await dbConnect();
    
    const pageSlug = Array.isArray(slug) ? slug.join('/') : slug;
    console.log('🔍 Looking for page with slug:', pageSlug);
    
    const page = await Page.findOne({ 
      slug: pageSlug,
      published: true 
    });
    
    console.log('📄 Page found:', page ? 'Yes' : 'No');
    if (page) {
      console.log('📊 Page components:', page.components);
      console.log('🔢 Components count:', page.components?.length || 0);
      
      page.components?.forEach((comp, index) => {
        console.log(`📦 Component ${index}:`, {
          type: comp.type,
          id: comp.id,
          order: comp.order,
          contentKeys: Object.keys(comp.content || {})
        });
      });
    }
    
    return page;
  } catch (error) {
    console.error('❌ Error fetching page:', error);
    return null;
  }
}

// Component mapping
const componentMap = {
  // Basic Components
  'text': Renderers.TextRenderer,
  'heading': Renderers.HeadingRenderer,
  'hero': Renderers.HeroRenderer,
  'image': Renderers.ImageRenderer,
  'form': Renderers.FormRenderer,
  
  // Premium Components
  'aboutHero': Renderers.AboutHeroRenderer,
  'aboutUs': Renderers.AboutUsRenderer,
  'freeSample': Renderers.FreeSampleRenderer,
  'heroBanner': Renderers.HeroBannerRenderer,
  'imageBanner': Renderers.ImageBannerRenderer,
  'multiColumn': Renderers.MultiColumnRenderer,
  'weightConverter': Renderers.WeightConverterRenderer,
  'multiTable': Renderers.MultiTableRenderer,
  'imageBannerTwo': Renderers.ImageBannerTwoRenderer,
  'method': Renderers.MethodRenderer,
  'notice': Renderers.NoticeRenderer,
  'orderProcess': Renderers.OrderProcessRenderer,
  'portfolio': Renderers.PortfolioRenderer,
  'pricing': Renderers.PricingRenderer,
  'quickGuides': Renderers.QuickGuidesRenderer,
  'videoBanner': Renderers.VideoBannerRenderer,
};

function renderComponent(component, index) {
  console.log(`🔄 Rendering component ${index}:`, component.type, component.id, component.content);
  
  try {
    const RendererComponent = componentMap[component.type];
    
    if (RendererComponent) {
      return <RendererComponent key={component.id || index} component={component} index={index} />;
    } else {
      console.warn(`❌ Unknown component type: ${component.type}`);
      return (
        <div key={component.id || index} className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg my-4">
          <p className="text-yellow-800 font-semibold">Unsupported Component: {component.type}</p>
          <pre className="text-xs mt-2 overflow-auto">
            {JSON.stringify(component.content, null, 2)}
          </pre>
        </div>
      );
    }
  } catch (error) {
    console.error(`❌ Error rendering component ${component.type}:`, error);
    return (
      <div key={component.id || index} className="p-6 bg-red-50 border border-red-200 rounded-lg my-4">
        <p className="text-red-800 font-semibold">Error rendering: {component.type}</p>
        <p className="text-red-600 text-sm">{error.message}</p>
      </div>
    );
  }
}

export default async function DynamicPage({ params }) {
  const { slug } = params;
  
  console.log('🚀 Dynamic page requested with slug:', slug);
  
  const page = await getPageData(slug);
  
  if (!page) {
    console.log('❌ Page not found, showing 404');
    notFound();
  }

  const componentsToRender = page.components || [];
  
  console.log('🎯 Components to render:', componentsToRender.length);
  componentsToRender.forEach((comp, index) => {
    console.log(`   ${index + 1}. ${comp.type} (id: ${comp.id})`);
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {componentsToRender.length > 0 ? (
          <div className="components-container mt-20">
            {componentsToRender.map((component, index) => 
              renderComponent(component, index)
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to {page.title}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                This page is currently being built. Please check back later for content.
              </p>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
                <p className="text-blue-800 text-sm">
                  <strong>Admin Info:</strong> This page exists but has no components yet. 
                  <a 
                    href={`/admin/dashboard/pages/${page._id}`}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Edit this page in admin
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}