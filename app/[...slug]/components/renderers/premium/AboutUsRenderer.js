// app/[...slug]/components/renderers/premium/AboutUsRenderer.js
import AppImage from "../../AppImage";

export default function AboutUsRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.buttonText || 
                    content.image || 
                    content.quote || 
                    [1, 2, 3, 4].some(num => content[`description${num}`]);

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine grid order based on image position
  const imagePosition = content.imagePosition || 'left';
  const imageColClass = imagePosition === 'left' ? 'order-1' : 'order-2';
  const contentColClass = imagePosition === 'left' ? 'order-2' : 'order-1';

  return (
    <section key={component.id || index} className="relative bg-[#F8F9FB] py-20 px-6 md:px-16 lg:px-28 text-[#0B1633]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Image Section */}
        {content.image && (
          <div className={`relative ${imageColClass}`}>
            <div className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg">
              <AppImage
                src={content.image}
                alt="Print Seoul Printing Facility"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Quote Box - Only show if there's quote text */}
            {content.quote && (
              <div 
                className="absolute -bottom-6 -right-6 shadow-md p-4 rounded-2xl border border-[#2E3850] max-w-[240px]"
                style={{ 
                  backgroundColor: content.quoteBgColor || '#FFFFFF',
                  color: content.quoteTextColor || '#121A2C'
                }}
              >
                <p className="text-sm italic">
                  {content.quote}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className={contentColClass}>
          {/* Title - Only show if there's title */}
          {content.title && (
            <h2 
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
              style={{ color: content.titleColor || '#0B1633' }}
            >
              {content.title}
            </h2>
          )}

          {/* Descriptions - Only show if there's content */}
          {[1, 2, 3, 4].map((num) => (
            content[`description${num}`] && (
              <p key={num} className="text-[#121A2C] text-lg leading-relaxed mb-5">
                {content[`description${num}`]}
              </p>
            )
          ))}

          {/* Button - Only show if there's button text */}
          {content.buttonText && (
            <div className="mt-8">
              <a
                href={content.buttonLink || '/quote'}
                className="inline-block font-semibold px-8 py-3 rounded-full shadow-md hover:opacity-90 transition-all"
                style={{
                  backgroundColor: content.buttonBgColor || '#E21B36',
                  color: content.buttonTextColor || '#FFFFFF'
                }}
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