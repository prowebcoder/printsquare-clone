// app/[...slug]/components/renderers/premium/OrderProcessRenderer.js
import AppImage from "../../AppImage";

export default function OrderProcessRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = (content.title || content.highlightedTitle || content.description) && 
                    content.steps?.length > 0;

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
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative blurred background circles - Only show if not using gradient background */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading - Only show if title or highlightedTitle exists */}
        {(content.title || content.highlightedTitle) && (
          <div className="text-center mb-16">
            <h2 
              className={`font-extrabold mb-3 ${content.titleSize || 'text-4xl md:text-5xl'}`}
              style={{ color: content.titleColor || '#0B1633' }}
            >
              {content.highlightedTitle ? (
                <>
                  <span style={{ color: content.highlightedColor || '#E21B36' }}>
                    {content.highlightedTitle}
                  </span>{' '}
                  {content.title}
                </>
              ) : (
                content.title || 'Order Process'
              )}
            </h2>
            <div 
              className="w-28 h-1 mx-auto rounded-full mb-4"
              style={{
                background: `linear-gradient(to right, ${content.stepGradientFrom || '#E21B36'}, ${content.stepGradientTo || '#FF4B2B'})`
              }}
            ></div>
            
            {/* Description - Only show if exists */}
            {content.description && (
              <p 
                className={`mt-4 max-w-2xl mx-auto ${content.descriptionSize || 'text-lg md:text-base'}`}
                style={{ color: content.descriptionColor || '#2E3850' }}
              >
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Steps Section - Only show if steps exist */}
        {content.steps && content.steps.length > 0 && (
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
            {/* Connecting gradient line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-2">
              <div 
                className="w-full h-2 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${content.stepGradientFrom || '#E21B36'}, ${content.stepGradientTo || '#FF4B2B'})`
                }}
              ></div>
            </div>

            {content.steps.map((step, stepIndex) => (
              <div
                key={stepIndex}
                className="flex flex-col items-center text-center relative group transform transition duration-300 hover:scale-105 z-10"
              >
                {/* Step number circle */}
                <div 
                  className="w-16 h-16 rounded-full font-bold text-xl flex items-center justify-center shadow-2xl mb-4 z-10"
                  style={{
                    background: `linear-gradient(to bottom right, ${content.stepGradientFrom || '#E21B36'}, ${content.stepGradientTo || '#FF4B2B'})`,
                    color: content.stepNumberColor || '#FFFFFF'
                  }}
                >
                  {step.id || stepIndex + 1}
                </div>

                {/* Step image - Only show if image exists */}
                {step.image && (
                  <div className="w-36 h-24 relative mb-3 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                    <AppImage
                      src={step.image}
                      alt={step.title}
                      width={144}
                      height={96}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Step text - Only show if title or description exists */}
                {(step.title || step.desc) && (
                  <>
                    {step.title && (
                      <h3 
                        className="font-semibold text-base md:text-sm mb-1"
                        style={{ color: content.titleColor || '#0B1633' }}
                      >
                        {step.title}
                      </h3>
                    )}
                    {step.desc && (
                      <p 
                        className="text-xs md:text-sm"
                        style={{ color: content.descriptionColor || '#2E3850' }}
                      >
                        {step.desc}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}