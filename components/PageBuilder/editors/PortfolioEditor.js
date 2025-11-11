// components/PageBuilder/editors/PortfolioEditor.js
import { Trash2 } from 'lucide-react';

const PortfolioEditor = ({ component, onUpdate }) => {
  const handleImageChange = (index, field, value) => {
    const newImages = [...(component.content?.images || [])];
    newImages[index] = { ...newImages[index], [field]: value };
    onUpdate(component.id, { images: newImages });
  };

  const addImage = () => {
    const newImages = [...(component.content?.images || []), {
      key: `portfolio-${(component.content?.images?.length || 0) + 1}`,
      url: '/homepage/p1.jpg',
      alt: 'Portfolio image'
    }];
    onUpdate(component.id, { images: newImages });
  };

  const removeImage = (index) => {
    const newImages = (component.content?.images || []).filter((_, i) => i !== index);
    onUpdate(component.id, { images: newImages });
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={component.content?.subtitle || ''}
          onChange={(e) => onUpdate(component.id, { subtitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Subtitle"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            value={component.content?.buttonText || ''}
            onChange={(e) => onUpdate(component.id, { buttonText: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Button text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="text"
            value={component.content?.buttonLink || ''}
            onChange={(e) => onUpdate(component.id, { buttonLink: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Button link"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Images</label>
        {component.content?.images?.map((image, index) => (
          <div key={index} className="border p-3 rounded-lg mb-2">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Image {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                value={image.key}
                onChange={(e) => handleImageChange(index, 'key', e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Image key"
              />
              <input
                type="text"
                value={image.url}
                onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Image URL"
              />
              <input
                type="text"
                value={image.alt}
                onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Alt text"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Image
        </button>
      </div>
    </div>
  );
};

export default PortfolioEditor;