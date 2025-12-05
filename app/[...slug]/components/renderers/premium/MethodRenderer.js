// app/[...slug]/components/renderers/premium/MethodRenderer.js
import AppImage from "../../AppImage";

export default function MethodRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.highlightedTitle || 
                    content.description || 
                    content.image || 
                    content.method1?.title || content.method1?.description ||
                    content.method2?.title || content.method2?.description;

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
          background: `linear-gradient(to right, ${content.gradientFrom || '#E21B36'}, ${content.gradientTo || '#FF4B2B'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <section
      key={component.id || index}
      className="relative py-24 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative gradient circles - Only show if not using gradient background */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Title - Only show if title or highlightedTitle exists */}
        {(content.title || content.highlightedTitle) && (
          <div className="text-center mb-16">
            <h2 
              className={`font-extrabold mb-4 ${content.titleSize || 'text-4xl md:text-5xl'}`}
              style={{ color: content.titleColor || '#0B1633' }}
            >
              {content.title || 'Selectable'}{' '}
              {content.highlightedTitle && (
                <span style={{ color: content.highlightedColor || '#E21B36' }}>
                  {content.highlightedTitle}
                </span>
              )}
            </h2>
            
            {/* Description - Only show if exists */}
            {content.description && (
              <p 
                className={`max-w-2xl mx-auto ${content.descriptionSize || 'text-lg'}`}
                style={{ color: content.descriptionColor || '#2E3850' }}
              >
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Proof Methods */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Method 1 - Only show if it has title or description */}
          {(content.method1?.title || content.method1?.description) && (
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#E21B36] transition-all duration-300 border border-[#D6D9E0]">
              <div className="flex items-center mb-5">
                <span 
                  className="font-bold px-4 py-2 rounded-full mr-3 text-sm"
                  style={{
                    background: `linear-gradient(to right, ${content.badgeGradientFrom || '#E21B36'}, ${content.badgeGradientTo || '#FF4B2B'})`,
                    color: content.badgeTextColor || '#FFFFFF'
                  }}
                >
                  01
                </span>
                <h3 
                  className="text-2xl font-extrabold leading-tight group-hover:text-[#E21B36] transition-colors"
                  style={{ color: content.titleColor || '#0B1633' }}
                >
                  {content.method1?.title || "E-Proof"}
                </h3>
              </div>
              {content.method1?.description && (
                <p 
                  className="leading-relaxed text-base"
                  style={{ color: content.descriptionColor || '#2E3850' }}
                >
                  {content.method1.description}
                </p>
              )}
            </div>
          )}

          {/* Method 2 - Only show if it has title or description */}
          {(content.method2?.title || content.method2?.description) && (
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#FF4B2B] transition-all duration-300 border border-[#D6D9E0]">
              <div className="flex items-center mb-5">
                <span 
                  className="font-bold px-4 py-2 rounded-full mr-3 text-sm"
                  style={{
                    background: `linear-gradient(to right, ${content.badgeGradientFrom || '#E21B36'}, ${content.badgeGradientTo || '#FF4B2B'})`,
                    color: content.badgeTextColor || '#FFFFFF'
                  }}
                >
                  02
                </span>
                <h3 
                  className="text-2xl font-extrabold leading-tight group-hover:text-[#FF4B2B] transition-colors"
                  style={{ color: content.titleColor || '#0B1633' }}
                >
                  {content.method2?.title || "Digital-Proof"}
                </h3>
              </div>
              {content.method2?.description && (
                <p 
                  className="leading-relaxed text-base"
                  style={{ color: content.descriptionColor || '#2E3850' }}
                >
                  {content.method2.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Optional Image Section - Only show if image exists */}
        {content.image && (
          <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg">
            <AppImage
              src={content.image}
              alt={content.imageAlt || "Selectable Proof Method"}
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