// app/[...slug]/components/renderers/premium/AboutHeroRenderer.js
import AppImage from '../../AppImage';

export default function AboutHeroRenderer({ component, index }) {
  const content = component.content || {};
  
  // Get title tag from content or default to h1
  const TitleTag = content.titleTag || 'h1';
  
  // Only render if we have at least title or highlightedTitle
  const hasContent = content.title || content.highlightedTitle || content.subtitle;
  
  if (!hasContent) {
    return null;
  }

  // Get size classes with proper fallbacks
  const titleSizeClass = content.titleSize || 'text-3xl md:text-5xl';
  const subtitleSizeClass = content.subtitleSize || 'text-sm md:text-base';

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
        {/* Background Overlay with customizable color and opacity */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: content.overlayColor || '#0B1633',
            opacity: content.overlayOpacity ? parseInt(content.overlayOpacity) / 100 : 0.7
          }}
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center px-6 w-full">
        {(content.title || content.highlightedTitle) && (
          <TitleTag 
            className={`font-extrabold mb-2 leading-tight ${titleSizeClass}`}
            style={{ color: content.titleColor || '#FFFFFF' }}
          >
            {content.title && (
              <span style={{ color: content.titleColor || '#FFFFFF' }}>
                {content.title}
              </span>
            )}
            {content.highlightedTitle && (
              <span style={{ color: content.highlightedColor || '#E21B36' }}>
                {content.title ? ' ' : ''}{content.highlightedTitle}
              </span>
            )}
          </TitleTag>
        )}
        
        {content.subtitle && (
          <p 
            className={`max-w-2xl mx-auto ${subtitleSizeClass}`}
            style={{ color: content.subtitleColor || '#D6D9E0' }}
          >
            {content.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}