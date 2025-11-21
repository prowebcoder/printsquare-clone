// app/[...slug]/components/renderers/premium/PortfolioRenderer.js
import AppImage from "../../AppImage";

export default function PortfolioRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering Portfolio:`, content);
  
  return (
    <section
      key={component.id || index}
      className="relative bg-[#F8F9FB] py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-[#0B1633]">
          {content.title?.split(" ")[0] || "Our"}{" "}
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.title?.split(" ")[1] || "Portfolio"}
          </span>{" "}
          Showcase
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {(content.images || []).map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="group relative overflow-hidden rounded-xl shadow-lg border border-[#2E3850]/10 bg-white hover:shadow-2xl transition-shadow duration-500"
            >
              <AppImage
                src={image.url}
                alt={image.alt || "Portfolio image"}
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#E21B36]/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Button */}
        {content.buttonText && (
          <a
            href={content.buttonLink || "/portfolio"}
            className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}