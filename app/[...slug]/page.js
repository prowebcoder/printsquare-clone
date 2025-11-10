import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

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
      
      // Log each component for debugging
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

// Premium Component Renderers
function renderAboutHero(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering AboutHero:`, content);
  
  return (
    <section key={component.id || index} className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-[#0B1633]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage || '/about/about-banner.jpg'}
          alt="About Print Seoul Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0B1633]/70" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight text-white">
          <span className="text-[#E21B36]">{content.title || 'About'}</span>
          <span className="text-[#FF4B2B]"> {content.highlightedTitle || 'Us'}</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-[#D6D9E0]">
          {content.subtitle || 'Precision. Passion. Printing Excellence from South Korea.'}
        </p>
      </div>
    </section>
  );
}

function renderAboutUs(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering AboutUs:`, content);
  
  return (
    <section key={component.id || index} className="relative bg-[#F8F9FB] py-20 px-6 md:px-16 lg:px-28 text-[#0B1633]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Image */}
        <div className="relative">
          <div className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={content.image || '/about/About.jpg'}
              alt="Print Seoul Printing Facility"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white shadow-md p-4 rounded-2xl border border-[#2E3850] max-w-[240px]">
            <p className="text-sm text-[#121A2C] italic">
              {content.quote || 'Precision in every print — from Seoul to the world.'}
            </p>
          </div>
        </div>

        {/* Right Section - Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            {content.title || 'About Print Seoul'}
          </h2>

          {[1, 2, 3, 4].map((num) => (
            content[`description${num}`] && (
              <p key={num} className="text-[#121A2C] text-lg leading-relaxed mb-5">
                {content[`description${num}`]}
              </p>
            )
          ))}

          {content.buttonText && (
            <div className="mt-8">
              <a
                href={content.buttonLink || '/quote'}
                className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:opacity-90 transition-all"
              >
                {content.buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderFreeSample(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering FreeSample:`, content);
  
  return (
    <section key={component.id || index} className="relative py-20 overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eaf4ff]">
      {/* Decorative Background Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="lg:w-1/2 order-2 lg:order-1 relative group">
          <div className="relative h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src={content.image || '/homepage/main-sec07-1.jpg'}
              alt="Book sample showcase"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-[#2e6e97]/20 rounded-full blur-2xl"></div>
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            {content.title || 'Free Sample Service'}
          </h2>

          <div className="space-y-5 text-gray-600 text-lg mb-10">
            {[1, 2, 3].map((num) => (
              content[`description${num}`] && (
                <p key={num}>{content[`description${num}`]}</p>
              )
            ))}
          </div>

          {/* Button */}
          {content.buttonText && (
            <a
              href={content.buttonLink || 'mailto:support@printsquare.net'}
              className="inline-block bg-[#e21b36] hover:bg-[#068180] text-white font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {content.buttonText}
            </a>
          )}

          {/* Email Info */}
          {content.email && (
            <div className="mt-6 text-gray-700 text-sm">
              <span className="mr-2">Or email us directly at</span>
              <a
                href={`mailto:${content.email}`}
                className="text-[#2e6e97] hover:underline font-medium"
              >
                {content.email}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderHeroBanner(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering HeroBanner:`, content);
  
  return (
    <section key={component.id || index} className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
      <Image
        src={content.backgroundImage || '/homepage/main-bg.jpg'}
        alt="Printsquare background"
        fill
        priority
        className="object-cover brightness-95"
      />
      <div className="relative z-10 text-center px-4">
        <h2 className="text-white text-2xl md:text-3xl font-light mb-2 drop-shadow-md">
          {content.subtitle || "Quality prints. Fair prices. Print Seoul"}
        </h2>
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
          {content.title || "Your printing partner that cares."}
        </h1>
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
}

function renderImageBanner(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering ImageBanner:`, content);
  
  return (
    <section key={component.id || index} className="bg-[#0B1633] pt-16 pb-0 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title || "Find Your Perfect Paper Match!"}
          </h2>
          
          {(content.paragraphs || []).map((paragraph, pIndex) => (
            <p key={pIndex} className="text-base mb-4 leading-relaxed text-[#D6D9E0]">
              {paragraph}
            </p>
          ))}

          {content.buttonText && (
            <button className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold py-2 px-6 rounded-sm hover:opacity-90 transition-all duration-300">
              {content.buttonText}
            </button>
          )}
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={content.image || '/homepage/paper.png'}
            alt="High-quality paper"
            width={650}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function renderImageBannerTwo(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering ImageBannerTwo:`, content);
  
  return (
    <section key={component.id || index} className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            {content.title || "Special Order Available"}
          </h2>
          
          {(content.paragraphs || []).map((paragraph, pIndex) => (
            <p key={pIndex} className="text-lg text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {content.buttonText && (
            <a
              href={content.buttonLink || '#'}
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.buttonText}
            </a>
          )}
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={content.image || '/homepage/main-sec06-1.png'}
              alt="Special order book printing"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function renderMethod(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering Method:`, content);
  
  return (
    <section key={component.id || index} className="bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {content.title || "Selectable Proof Method"}
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {content.description || "Choose from two professional proofing methods that ensure accuracy and efficiency for every project."}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Method 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {content.method1?.title || "E-Proof"}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {content.method1?.description || "Proceed with proofing through a digital proof file. Its free, fast, and perfect for quick approvals."}
            </p>
          </div>

          {/* Method 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {content.method2?.title || "Digital-Proof"}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {content.method2?.description || "Get a printed version of your uploaded file for review. You will see the actual proof quality — though it requires extra time and cost."}
            </p>
          </div>
        </div>

        {content.image && (
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden">
              <Image
                src={content.image}
                alt="Proof methods"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function renderNotice(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering Notice:`, content);
  
  return (
    <section key={component.id || index} className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          {content.title || "Latest Notices"}
        </h2>

        <div className="space-y-6">
          {(content.notices || []).map((notice, noticeIndex) => (
            <div key={noticeIndex} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {notice.desc}
                  </p>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {notice.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {content.buttonText && (
          <div className="text-center mt-8">
            <a
              href={content.buttonLink || '#'}
              className="inline-block bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              {content.buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function renderOrderProcess(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering OrderProcess:`, content);
  
  return (
    <section key={component.id || index} className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {content.title || "Order Process"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.description || "Follow our simple 8-step process to get your printing done efficiently and hassle-free."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(content.steps || []).map((step, stepIndex) => (
            <div key={stepIndex} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.id}
              </div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderPortfolio(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering Portfolio:`, content);
  
  return (
    <section key={component.id || index} className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {content.title || "Our Portfolio Showcase"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(content.images || []).map((image, imageIndex) => (
            <div key={imageIndex} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <Image
                src={image.url}
                alt={image.alt}
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {content.buttonText && (
          <div className="text-center mt-8">
            <a
              href={content.buttonLink || '/portfolio'}
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function renderPricing(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering Pricing:`, content);
  
  return (
    <section key={component.id || index} className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          {content.title || "Affordable Printing Prices"}
        </h2>
        
        <div className="space-y-6 text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          {content.description1 && (
            <p>{content.description1}</p>
          )}
          {content.description2 && (
            <p>{content.description2}</p>
          )}
        </div>

        {content.sampleTitle && (
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              {content.sampleTitle}
            </h3>
            <div className="space-y-4 text-left">
              {(content.specifications || []).map((spec, specIndex) => (
                <div key={specIndex} className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">{spec.label}</span>
                  <span className="font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.footerNote && (
          <p className="mt-8 text-gray-400 text-sm max-w-2xl mx-auto">
            {content.footerNote}
          </p>
        )}
      </div>
    </section>
  );
}

function renderQuickGuides(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering QuickGuides:`, content);
  
  return (
    <section key={component.id || index} className="bg-gradient-to-r from-purple-50 to-pink-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {content.title || "Quick Guides"}
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {content.description || "Learn essential printing tips, layout guidelines, and professional insights to help you prepare your perfect print-ready files efficiently and accurately."}
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {(content.guides || []).map((guide, guideIndex) => (
            <a
              key={guideIndex}
              href={guide.href || '#'}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {guide.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Basic Component Renderers
function renderText(component, index) {
  const content = component.content || {};
  return (
    <div 
      key={component.id || index}
      className="prose max-w-none mx-auto p-6"
      dangerouslySetInnerHTML={{ 
        __html: (content.content || 'Enter your text here...').replace(/\n/g, '<br>') 
      }}
    />
  );
}

function renderHeading(component, index) {
  const content = component.content || {};
  const HeadingTag = content.level || 'h2';
  return (
    <HeadingTag 
      key={component.id || index}
      className="my-6 p-6 text-center text-3xl font-bold text-gray-900"
    >
      {content.text || 'Heading Text'}
    </HeadingTag>
  );
}

function renderHero(component, index) {
  const content = component.content || {};
  return (
    <section key={component.id || index} className="relative w-full h-64 flex items-center justify-center bg-gray-100">
      {content.backgroundImage && (
        <Image
          src={content.backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
        />
      )}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
          {content.title || 'Hero Title'}
        </h1>
        <p className="text-xl text-white mb-6 drop-shadow-md">
          {content.subtitle || 'Hero Subtitle'}
        </p>
        {content.buttonText && (
          <a
            href={content.buttonLink || '#'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {content.buttonText}
          </a>
        )}
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </section>
  );
}

function renderImage(component, index) {
  const content = component.content || {};
  return (
    <figure key={component.id || index} className="my-6 text-center p-6">
      {content.src ? (
        <img 
          src={content.src} 
          alt={content.alt || 'Image'}
          className="mx-auto max-w-full h-auto rounded-lg"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image selected</span>
        </div>
      )}
      {content.caption && (
        <figcaption className="text-center text-gray-600 mt-2 text-sm">
          {content.caption}
        </figcaption>
      )}
    </figure>
  );
}

// Main Component Renderer
function renderComponent(component, index) {
  console.log(`🔄 Rendering component ${index}:`, component.type, component.id, component.content);
  
  try {
    switch (component.type) {
      // Basic Components
      case 'text':
        return renderText(component, index);
      case 'heading':
        return renderHeading(component, index);
      case 'hero':
        return renderHero(component, index);
      case 'image':
        return renderImage(component, index);
      
      // Premium Components
      case 'aboutHero':
        return renderAboutHero(component, index);
      case 'aboutUs':
        return renderAboutUs(component, index);
      case 'freeSample':
        return renderFreeSample(component, index);
      case 'heroBanner':
        return renderHeroBanner(component, index);
      case 'imageBanner':
        return renderImageBanner(component, index);
      case 'imageBannerTwo':
        return renderImageBannerTwo(component, index);
      case 'method':
        return renderMethod(component, index);
      case 'notice':
        return renderNotice(component, index);
      case 'orderProcess':
        return renderOrderProcess(component, index);
      case 'portfolio':
        return renderPortfolio(component, index);
      case 'pricing':
        return renderPricing(component, index);
      case 'quickGuides':
        return renderQuickGuides(component, index);
      
      default:
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

  // Use components as they are stored (they should already be in order)
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
          <div className="components-container">
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