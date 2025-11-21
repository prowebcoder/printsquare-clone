// app/[...slug]/components/renderers/premium/HeroBannerRenderer.js
import AppImage from "../../AppImage";

export default function HeroBannerRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering HeroBanner:`, content);
  
  return (
    <section key={component.id || index} className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
      <AppImage
        src={content.backgroundImage || '/homepage/main-bg.jpg'}
        alt="Printsquare background"
        fill
        priority
        className="object-cover brightness-95"
      />
      <div className="relative z-10 text-center px-4">
        <h2 className="text-white text-2xl md:text-3xl font-light mb-2 drop-shadow-md">
          {content.subtitle || "Quality prints. Fair prices. Print Seoul"}
        </h2>
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
          {content.title || "Your printing partner that cares."}
        </h1>
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
}