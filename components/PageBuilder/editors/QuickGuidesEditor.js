// components/PageBuilder/editors/QuickGuidesEditor.js
import { Trash2 } from 'lucide-react';

const QuickGuidesEditor = ({ component, onUpdate }) => {
  const handleGuideChange = (index, field, value) => {
    const newGuides = [...(component.content?.guides || [])];
    newGuides[index] = { ...newGuides[index], [field]: value };
    onUpdate(component.id, { guides: newGuides });
  };

  const addGuide = () => {
    const newGuides = [...(component.content?.guides || []), {
      title: 'New Guide',
      href: '#'
    }];
    onUpdate(component.id, { guides: newGuides });
  };

  const removeGuide = (index) => {
    const newGuides = (component.content?.guides || []).filter((_, i) => i !== index);
    onUpdate(component.id, { guides: newGuides });
  };

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
        <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Title</label>
        <input
          type="text"
          value={component.content?.highlightedTitle || ''}
          onChange={(e) => onUpdate(component.id, { highlightedTitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Highlighted title part"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={component.content?.description || ''}
          onChange={(e) => onUpdate(component.id, { description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Section description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
        <input
          type="text"
          value={component.content?.image || ''}
          onChange={(e) => onUpdate(component.id, { image: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Image URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
        <input
          type="text"
          value={component.content?.imageAlt || ''}
          onChange={(e) => onUpdate(component.id, { imageAlt: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Image alt text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Guides</label>
        {component.content?.guides?.map((guide, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={guide.title}
              onChange={(e) => handleGuideChange(index, 'title', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Guide title"
            />
            <input
              type="text"
              value={guide.href}
              onChange={(e) => handleGuideChange(index, 'href', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Guide link"
            />
            <button
              type="button"
              onClick={() => removeGuide(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addGuide}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Guide
        </button>
      </div>
    </div>
  );
};

export default QuickGuidesEditor;