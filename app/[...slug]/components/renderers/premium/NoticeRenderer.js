// app/[...slug]/components/renderers/premium/NoticeRenderer.js
export default function NoticeRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering Notice:`, content);
  
  return (
    <section
      key={component.id || index}
      className="bg-[#FAFAFA] py-20 text-gray-900 relative overflow-hidden"
    >
      {/* Decorative gradient circles */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide flex items-center justify-center gap-3 text-[#0B1633]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#E21B36]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m2 0a9 9 0 11-6.219-8.56M15 13l3 8M6 21h12"
              />
            </svg>
            {content.title || "Latest Notices"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Notices List */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {(content.notices || []).map((notice, noticeIndex) => (
            <div
              key={noticeIndex}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-transparent hover:bg-gradient-to-r hover:from-[#FFE3E5] hover:to-[#FFF0E5] transition duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {notice.title || "Notice Title"}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {notice.desc ||
                  "This is a short description for the notice or announcement."}
              </p>
              <p className="text-xs text-gray-400">{notice.date || "MM.DD.YYYY"}</p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {content.buttonText && (
          <div className="mt-12 text-center">
            <a
              href={content.buttonLink || "#"}
              className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition duration-300"
            >
              {content.buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}