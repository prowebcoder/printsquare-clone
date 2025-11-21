// app/[...slug]/components/renderers/premium/PortfolioRenderer.js
import AppImage from "../../AppImage";

export default function PortfolioRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.highlightedTitle || 
                    content.subtitle || 
                    content.buttonText || 
                    content.images?.length > 0;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#F8F9FB' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#F8F9FB'}, ${content.gradientTo || '#FFFFFF'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <section
      key={component.id || index}
      className="relative py-20 px-6 md:px-12 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative circles - Only show if not using gradient background */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Heading - Only show if title, highlightedTitle, or subtitle exists */}
        {(content.title || content.highlightedTitle || content.subtitle) && (
          <h2 
            className={`font-extrabold mb-12 ${content.titleSize || 'text-3xl md:text-5xl'}`}
            style={{ color: content.titleColor || '#0B1633' }}
          >
            {content.title || 'Our'}{' '}
            {content.highlightedTitle && (
              <span style={{ color: content.highlightedColor || '#E21B36' }}>
                {content.highlightedTitle}
              </span>
            )}
            {content.subtitle && (
              <span style={{ color: content.subtitleColor || '#0B1633' }}>
                {' '}{content.subtitle}
              </span>
            )}
          </h2>
        )}

        {/* Image Grid - Only show if images exist */}
        {content.images && content.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
            {content.images.map((image, imageIndex) => (
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
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"
                  style={{ 
                    background: `linear-gradient(to top, ${content.highlightedColor || '#E21B36'}/20, transparent)`
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* Button - Only show if button text exists */}
        {content.buttonText && (
          <a
            href={content.buttonLink || "/portfolio"}
            className="inline-block font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: content.buttonBgColor || '#E21B36',
              color: content.buttonTextColor || '#FFFFFF'
            }}
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}