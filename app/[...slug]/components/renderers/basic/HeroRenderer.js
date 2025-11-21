// app/[...slug]/components/renderers/basic/HeroRenderer.js
import AppImage from "../../AppImage";

export default function HeroRenderer({ component, index }) {
  const content = component.content || {};
  return (
    <section key={component.id || index} className="relative w-full h-64 flex items-center justify-center bg-gray-100">
      {content.backgroundImage && (
        <AppImage
          src={content.backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
        />
      )}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
          {content.title || 'Hero Title'}
        </h1>
        <p className="text-xl text-white mb-6 drop-shadow-md">
          {content.subtitle || 'Hero Subtitle'}
        </p>
        {content.buttonText && (
          <a
            href={content.buttonLink || '#'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {content.buttonText}
          </a>
        )}
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </section>
  );
}