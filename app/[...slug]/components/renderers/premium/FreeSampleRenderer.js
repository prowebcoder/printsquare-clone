// app/[...slug]/components/renderers/premium/FreeSampleRenderer.js
import AppImage from "../../AppImage";

export default function FreeSampleRenderer({ component, index }) {
  const content = component.content || {};
  const imagePosition = content.imagePosition || 'left';
  
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

  return (
    <section 
      key={component.id || index} 
      className="relative py-20 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative Background Circles - Only show if not using gradient */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
        </>
      )}

      <div className={`relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 ${
        imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
      }`}>
        
        {/* Image Section - Only show if image exists */}
        {content.image && (
          <div className="lg:w-1/2 relative group">
            <div className="relative h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
              <AppImage
                src={content.image}
                alt="Book sample showcase"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-[#2e6e97]/20 rounded-full blur-2xl"></div>
          </div>
        )}

        {/* Text Content */}
        <div className={`${content.image ? 'lg:w-1/2' : 'w-full'} text-center lg:text-left`}>
          {/* Title - Only show if exists */}
          {content.title && (
            <h2 
              className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              style={{ color: content.titleColor || '#1F2937' }}
            >
              {content.title}
            </h2>
          )}

          {/* Descriptions - Only show if they exist */}
          <div className="space-y-5 text-gray-600 text-lg mb-10">
            {[1, 2, 3].map((num) => (
              content[`description${num}`] && (
                <p key={num}>{content[`description${num}`]}</p>
              )
            ))}
          </div>

          {/* Button - Only show if button text exists */}
          {content.buttonText && (
            <a
              href={content.buttonLink || 'mailto:support@printsquare.net'}
              className="inline-block font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                backgroundColor: content.buttonBgColor || '#e21b36',
                color: content.buttonTextColor || '#FFFFFF'
              }}
            >
              {content.buttonText}
            </a>
          )}

          {/* Email Info - Only show if email exists */}
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