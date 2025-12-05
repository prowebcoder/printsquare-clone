// app/[...slug]/components/renderers/premium/FreeSampleRenderer.js
import { useState } from 'react';
import AppImage from "../../AppImage";

export default function FreeSampleRenderer({ component, index }) {
  const content = component.content || {};
  const imagePosition = content.imagePosition || 'left';
  const [imageError, setImageError] = useState(false);
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.buttonText || 
                    content.image || 
                    content.email || 
                    [1, 2, 3].some(num => content[`description${num}`]);

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#FFFFFF' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#2e6e97'}, ${content.gradientTo || '#e21b36'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Process image URL - ensure it's absolute if needed
  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's already an absolute URL, return as is
    if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) {
      return url;
    }
    // If it's a relative path, ensure it starts with /
    if (url.startsWith('/')) {
      return url;
    }
    // Add leading slash if missing
    return `/${url}`;
  };

  const imageUrl = getImageUrl(content.image);

  return (
    <section 
      key={component.id || index} 
      className="relative py-12 md:py-20 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative Background Circles - Only show if not using gradient */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
        </>
      )}

      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
        imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
      }`}>
        
        {/* Image Section - Only show if image exists */}
        {imageUrl && !imageError && (
          <div className="lg:w-1/2 w-full relative group mb-8 lg:mb-0">
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
              <AppImage
                src={imageUrl}
                alt={content.title || "Book sample showcase"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 2} // Only prioritize first 2 images
                onError={() => setImageError(true)}
                // Remove unoptimized prop since AppImage uses plain img tag
              />
            </div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-[#2e6e97]/20 rounded-full blur-2xl"></div>
          </div>
        )}

        {/* Image Error Fallback */}
        {imageError && imageUrl && (
          <div className="lg:w-1/2 w-full relative mb-8 lg:mb-0">
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-xl bg-gray-100 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-gray-400 text-4xl mb-3">📷</div>
                <p className="text-gray-600 font-medium">Image failed to load</p>
                <p className="text-gray-500 text-sm mt-2">Please check the image URL</p>
              </div>
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className={`${content.image ? 'lg:w-1/2' : 'w-full'} text-center lg:text-left`}>
          {/* Title - Only show if exists */}
          {content.title && (
            <h2 
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-6"
              style={{ color: content.titleColor || '#1F2937' }}
            >
              {content.title}
            </h2>
          )}

          {/* Descriptions - Only show if they exist */}
          <div className="space-y-4 sm:space-y-5 text-gray-600 text-base sm:text-lg mb-8 sm:mb-10">
            {[1, 2, 3].map((num) => (
              content[`description${num}`] && (
                <p key={num} className="leading-relaxed">{content[`description${num}`]}</p>
              )
            ))}
          </div>

          {/* Button - Only show if button text exists */}
          {content.buttonText && (
            <a
              href={content.buttonLink || 'mailto:support@printsquare.net'}
              className="inline-block font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95"
              style={{
                backgroundColor: content.buttonBgColor || '#e21b36',
                color: content.buttonTextColor || '#FFFFFF'
              }}
              target={content.buttonLink?.startsWith('http') ? '_blank' : '_self'}
              rel={content.buttonLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {content.buttonText}
            </a>
          )}

          {/* Email Info - Only show if email exists */}
          {content.email && (
            <div className="mt-6 text-gray-700 text-sm sm:text-base">
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