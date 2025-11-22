// app/[...slug]/components/renderers/premium/VideoWithTextRenderer.js
import AppImage from "../../AppImage";

export default function VideoWithTextRenderer({ component, index }) {
  const content = component.content || {};
  const videoPosition = content.videoPosition || 'left';
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.description || 
                    content.features?.length > 0 || 
                    content.videoFile || 
                    content.videoThumbnail;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  return (
    <section 
      key={component.id || index}
      className="py-16 overflow-hidden"
      style={{ backgroundColor: content.backgroundColor || '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${
          videoPosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}>
          
          {/* Video Section */}
          <div className="w-full lg:w-1/2">
            {(content.videoFile || content.videoThumbnail) && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                {content.videoFile ? (
                  // Show uploaded video with autoplay if enabled
                  <div className="relative aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay={content.autoplay || false}
                      muted={content.autoplay || false}
                      loop={content.autoplay || false}
                      controls={!content.autoplay}
                      playsInline
                    >
                      <source src={content.videoFile} type="video/mp4" />
                      <source src={content.videoFile} type="video/webm" />
                      <source src={content.videoFile} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                    {content.autoplay && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        Autoplay
                      </div>
                    )}
                  </div>
                ) : (
                  // Show thumbnail with play button (as placeholder)
                  <div className="relative aspect-video">
                    <AppImage
                      src={content.videoThumbnail}
                      alt={content.videoThumbnailAlt || "Video thumbnail"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-2xl">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className={`${content.contentAlignment === 'center' ? 'text-center' : content.contentAlignment === 'right' ? 'text-right' : 'text-left'}`}>
              
              {/* Title - Beautiful and Bold */}
              {content.title && (
                <h2 
                  className={`mb-6 leading-tight tracking-tight ${content.titleSize || 'text-5xl'} ${content.fontWeight || 'font-extrabold'}`}
                  style={{ 
                    color: content.titleColor || '#1F2937',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {content.title}
                </h2>
              )}

              {/* Description */}
              {content.description && (
                <div 
                  className={`mb-8 leading-relaxed ${content.textSize || 'text-lg'}`}
                  style={{ color: content.textColor || '#4B5563' }}
                >
                  {content.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Features with Custom Colors */}
              {content.features?.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-8">
                  {content.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                      style={{
                        backgroundColor: content.featureBgColor || '#2563EB',
                        color: content.featureTextColor || '#FFFFFF'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}