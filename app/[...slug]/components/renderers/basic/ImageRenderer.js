// app/[...slug]/components/renderers/basic/ImageRenderer.js
import AppImage from "../../AppImage";

export default function ImageRenderer({ component, index }) {
  const content = component.content || {};
  return (
    <figure key={component.id || index} className="my-6 text-center p-6">
      {content.src ? (
        <AppImage
          src={content.src}
          alt={content.alt || 'Image'}
          width={800}
          height={600}
          className="mx-auto max-w-full h-auto rounded-lg"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image selected</span>
        </div>
      )}
      {content.caption && (
        <figcaption className="text-center text-gray-600 mt-2 text-sm">
          {content.caption}
        </figcaption>
      )}
    </figure>
  );
}