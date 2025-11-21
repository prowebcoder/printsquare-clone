// app/[...slug]/components/renderers/premium/QuickGuidesRenderer.js
import { ArrowRight } from 'lucide-react';
import AppImage from "../../AppImage";

export default function QuickGuidesRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering QuickGuides:`, content);
  
  return (
    <section
      key={component.id || index}
      className="relative bg-[#0B1633] py-24 overflow-hidden"
    >
      {/* Decorative Gradient Lights */}
      <div className="absolute top-10 right-10 w-56 h-56 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-[#FF4B2B]/20 to-[#E21B36]/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-6 lg:px-12">
        {/* Left Image */}
        {content.image && (
          <div className="w-full md:w-1/2 relative group">
            <div className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]">
              <AppImage
                src={content.image}
                alt={content.title || "Quick Guide"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-tr from-[#E21B36]/30 to-[#FF4B2B]/30 rounded-full blur-2xl"></div>
          </div>
        )}

        {/* Right Text & Cards */}
        <div className={`w-full ${content.image ? "md:w-1/2" : "md:w-2/3 mx-auto"} text-white`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight text-center md:text-left">
            {content.title?.split(" ")[0] || "Quick"}{" "}
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              {content.title?.split(" ")[1] || "Guides"}
            </span>
          </h2>

          {/* Guide List */}
          <div className="space-y-6">
            {(content.guides || []).map((guide, idx) => (
              <a
                key={idx}
                href={guide.href || "#"}
                className="group flex justify-between items-center p-5 bg-[#121A2C] rounded-2xl border border-[#2E3850] hover:border-[#E21B36] hover:bg-[#1A2438] transition-all duration-300 shadow-lg hover:shadow-red-900/20 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#E21B36] font-extrabold text-xl">{`0${idx + 1}`}</span>
                  <span className="font-semibold text-[#D6D9E0] text-lg group-hover:text-white">
                    {guide.title}
                  </span>
                </div>
                <ArrowRight
                  size={22}
                  className="text-[#D6D9E0] group-hover:text-[#E21B36] transition-transform duration-300 group-hover:translate-x-3"
                />
              </a>
            ))}
          </div>

          {/* Description */}
          {content.description && (
            <p className="mt-10 text-[#D6D9E0] text-sm md:text-base leading-relaxed max-w-lg">
              {content.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}