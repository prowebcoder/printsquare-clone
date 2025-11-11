// components/PageBuilder/editors/ImageBannerEditor.js
import { Trash2 } from 'lucide-react';

const ImageBannerEditor = ({ component, onUpdate }) => {
  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...(component.content?.paragraphs || [])];
    newParagraphs[index] = value;
    onUpdate(component.id, { paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    const newParagraphs = [...(component.content?.paragraphs || []), 'New paragraph'];
    onUpdate(component.id, { paragraphs: newParagraphs });
  };

  const removeParagraph = (index) => {
    const newParagraphs = (component.content?.paragraphs || []).filter((_, i) => i !== index);
    onUpdate(component.id, { paragraphs: newParagraphs });
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
          placeholder="Banner title"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
        <input
          type="text"
          value={component.content?.buttonText || ''}
          onChange={(e) => onUpdate(component.id, { buttonText: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Button text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Paragraphs</label>
        {component.content?.paragraphs?.map((paragraph, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <textarea
              value={paragraph}
              onChange={(e) => handleParagraphChange(index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              rows={2}
              placeholder={`Paragraph ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeParagraph(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addParagraph}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Paragraph
        </button>
      </div>
    </div>
  );
};

export default ImageBannerEditor;