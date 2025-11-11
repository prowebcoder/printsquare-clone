// components/PageBuilder/editors/VideoBannerEditor.js
const VideoBannerEditor = ({ component, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Text</label>
        <input
          type="text"
          value={component.content?.highlightedText || ''}
          onChange={(e) => onUpdate(component.id, { highlightedText: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Highlighted text (colored)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Normal Text</label>
        <input
          type="text"
          value={component.content?.normalText || ''}
          onChange={(e) => onUpdate(component.id, { normalText: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Normal text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={component.content?.description || ''}
          onChange={(e) => onUpdate(component.id, { description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Video banner description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
        <input
          type="text"
          value={component.content?.videoUrl || ''}
          onChange={(e) => onUpdate(component.id, { videoUrl: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Video file URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Video Alt Text</label>
        <input
          type="text"
          value={component.content?.videoAlt || ''}
          onChange={(e) => onUpdate(component.id, { videoAlt: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Video alt text"
        />
      </div>
    </div>
  );
};

export default VideoBannerEditor;