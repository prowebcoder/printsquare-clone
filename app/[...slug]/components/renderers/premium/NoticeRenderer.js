// app/[...slug]/components/renderers/premium/NoticeRenderer.js
export default function NoticeRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.buttonText || 
                    content.notices?.length > 0;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#FAFAFA' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#FAFAFA'}, ${content.gradientTo || '#FFFFFF'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Determine grid class based on number of notices
  const getGridClass = () => {
    const noticeCount = content.notices?.length || 0;
    
    if (noticeCount === 0) {
      return 'grid-cols-1';
    } else if (noticeCount === 1) {
      // Single notice - make it full width
      return 'grid-cols-1';
    } else if (noticeCount === 2) {
      // Two notices - show as two columns
      return 'grid-cols-1 md:grid-cols-2';
    } else {
      // Three or more notices - default to 2 columns
      return 'grid-cols-1 md:grid-cols-2';
    }
  };

  // Determine maximum width for single notice
  const getMaxWidthClass = () => {
    const noticeCount = content.notices?.length || 0;
    
    if (noticeCount === 1) {
      // Full width for single notice
      return 'max-w-4xl mx-auto';
    } else {
      // Default layout for multiple notices
      return '';
    }
  };

  return (
    <section
      key={component.id || index}
      className="py-20 relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative gradient circles - Only show if not using gradient background */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading - Only show if title exists */}
        {content.title && (
          <div className="text-center mb-14">
            <h2 
              className="text-4xl md:text-5xl font-extrabold leading-tight tracking-wide flex items-center justify-center gap-3"
              style={{ color: content.titleColor || '#0B1633' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: content.titleColor || '#E21B36' }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              {content.title}
            </h2>
            <div 
              className="w-24 h-1 mx-auto mt-4 rounded-full"
              style={{
                background: `linear-gradient(to right, ${content.buttonBgColor || '#E21B36'}, ${content.noticeBoxHoverBgColor || '#FF4B2B'})`
              }}
            ></div>
          </div>
        )}

        {/* Notices List - Only show if notices exist */}
        {content.notices && content.notices.length > 0 && (
          <div className={`grid ${getGridClass()} gap-8 text-left ${getMaxWidthClass()}`}>
            {content.notices.map((notice, noticeIndex) => (
              <div
                key={noticeIndex}
                className={`rounded-2xl p-6 border border-gray-200 transition duration-300 hover:shadow-lg hover:border-transparent ${
                  content.notices.length === 1 ? 'w-full' : ''
                }`}
                style={{
                  backgroundColor: content.noticeBoxBgColor || '#FFFFFF',
                  backgroundImage: notice.desc && `linear-gradient(to right, ${content.noticeBoxHoverBgColor || '#FFE3E5'}, ${content.noticeBoxHoverBgColor || '#FFF0E5'})`
                }}
              >
                {/* Notice Title - Only show if exists */}
                {notice.title && (
                  <h3 
                    className={`font-extrabold leading-tight ${
                      content.notices.length === 1 ? 'text-2xl md:text-3xl' : 'text-lg'
                    } mb-2`}
                    style={{ color: content.noticeTitleColor || '#0B1633' }}
                  >
                    {notice.title}
                  </h3>
                )}
                
                {/* Notice Description - Only show if exists */}
                {notice.desc && (
                  <p 
                    className={`leading-relaxed ${
                      content.notices.length === 1 ? 'text-base md:text-lg' : 'text-sm'
                    } mb-3`}
                    style={{ color: content.noticeDescColor || '#6B7280' }}
                  >
                    {notice.desc}
                  </p>
                )}
                
                {/* Notice Date - Only show if exists */}
                {notice.date && (
                  <p 
                    className={`${
                      content.notices.length === 1 ? 'text-sm' : 'text-xs'
                    }`}
                    style={{ color: content.noticeDateColor || '#9CA3AF' }}
                  >
                    {notice.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* View All Button - Only show if button text exists */}
        {content.buttonText && (
          <div className="mt-12 text-center">
            <a
              href={content.buttonLink || "#"}
              className="inline-block px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition duration-300"
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
    </section>
  );
}