// app/[...slug]/components/renderers/premium/ImageBannerTwoRenderer.js
import AppImage from "../../AppImage";

export default function ImageBannerTwoRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.highlightedTitle || 
                    content.buttonText || 
                    content.image || 
                    content.paragraphs?.length > 0;

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

  // Determine grid order based on image position
  const imagePosition = content.imagePosition || 'right';
  const imageColClass = imagePosition === 'left' ? 'order-1' : 'order-2';
  const contentColClass = imagePosition === 'left' ? 'order-2' : 'order-1';

  return (
    <section 
      key={component.id || index} 
      className="py-20 px-6 md:px-12"
      style={getBackgroundStyle()}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Image Section - Only show if image exists */}
        {content.image && (
          <div className={`md:w-1/2 flex justify-center ${imageColClass}`}>
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <AppImage
                  src={content.image}
                  alt={content.imageAlt || "Special order book"}
                  width={500}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content Section - Only show if there's title, highlightedTitle, paragraphs, or button */}
        {(content.title || content.highlightedTitle || content.paragraphs?.length > 0 || content.buttonText) && (
          <div className={`md:w-1/2 text-center md:text-left ${contentColClass}`}>
            {/* Title - Only show if title or highlightedTitle exists */}
            {(content.title || content.highlightedTitle) && (
              <h2 
                className={`font-bold mb-6 ${content.titleSize || 'text-3xl md:text-4xl'}`}
                style={{ color: content.titleColor || '#0B1633' }}
              >
                {content.title || 'Special Order'}{' '}
                {content.highlightedTitle && (
                  <span style={{ color: content.highlightedColor || '#E21B36' }}>
                    {content.highlightedTitle}
                  </span>
                )}
              </h2>
            )}
            
            {/* Paragraphs - Only show if they exist */}
            {content.paragraphs && content.paragraphs.length > 0 && (
              <div className="space-y-4 mb-8">
                {content.paragraphs.map((paragraph, pIndex) => (
                  paragraph && (
                    <p 
                      key={pIndex} 
                      className="text-lg leading-relaxed"
                      style={{ color: content.paragraphColor || '#2E3850' }}
                    >
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            )}

            {/* Button - Only show if button text exists */}
            {content.buttonText && (
              <button 
                className="font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: content.buttonBgColor || '#E21B36',
                  color: content.buttonTextColor || '#FFFFFF'
                }}
              >
                {content.buttonText}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}