// app/[...slug]/page.js
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

// Import all renderers
import * as Renderers from './components/renderers';

/**
 * Safely serialize data for React Server Components
 * Removes Mongoose circular references
 */
function serializeForRSC(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeForRSC(item));
  }
  
  // Handle plain objects
  const result = {};
  for (const key in data) {
    // Skip Mongoose internal properties
    if (key.startsWith('$') || key === '__v' || key === '_id') {
      continue;
    }
    
    try {
      // Skip Mongoose document methods and internal properties
      if (key === '$__' || key === '$isNew' || key === 'save' || key === 'validate') {
        continue;
      }
      
      const value = data[key];
      
      // Handle nested objects/arrays
      if (value && typeof value === 'object') {
        // Check for circular reference by looking for $__ (Mongoose document)
        if (value.$__) {
          // This is a Mongoose document, convert to plain object
          try {
            result[key] = serializeForRSC(value.toObject ? value.toObject() : {});
          } catch {
            result[key] = {};
          }
        } else if (Array.isArray(value)) {
          result[key] = value.map(item => serializeForRSC(item));
        } else {
          result[key] = serializeForRSC(value);
        }
      } else {
        result[key] = value;
      }
    } catch (error) {
      console.warn(`Could not serialize key "${key}":`, error.message);
      result[key] = null;
    }
  }
  
  return result;
}

async function getPageData(slug) {
  try {
    await dbConnect();
    
    const pageSlug = Array.isArray(slug) ? slug.join('/') : slug;
    console.log('🔍 Looking for page with slug:', pageSlug);
    
    // Use lean() to get plain objects, not Mongoose documents
    const page = await Page.findOne({ 
      slug: pageSlug,
      published: true 
    }).lean();
    
    console.log('📄 Page found:', page ? 'Yes' : 'No');
    if (page) {
      console.log('📊 Page components count:', page.components?.length || 0);
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
  'videoWithText': Renderers.VideoWithTextRenderer,
  'videoBanner': Renderers.VideoBannerRenderer,
  'tabsFaq': Renderers.TabsFaqRenderer,
  'tabsGallery': Renderers.TabsGalleryRenderer,
  'serviceBox': Renderers.ServiceBoxRenderer,
  'textBox': Renderers.TextBoxRenderer,
  'contactUs': Renderers.ContactUsRenderer,
};

function renderComponent(component, index) {
  try {
    const RendererComponent = componentMap[component.type];
    
    if (RendererComponent) {
      // Ensure component content is serialized
      const safeComponent = {
        ...component,
        content: component.content ? serializeForRSC(component.content) : {}
      };
      
      return <RendererComponent 
        key={component.id || `comp-${index}`} 
        component={safeComponent} 
        index={index} 
      />;
    } else {
      console.warn(`❌ Unknown component type: ${component.type}`);
      return (
        <div key={component.id || index} className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg my-4">
          <p className="text-yellow-800 font-semibold">Unsupported Component: {component.type}</p>
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
  // In Next.js 15, params is a Promise, so we need to await it
  const { slug } = await params;
  
  console.log('🚀 Dynamic page requested with slug:', slug);
  
  const page = await getPageData(slug);
  
  if (!page) {
    console.log('❌ Page not found, showing 404');
    notFound();
  }

  // Serialize the entire page data
  const safePageData = serializeForRSC(page);
  const componentsToRender = safePageData.components || [];
  
  console.log('🎯 Components to render:', componentsToRender.length);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {componentsToRender.length > 0 ? (
          <div className="components-container mt-16">
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
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// If you want to generate static params for dynamic routes
export async function generateStaticParams() {
  await dbConnect();
  const pages = await Page.find({ published: true }).select('slug').lean();
  
  return pages.map((page) => ({
    slug: page.slug.split('/'),
  }));
}