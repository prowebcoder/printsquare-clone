// src/app/page.js
import dbConnect from '@/lib/mongodb';
import Page from '@/models/Page';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import * as Renderers from './[...slug]/components/renderers';

// Import serialize function
function serializeForRSC(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  if (Array.isArray(data)) {
    return data.map(item => serializeForRSC(item));
  }
  
  const result = {};
  for (const key in data) {
    if (key.startsWith('$') || key === '__v' || key === '_id') {
      continue;
    }
    
    try {
      if (key === '$__' || key === '$isNew' || key === 'save' || key === 'validate') {
        continue;
      }
      
      const value = data[key];
      
      if (value && typeof value === 'object') {
        if (value.$__) {
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

// Component mapping for rendering
const componentMap = {
  'text': Renderers.TextRenderer,
  'heading': Renderers.HeadingRenderer,
  'hero': Renderers.HeroRenderer,
  'image': Renderers.ImageRenderer,
  'form': Renderers.FormRenderer,
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

// Generate metadata for homepage
export async function generateMetadata() {
  await dbConnect();
  
  // Fetch the homepage
  const homepage = await Page.findOne({ 
    $or: [
      { slug: '' },
      { isHomepage: true }
    ],
    published: true 
  }).lean();
  
  if (!homepage) {
    return {
      title: 'Home - Printing Services',
      description: 'Professional printing services for all your needs'
    };
  }
  
  return {
    title: homepage.metaTitle || homepage.title || 'Home - Printing Services',
    description: homepage.metaDescription || 'Professional printing services for all your needs',
    openGraph: {
      title: homepage.metaTitle || homepage.title || 'Home - Printing Services',
      description: homepage.metaDescription || 'Professional printing services for all your needs',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: homepage.metaTitle || homepage.title || 'Home - Printing Services',
      description: homepage.metaDescription || 'Professional printing services for all your needs',
    }
  };
}

export default async function Home() {
  await dbConnect();
  
  // Fetch the homepage
  const homepage = await Page.findOne({ 
    $or: [
      { slug: '' },
      { isHomepage: true }
    ],
    published: true 
  }).lean();
  
  if (!homepage) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Printing Services</h1>
          <p className="text-gray-600 text-lg mb-8">
            No homepage has been set yet. Please set a page as homepage from the admin dashboard.
          </p>
          <p className="text-gray-500">
            Go to Admin Dashboard → Pages → Select a page → Set as Homepage
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  // Serialize the homepage data
  const safeHomepageData = serializeForRSC(homepage);
  const componentsToRender = safeHomepageData.components || [];
  
  console.log('🏠 Homepage loaded:', homepage.title);
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to {homepage.title}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                This homepage is currently being built. Please check back later for content.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}