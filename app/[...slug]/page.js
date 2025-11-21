// app/[...slug]/page.js
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import Link from 'next/link';
import { ArrowRight, Download, ExternalLink, Star } from 'lucide-react';

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

// Helper function to check if image is external
function isExternalImage(src) {
  return src?.startsWith('http');
}

// AppImage component that handles both internal and external images
function AppImage({ src, alt, fill, width, height, className, priority = false, ...props }) {
  const imageSrc = src || '';
  
  if (isExternalImage(imageSrc)) {
    if (fill) {
      return (
        <img 
          src={imageSrc} 
          alt={alt}
          className={className}
          style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
          {...props}
        />
      );
    } else {
      return (
        <img 
          src={imageSrc} 
          alt={alt}
          width={width}
          height={height}
          className={className}
          {...props}
        />
      );
    }
  }

  // For local images, use Next.js Image component
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        {...props}
      />
    );
  } else {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        {...props}
      />
    );
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
        <AppImage
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
          <span className="text-[#E21B36]">{content.title}</span>
          <span className="text-[#FF4B2B]"> {content.highlightedTitle}</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-[#D6D9E0]">
          {content.subtitle || 'Precision. Passion. Printing Excellence from South Korea.'}
        </p>
      </div>
    </section>
  );
}

function renderMultiColumn(component, index) {
  const content = component.content || {};
  const columns = content.columns || [];
  const columnsPerRowDesktop = content.columnsPerRowDesktop || 3;
  const columnsPerRowMobile = content.columnsPerRowMobile || 1;
  
  console.log(`🎨 Rendering MultiColumn:`, content);

  // Icon mapping
  const iconMap = {
    arrow: ArrowRight,
    download: Download,
    external: ExternalLink,
    star: Star,
  };

  // Grid classes based on configuration
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6'
  };

  return (
    <section key={component.id || index} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid ${gridClasses[columnsPerRowMobile]} ${gridClasses[columnsPerRowDesktop]} gap-8`}>
          {columns.map((column, columnIndex) => {
            const IconComponent = column.buttonIcon ? iconMap[column.buttonIcon] : null;
            
            return (
              <div 
                key={columnIndex}
                className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Image */}
                {column.image && (
                  <div className="mb-6 w-full">
                    <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={column.image}
                        alt={column.heading || 'Column image'}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="text-center flex-1 flex flex-col w-full">
                  {/* Heading */}
                  {column.heading && (
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {column.heading}
                    </h3>
                  )}
                  
                  {/* Text */}
                  {column.text && (
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {column.text}
                    </p>
                  )}

                  {/* Button */}
                  {column.buttonText && column.buttonText.trim() !== '' && (
                    <div className="mt-auto pt-4">
                      <Link
                        href={column.buttonLink || '#'}
                        target={column.buttonLink?.startsWith('http') ? '_blank' : '_self'}
                        rel={column.buttonLink?.startsWith('http') ? 'noopener noreferrer' : ''}
                        className={`
                          inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200
                          ${column.buttonStyle === 'primary' ? 'shadow-lg hover:shadow-xl' : ''}
                          ${column.buttonStyle === 'secondary' ? 'shadow-sm hover:shadow-md' : ''}
                          ${column.buttonStyle === 'outline' ? 'border-2 bg-transparent hover:bg-opacity-10' : ''}
                          ${column.buttonStyle === 'ghost' ? 'bg-transparent hover:bg-gray-100' : ''}
                        `}
                        style={{
                          // Primary & Secondary styles
                          ...(column.buttonStyle === 'primary' && {
                            backgroundColor: column.buttonColor || '#3b82f6',
                            color: column.buttonTextColor || '#ffffff',
                          }),
                          ...(column.buttonStyle === 'secondary' && {
                            backgroundColor: column.buttonColor || '#6b7280',
                            color: column.buttonTextColor || '#ffffff',
                          }),
                          // Outline style
                          ...(column.buttonStyle === 'outline' && {
                            borderColor: column.buttonColor || '#3b82f6',
                            color: column.buttonColor || '#3b82f6',
                            backgroundColor: 'transparent',
                          }),
                          // Ghost style
                          ...(column.buttonStyle === 'ghost' && {
                            color: column.buttonColor || '#3b82f6',
                            backgroundColor: 'transparent',
                          }),
                        }}
                      >
                        {column.buttonText}
                        {IconComponent && <IconComponent size={16} />}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function renderWeightConverter(component, index) {
  const content = component.content || {};
  const { title = 'Paper Weight Converter', description = 'Convert between pounds (lbs) and grams per square meter (gsm) for different paper types.', conversionOption = 'lbsToGsm', weight = '', results = {} } = content;

  const paperTypes = [
    { key: 'text', name: 'Text' },
    { key: 'cover', name: 'Cover' },
    { key: 'index', name: 'Index' },
    { key: 'vellum', name: 'Vellum' },
    { key: 'tag', name: 'Tag' }
  ];

  return (
    <section key={component.id || index} className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Converter Interface */}
        <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conversion Option
                </label>
                <select
                  value={conversionOption}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  disabled
                >
                  <option value="lbsToGsm">lbs to gsm</option>
                  <option value="gsmToLbs">gsm to lbs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="number"
                  value={weight}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  placeholder="Enter weight"
                  disabled
                />
              </div>

              <button
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                disabled
              >
                Convert
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Conversion Results
              </h3>
              <div className="space-y-3">
                {paperTypes.map((paperType) => (
                  <div key={paperType.key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{paperType.name}</span>
                    <span className="text-gray-900 font-mono text-lg">
                      {results[paperType.key] || '0.00'}
                    </span>
                  </div>
                ))}
              </div>

              {Object.keys(results).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Results will appear here</p>
                  <p className="text-sm mt-1">Enter weight and click convert</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Note: This is a display preview. Use the page editor to configure the converter.
          </p>
        </div>
      </div>
    </section>
  );
}

function renderMultiTable(component, index) {
  const content = component.content || {};
  const tables = content.tables || [];
  const tablesPerRowDesktop = content.tablesPerRowDesktop || 1;
  const tablesPerRowMobile = content.tablesPerRowMobile || 1;

  console.log(`🎨 Rendering MultiTable:`, content);

  // Grid classes based on configuration
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };

  return (
    <section key={component.id || index} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid ${gridClasses[tablesPerRowMobile]} ${gridClasses[tablesPerRowDesktop]} gap-8`}>
          {tables.map((table, tableIndex) => (
            <div 
              key={tableIndex}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              {/* Table Title */}
              {table.title && (
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 text-center">
                    {table.title}
                  </h3>
                </div>
              )}

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  {/* Table Headers */}
                  {table.headers && table.headers.length > 0 && (
                    <thead>
                      <tr className="bg-gray-100">
                        {table.headers.map((header, headerIndex) => (
                          <th 
                            key={headerIndex}
                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  
                  {/* Table Body */}
                  <tbody>
                    {table.rows?.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex}
                        className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        {row.map((cell, cellIndex) => (
                          <td 
                            key={cellIndex}
                            className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {(!table.rows || table.rows.length === 0) && (
                <div className="px-6 py-8 text-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          ))}
        </div>
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
            <AppImage
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
  const imagePosition = content.imagePosition || 'left';
  
  console.log(`🎨 Rendering FreeSample:`, content);
  
  return (
    <section key={component.id || index} className="relative py-20 overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eaf4ff]">
      {/* Decorative Background Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>

      <div className={`relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 ${
        imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
      }`}>
        {/* Image Section */}
        <div className="lg:w-1/2 relative group">
          <div className="relative h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
            <AppImage
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
        <div className="lg:w-1/2 text-center lg:text-left">
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
      <AppImage
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
          <AppImage
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
            <AppImage
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
    <section
      key={component.id || index}
      className="relative py-24 bg-[#F8F9FB] overflow-hidden"
    >
      {/* Decorative gradient circles */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1633]">
            {content.title || (
              <>
                Selectable{" "}
                <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
                  Proof Method
                </span>
              </>
            )}
          </h2>
          <p className="text-[#2E3850] max-w-2xl mx-auto text-lg">
            {content.description ||
              "Choose from two professional proofing methods that ensure accuracy and efficiency for every project."}
          </p>
        </div>

        {/* Proof Methods */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Method 1 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#E21B36] transition-all duration-300 border border-[#D6D9E0]">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                01
              </span>
              <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#E21B36] transition-colors">
                {content.method1?.title || "E-Proof"}
              </h3>
            </div>
          <p className="text-[#2E3850] leading-relaxed text-base">
  {content.method1?.description || (
    <>
      Proceed with proofing through a digital proof file. It&apos;s{" "}
      <span className="font-medium text-[#E21B36]">free</span>, fast, and
      perfect for quick approvals.
    </>
  )}
</p>
          </div>

          {/* Method 2 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#FF4B2B] transition-all duration-300 border border-[#D6D9E0]">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                02
              </span>
              <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#FF4B2B] transition-colors">
                {content.method2?.title || "Digital-Proof"}
              </h3>
            </div>
            <p className="text-[#2E3850] leading-relaxed text-base">
              {content.method2?.description || (
                <>
                  Get a printed version of your uploaded file for review. You will
                  see the actual proof quality — though it requires extra{" "}
                  <span className="font-medium text-[#FF4B2B]">time and cost</span>.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Optional Image Section */}
        {content.image && (
          <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg">
            <AppImage
              src={content.image}
              alt="Selectable Proof Method"
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1633]/40 to-transparent rounded-2xl" />
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
    <section
      key={component.id || index}
      className="bg-[#FAFAFA] py-20 text-gray-900 relative overflow-hidden"
    >
      {/* Decorative gradient circles */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide flex items-center justify-center gap-3 text-[#0B1633]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#E21B36]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m2 0a9 9 0 11-6.219-8.56M15 13l3 8M6 21h12"
              />
            </svg>
            {content.title || "Latest Notices"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Notices List */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {(content.notices || []).map((notice, noticeIndex) => (
            <div
              key={noticeIndex}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-transparent hover:bg-gradient-to-r hover:from-[#FFE3E5] hover:to-[#FFF0E5] transition duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {notice.title || "Notice Title"}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {notice.desc ||
                  "This is a short description for the notice or announcement."}
              </p>
              <p className="text-xs text-gray-400">{notice.date || "MM.DD.YYYY"}</p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {content.buttonText && (
          <div className="mt-12 text-center">
            <a
              href={content.buttonLink || "#"}
              className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition duration-300"
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
    <section
      key={component.id || index}
      className="bg-[#F8F9FB] py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative blurred background circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1633] mb-3">
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              {content.title?.split(" ")[0] || "Order"}
            </span>{" "}
            {content.title?.split(" ").slice(1).join(" ") || "Process"}
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto rounded-full mb-4"></div>
          <p className="mt-4 text-[#2E3850] max-w-2xl mx-auto text-lg md:text-base">
            {content.description ||
              "Follow our simple 8-step process to get your printing done efficiently and hassle-free."}
          </p>
        </div>

        {/* Steps Section */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          {/* Connecting gradient line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-2">
            <div className="w-full h-2 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] rounded-full"></div>
          </div>

          {(content.steps || []).map((step, stepIndex) => (
            <div
              key={stepIndex}
              className="flex flex-col items-center text-center relative group transform transition duration-300 hover:scale-105 z-10"
            >
              {/* Step number circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E21B36] to-[#FF4B2B] text-white font-bold text-xl flex items-center justify-center shadow-2xl mb-4 z-10">
                {step.id || stepIndex + 1}
              </div>

              {/* Step image */}
              <div className="w-36 h-24 relative mb-3 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <AppImage
                  src={step.image}
                  alt={step.title}
                  width={144}
                  height={96}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Step text */}
              <h3 className="font-semibold text-[#0B1633] text-base md:text-sm mb-1">
                {step.title}
              </h3>
              <p className="text-[#2E3850] text-xs md:text-sm">{step.desc}</p>
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
    <section
      key={component.id || index}
      className="relative bg-[#F8F9FB] py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-[#0B1633]">
          {content.title?.split(" ")[0] || "Our"}{" "}
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.title?.split(" ")[1] || "Portfolio"}
          </span>{" "}
          Showcase
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {(content.images || []).map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="group relative overflow-hidden rounded-xl shadow-lg border border-[#2E3850]/10 bg-white hover:shadow-2xl transition-shadow duration-500"
            >
              <AppImage
                src={image.url}
                alt={image.alt || "Portfolio image"}
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#E21B36]/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Button */}
        {content.buttonText && (
          <a
            href={content.buttonLink || "/portfolio"}
            className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

function renderPricing(component, index) {
  const content = component.content || {};
  console.log(`🎨 Rendering Pricing:`, content);
  
  return (
    <section
      key={component.id || index}
      className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Glow Elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
          {content.title?.split(" ")[0] || "Affordable"}{" "}
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.title?.split(" ")[1] || "Printing Prices"}
          </span>
        </h2>

        {/* Description */}
        <div className="space-y-6 text-lg text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          {content.description1 && <p>{content.description1}</p>}
          {content.description2 && <p>{content.description2}</p>}
        </div>

        {/* Sample Specification Box */}
        {content.sampleTitle && (
          <div
            data-aos="zoom-in"
            className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-3xl p-10 max-w-lg mx-auto shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r from-[#E21B36] to-[#FF4B2B]" />
            <h3 className="text-2xl font-bold mb-8 text-white tracking-wide">
              {content.sampleTitle}
            </h3>

            <div className="space-y-5 text-left">
              {(content.specifications || []).map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-700 pb-3"
                >
                  <span className="text-gray-400">{spec.label}</span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        {content.footerNote && (
          <p className="mt-10 text-gray-500 text-sm italic max-w-2xl mx-auto">
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
    <section
      key={component.id || index}
      className="relative bg-[#0B1633] py-24 overflow-hidden"
    >
      {/* Decorative Gradient Lights */}
      <div className="absolute top-10 right-10 w-56 h-56 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-[#FF4B2B]/20 to-[#E21B36]/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-6 lg:px-12">
        {/* Left Image */}
        {content.image && (
          <div className="w-full md:w-1/2 relative group">
            <div className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]">
              <AppImage
                src={content.image}
                alt={content.title || "Quick Guide"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-tr from-[#E21B36]/30 to-[#FF4B2B]/30 rounded-full blur-2xl"></div>
          </div>
        )}

        {/* Right Text & Cards */}
        <div className={`w-full ${content.image ? "md:w-1/2" : "md:w-2/3 mx-auto"} text-white`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight text-center md:text-left">
            {content.title?.split(" ")[0] || "Quick"}{" "}
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              {content.title?.split(" ")[1] || "Guides"}
            </span>
          </h2>

          {/* Guide List */}
          <div className="space-y-6">
            {(content.guides || []).map((guide, idx) => (
              <a
                key={idx}
                href={guide.href || "#"}
                className="group flex justify-between items-center p-5 bg-[#121A2C] rounded-2xl border border-[#2E3850] hover:border-[#E21B36] hover:bg-[#1A2438] transition-all duration-300 shadow-lg hover:shadow-red-900/20 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#E21B36] font-extrabold text-xl">{`0${idx + 1}`}</span>
                  <span className="font-semibold text-[#D6D9E0] text-lg group-hover:text-white">
                    {guide.title}
                  </span>
                </div>
                <ArrowRight
                  size={22}
                  className="text-[#D6D9E0] group-hover:text-[#E21B36] transition-transform duration-300 group-hover:translate-x-3"
                />
              </a>
            ))}
          </div>

          {/* Description */}
          {content.description && (
            <p className="mt-10 text-[#D6D9E0] text-sm md:text-base leading-relaxed max-w-lg">
              {content.description}
            </p>
          )}
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
        <AppImage
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

function renderVideoBanner(component, index) {
  const content = component.content || {};
  return (
    <section
      key={component.id || index}
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={content.videoUrl || "/homepage/video/printing.mp4"}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Decorative Glows */}
      <div className="absolute -top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-gradient-to-tr from-[#FF4B2B]/20 to-[#E21B36]/20 rounded-full blur-3xl"></div>

      {/* Text Overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.highlightedText || "High-Quality"}
          </span>{" "}
          <span className="text-white">
            {content.normalText || "Printing at Affordable Prices"}
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          {content.description ||
            "Print Seoul delivers premium book printing with advanced technology, flawless finishing, and exceptional value perfect for businesses and creators."}
        </p>

        {/* Optional CTA Button */}
        {content.buttonText && (
          <a
            href={content.buttonLink || "#"}
            className="mt-8 inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

// 🎨 Render Form Section
function renderForm(component, index) {
  const content = component.content || {};
  console.log("🎨 Rendering Form:", content);

  // 🧩 Default form configuration
  const formConfig = content.formConfig || {
    title: "Contact Form",
    submitText: "Submit",
    successMessage: "Thank you for your submission!",
    errorMessage: "There was an error submitting the form.",
  };

  const fields = content.fields || [];

  return (
    <section key={component.id || index} className="bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-2xl mx-auto shadow-lg rounded-2xl bg-white p-10 border border-gray-100">
        {/* 🏷️ Form Title */}
        {formConfig.title && (
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            {formConfig.title}
          </h2>
        )}

        {/* 📝 Dynamic Form Fields */}
        <form className="space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label
                htmlFor={field.id}
                className="block text-sm font-semibold text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {renderFormField(field)}
            </div>
          ))}

          {/* 🚀 Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg 
                       hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 shadow-md"
          >
            {formConfig.submitText}
          </button>
        </form>
      </div>
    </section>
  );
}

//
// 🎯 Helper Function - Render Individual Form Field
//
function renderFormField(field) {
  const commonProps = {
    id: field.id,
    name: field.id,
    required: field.required,
    placeholder: field.placeholder,
    className:
      "w-full p-3 border border-gray-300 rounded-lg text-sm " +
      "focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none " +
      "transition-colors duration-150",
  };

  switch (field.type) {
    case "textarea":
      return <textarea {...commonProps} rows={4} />;

    case "select":
      return (
        <select {...commonProps}>
          <option value="">Select an option</option>
          {(field.options || []).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {(field.options || []).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                id={`${field.id}-${index}`}
                name={field.id}
                value={option}
                className="accent-blue-600"
              />
              <label
                htmlFor={`${field.id}-${index}`}
                className="text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <input type="checkbox" id={field.id} name={field.id} className="accent-blue-600" />
          <label htmlFor={field.id} className="text-sm text-gray-700">
            {field.placeholder}
          </label>
        </div>
      );

    case "checkbox-group":
      return (
        <div className="space-y-2">
          {(field.options || []).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`${field.id}-${index}`}
                name={field.id}
                value={option}
                className="accent-blue-600"
              />
              <label
                htmlFor={`${field.id}-${index}`}
                className="text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );

    case "range":
      return (
        <div>
          <input
            type="range"
            {...commonProps}
            min={field.validation?.min || 0}
            max={field.validation?.max || 100}
            step={field.step || 1}
            defaultValue={field.defaultValue || (field.validation?.min || 0)}
            className="w-full accent-blue-600"
          />
          {field.showValue && (
            <div className="text-sm text-gray-500 text-center mt-2">
              Value: {field.defaultValue || (field.validation?.min || 0)}
            </div>
          )}
        </div>
      );

    case "color":
      return (
        <input
          type="color"
          {...commonProps}
          className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
        />
      );

    case "file":
      return (
        <input
          type="file"
          {...commonProps}
          accept={field.accept}
          multiple={field.multiple}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
        />
      );

    default:
      return <input type={field.type} {...commonProps} />;
  }
}

function renderImage(component, index) {
  const content = component.content || {};
  return (
    <figure key={component.id || index} className="my-6 text-center p-6">
      {content.src ? (
        <AppImage
          src={content.src}
          alt={content.alt || 'Image'}
          width={800}
          height={600}
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
    case 'multiColumn':
        return renderMultiColumn(component, index);
        case 'weightConverter':
        return renderWeightConverter(component, index);
          case 'multiTable':
        return renderMultiTable(component, index);
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
		case 'videoBanner':
        return renderVideoBanner(component, index);
		case 'form':
        return renderForm(component, index);
      
      default:
        console.warn(`❌ Unknown component type: ${component.type}`);
        return (
          <div key={component.id || index} className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg my-4">
            <p className="text-yellow-800 font-semibold">Unsupported Component: ${component.type}</p>
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
        <p className="text-red-800 font-semibold">Error rendering: ${component.type}</p>
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