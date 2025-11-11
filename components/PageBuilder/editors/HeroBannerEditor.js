// components/PageBuilder/editors/HeroBannerEditor.js
const HeroBannerEditor = ({ component, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Main title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={component.content?.subtitle || ''}
          onChange={(e) => onUpdate(component.id, { subtitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Subtitle"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
        <input
          type="text"
          value={component.content?.backgroundImage || ''}
          onChange={(e) => onUpdate(component.id, { backgroundImage: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Background image URL"
        />
      </div>
    </div>
  );
};

export default HeroBannerEditor;