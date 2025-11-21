// app/[...slug]/components/renderers/premium/ImageBannerTwoRenderer.js
import AppImage from "../../AppImage";

export default function ImageBannerTwoRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering ImageBannerTwo:`, content);
  
  return (
    <section key={component.id || index} className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            {content.title || "Special Order Available"}
          </h2>
          
          {(content.paragraphs || []).map((paragraph, pIndex) => (
            <p key={pIndex} className="text-lg text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {content.buttonText && (
            <a
              href={content.buttonLink || '#'}
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.buttonText}
            </a>
          )}
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
            <AppImage
              src={content.image || '/homepage/main-sec06-1.png'}
              alt="Special order book printing"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}