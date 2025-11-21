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
              className="text-4xl md:text-5xl font-bold tracking-wide flex items-center justify-center gap-3"
              style={{ color: content.titleColor || '#0B1633' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ color: content.titleColor || '#E21B36' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13h6m2 0a9 9 0 11-6.219-8.56M15 13l3 8M6 21h12"
                />
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
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {content.notices.map((notice, noticeIndex) => (
              <div
                key={noticeIndex}
                className="rounded-2xl p-6 border border-gray-200 transition duration-300 hover:shadow-lg hover:border-transparent"
                style={{
                  backgroundColor: content.noticeBoxBgColor || '#FFFFFF',
                  backgroundImage: notice.desc && `linear-gradient(to right, ${content.noticeBoxHoverBgColor || '#FFE3E5'}, ${content.noticeBoxHoverBgColor || '#FFF0E5'})`
                }}
              >
                {/* Notice Title - Only show if exists */}
                {notice.title && (
                  <h3 
                    className="font-semibold text-lg mb-2"
                    style={{ color: content.noticeTitleColor || '#0B1633' }}
                  >
                    {notice.title}
                  </h3>
                )}
                
                {/* Notice Description - Only show if exists */}
                {notice.desc && (
                  <p 
                    className="text-sm mb-3 leading-relaxed"
                    style={{ color: content.noticeDescColor || '#6B7280' }}
                  >
                    {notice.desc}
                  </p>
                )}
                
                {/* Notice Date - Only show if exists */}
                {notice.date && (
                  <p 
                    className="text-xs"
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