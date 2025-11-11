// components/PageBuilder/editors/PricingEditor.js
import { Trash2 } from 'lucide-react';

const PricingEditor = ({ component, onUpdate }) => {
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...(component.content?.specifications || [])];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    onUpdate(component.id, { specifications: newSpecs });
  };

  const addSpec = () => {
    const newSpecs = [...(component.content?.specifications || []), {
      label: 'New Specification',
      value: 'Value'
    }];
    onUpdate(component.id, { specifications: newSpecs });
  };

  const removeSpec = (index) => {
    const newSpecs = (component.content?.specifications || []).filter((_, i) => i !== index);
    onUpdate(component.id, { specifications: newSpecs });
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Description 1</label>
        <textarea
          value={component.content?.description1 || ''}
          onChange={(e) => onUpdate(component.id, { description1: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={2}
          placeholder="First description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description 2</label>
        <textarea
          value={component.content?.description2 || ''}
          onChange={(e) => onUpdate(component.id, { description2: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={2}
          placeholder="Second description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sample Title</label>
        <input
          type="text"
          value={component.content?.sampleTitle || ''}
          onChange={(e) => onUpdate(component.id, { sampleTitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Sample specification title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Currency Note</label>
        <input
          type="text"
          value={component.content?.currencyNote || ''}
          onChange={(e) => onUpdate(component.id, { currencyNote: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Currency note text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Footer Note</label>
        <input
          type="text"
          value={component.content?.footerNote || ''}
          onChange={(e) => onUpdate(component.id, { footerNote: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Footer note text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
        {component.content?.specifications?.map((spec, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={spec.label}
              onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Label"
            />
            <input
              type="text"
              value={spec.value}
              onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Value"
            />
            <button
              type="button"
              onClick={() => removeSpec(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpec}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Specification
        </button>
      </div>
    </div>
  );
};

export default PricingEditor;