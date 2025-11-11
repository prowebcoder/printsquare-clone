// components/PageBuilder/editors/OrderProcessEditor.js
import { Trash2 } from 'lucide-react';

const OrderProcessEditor = ({ component, onUpdate }) => {
  const handleStepChange = (index, field, value) => {
    const newSteps = [...(component.content?.steps || [])];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onUpdate(component.id, { steps: newSteps });
  };

  const addStep = () => {
    const newSteps = [...(component.content?.steps || []), {
      id: `0${(component.content?.steps?.length || 0) + 1}`,
      title: 'New Step',
      desc: 'Step description...',
      image: '/homepage/main-process1.jpg'
    }];
    onUpdate(component.id, { steps: newSteps });
  };

  const removeStep = (index) => {
    const newSteps = (component.content?.steps || []).filter((_, i) => i !== index);
    onUpdate(component.id, { steps: newSteps });
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Steps</label>
        {component.content?.steps?.map((step, index) => (
          <div key={index} className="border p-4 rounded-lg mb-3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Step {step.id}</h4>
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                value={step.id}
                onChange={(e) => handleStepChange(index, 'id', e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Step ID (e.g., 01)"
              />
              <input
                type="text"
                value={step.title}
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Step title"
              />
              <input
                type="text"
                value={step.desc}
                onChange={(e) => handleStepChange(index, 'desc', e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Step description"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                value={step.image}
                onChange={(e) => handleStepChange(index, 'image', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Step image URL"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Step
        </button>
      </div>
    </div>
  );
};

export default OrderProcessEditor;