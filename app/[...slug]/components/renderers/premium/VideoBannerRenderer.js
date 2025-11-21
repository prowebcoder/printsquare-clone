// app/[...slug]/components/renderers/premium/VideoBannerRenderer.js
export default function VideoBannerRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.highlightedText || 
                    content.normalText || 
                    content.description || 
                    content.videoUrl;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  return (
    <section
      key={component.id || index}
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background Video - Only show if video exists */}
      {content.videoUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={content.videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Decorative Glows */}
      <div className="absolute -top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-gradient-to-tr from-[#FF4B2B]/20 to-[#E21B36]/20 rounded-full blur-3xl"></div>

      {/* Text Overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Title Section - Only show if highlightedText or normalText exists */}
        {(content.highlightedText || content.normalText) && (
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {content.highlightedText && (
              <span style={{ color: content.highlightedColor || '#E21B36' }}>
                {content.highlightedText}
              </span>
            )}
            {content.highlightedText && content.normalText && ' '}
            {content.normalText && (
              <span style={{ color: content.normalTextColor || '#FFFFFF' }}>
                {content.normalText}
              </span>
            )}
          </h1>
        )}
        
        {/* Description - Only show if exists */}
        {content.description && (
          <p 
            className="text-base md:text-lg leading-relaxed"
            style={{ color: content.descriptionColor || '#D1D5DB' }}
          >
            {content.description}
          </p>
        )}

        {/* Optional CTA Button - Only show if buttonText exists */}
        {content.buttonText && (
          <a
            href={content.buttonLink || "#"}
            className="mt-8 inline-block font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: `linear-gradient(to right, ${content.buttonBgColor || '#E21B36'}, ${content.highlightedColor || '#FF4B2B'})`,
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