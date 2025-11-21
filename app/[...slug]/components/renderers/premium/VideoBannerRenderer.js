// app/[...slug]/components/renderers/premium/VideoBannerRenderer.js
export default function VideoBannerRenderer({ component, index }) {
  const content = component.content || {};
  return (
    <section
      key={component.id || index}
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={content.videoUrl || "/homepage/video/printing.mp4"}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Decorative Glows */}
      <div className="absolute -top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-gradient-to-tr from-[#FF4B2B]/20 to-[#E21B36]/20 rounded-full blur-3xl"></div>

      {/* Text Overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.highlightedText || "High-Quality"}
          </span>{" "}
          <span className="text-white">
            {content.normalText || "Printing at Affordable Prices"}
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          {content.description ||
            "Print Seoul delivers premium book printing with advanced technology, flawless finishing, and exceptional value perfect for businesses and creators."}
        </p>

        {/* Optional CTA Button */}
        {content.buttonText && (
          <a
            href={content.buttonLink || "#"}
            className="mt-8 inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}