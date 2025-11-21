// app/[...slug]/components/renderers/premium/HeroBannerRenderer.js
import AppImage from "../../AppImage";

export default function HeroBannerRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || content.subtitle;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#000000' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#1E40AF'}, ${content.gradientTo || '#7E22CE'})` 
        };
      case 'image':
      default:
        return {};
    }
  };

  return (
    <section 
      key={component.id || index} 
      className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center"
      style={getBackgroundStyle()}
    >
      {/* Background Image - Only show if background type is image and image exists */}
      {(!content.backgroundType || content.backgroundType === 'image') && content.backgroundImage && (
        <AppImage
          src={content.backgroundImage}
          alt="Hero banner background"
          fill
          priority
          className="object-cover brightness-95"
        />
      )}
      
      {/* Background Overlay - Only show for image backgrounds or if explicitly set */}
      {((!content.backgroundType || content.backgroundType === 'image') || content.overlayColor) && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: content.overlayColor || '#000000',
            opacity: content.overlayOpacity ? parseInt(content.overlayOpacity) / 100 : 0.4
          }}
        />
      )}

      {/* Text Content */}
      <div className="relative z-10 text-center px-4">
        {/* Subtitle - Only show if exists */}
        {content.subtitle && (
          <h2 
            className={`font-light mb-2 drop-shadow-md ${content.subtitleSize || 'text-2xl md:text-3xl'}`}
            style={{ color: content.subtitleColor || '#FFFFFF' }}
          >
            {content.subtitle}
          </h2>
        )}
        
        {/* Title - Only show if exists */}
        {content.title && (
          <h1 
            className={`font-extrabold mb-4 leading-tight drop-shadow-md ${content.titleSize || 'text-4xl md:text-6xl'}`}
            style={{ color: content.titleColor || '#FFFFFF' }}
          >
            {content.title}
          </h1>
        )}
      </div>
    </section>
  );
}