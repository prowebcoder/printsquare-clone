// components/PageBuilder/editors/ImageEditor.js
const ImageEditor = ({ component, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
        <input
          type="text"
          value={component.content?.src || ''}
          onChange={(e) => onUpdate(component.id, { src: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Image URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
        <input
          type="text"
          value={component.content?.alt || ''}
          onChange={(e) => onUpdate(component.id, { alt: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Alt text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
        <input
          type="text"
          value={component.content?.caption || ''}
          onChange={(e) => onUpdate(component.id, { caption: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Caption (optional)"
        />
      </div>
    </div>
  );
};

export default ImageEditor;