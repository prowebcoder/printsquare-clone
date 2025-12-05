// app/[...slug]/components/renderers/premium/ImageBannerRenderer.js
import AppImage from "../../AppImage";

export default function ImageBannerRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
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
        return { backgroundColor: content.backgroundColor || '#0B1633' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#0B1633'}, ${content.gradientTo || '#1E293B'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <section 
      key={component.id || index} 
      className="pt-16 pb-0 px-6 md:px-12"
      style={getBackgroundStyle()}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content - Only show if there's title, paragraphs, or button */}
        {(content.title || content.paragraphs?.length > 0 || content.buttonText) && (
          <div className="md:w-1/2 text-center md:text-left">
            {/* Title - Only show if exists */}
            {content.title && (
              <h2 
                className={`font-extrabold leading-tight mb-4 ${content.titleSize || 'text-3xl md:text-4xl'}`}
                style={{ color: content.titleColor || '#FFFFFF' }}
              >
                {content.title}
              </h2>
            )}
            
            {/* Paragraphs - Only show if they exist */}
            {content.paragraphs && content.paragraphs.length > 0 && (
              <div className="space-y-4">
                {content.paragraphs.map((paragraph, pIndex) => (
                  paragraph && (
                    <p 
                      key={pIndex} 
                      className="text-base leading-relaxed"
                      style={{ color: content.paragraphColor || '#D6D9E0' }}
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
                className="font-semibold py-2 px-6 rounded-sm hover:opacity-90 transition-all duration-300 mt-4"
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

        {/* Right Image - Only show if image exists */}
        {content.image && (
          <div className="md:w-1/2 flex justify-center">
            <AppImage
              src={content.image}
              alt={content.imageAlt || "Banner image"}
              width={650}
              height={400}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}