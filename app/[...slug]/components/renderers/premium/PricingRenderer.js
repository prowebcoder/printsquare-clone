// app/[...slug]/components/renderers/premium/PricingRenderer.js
import AppImage from "../../AppImage";
export default function PricingRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering Pricing:`, content);
  
  return (
    <section
      key={component.id || index}
      className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Glow Elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
          {content.title?.split(" ")[0] || "Affordable"}{" "}
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.title?.split(" ")[1] || "Printing Prices"}
          </span>
        </h2>

        {/* Description */}
        <div className="space-y-6 text-lg text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          {content.description1 && <p>{content.description1}</p>}
          {content.description2 && <p>{content.description2}</p>}
        </div>

        {/* Sample Specification Box */}
        {content.sampleTitle && (
          <div
            data-aos="zoom-in"
            className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-3xl p-10 max-w-lg mx-auto shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r from-[#E21B36] to-[#FF4B2B]" />
            <h3 className="text-2xl font-bold mb-8 text-white tracking-wide">
              {content.sampleTitle}
            </h3>

            <div className="space-y-5 text-left">
              {(content.specifications || []).map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-700 pb-3"
                >
                  <span className="text-gray-400">{spec.label}</span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        {content.footerNote && (
          <p className="mt-10 text-gray-500 text-sm italic max-w-2xl mx-auto">
            {content.footerNote}
          </p>
        )}
      </div>
    </section>
  );
}