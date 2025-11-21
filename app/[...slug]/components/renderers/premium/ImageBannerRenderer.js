// app/[...slug]/components/renderers/premium/HeroBannerRenderer.js
import AppImage from "../../AppImage";

export default function ImageBannerRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering ImageBanner:`, content);
  
  return (
    <section key={component.id || index} className="bg-[#0B1633] pt-16 pb-0 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title || "Find Your Perfect Paper Match!"}
          </h2>
          
          {(content.paragraphs || []).map((paragraph, pIndex) => (
            <p key={pIndex} className="text-base mb-4 leading-relaxed text-[#D6D9E0]">
              {paragraph}
            </p>
          ))}

          {content.buttonText && (
            <button className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold py-2 px-6 rounded-sm hover:opacity-90 transition-all duration-300">
              {content.buttonText}
            </button>
          )}
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <AppImage
            src={content.image || '/homepage/paper.png'}
            alt="High-quality paper"
            width={650}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}