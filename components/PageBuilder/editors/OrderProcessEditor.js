// components/PageBuilder/editors/OrderProcessEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';

const OrderProcessEditor = ({ component, onUpdate }) => {
  const [uploadingSteps, setUploadingSteps] = useState({});
  const fileInputRefs = useRef({});

  const handleStepImageUpload = async (index, file) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Set uploading state for this specific step
    setUploadingSteps(prev => ({ ...prev, [index]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update the specific step with the new image URL
        const newSteps = [...(component.content?.steps || [])];
        newSteps[index] = { ...newSteps[index], image: result.imageUrl };
        onUpdate(component.id, { steps: newSteps });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingSteps(prev => ({ ...prev, [index]: false }));
      // Reset file input
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = '';
      }
    }
  };

  const handleStepImageUrlChange = (index, value) => {
    const newSteps = [...(component.content?.steps || [])];
    newSteps[index] = { ...newSteps[index], image: value };
    onUpdate(component.id, { steps: newSteps });
  };

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
            
            {/* Step Image Upload Section */}
            <div className="mt-3">
              <label className="block text-sm text-gray-600 mb-1">Step Image</label>
              
              {/* Upload Button */}
              <div className="mb-2">
                <input
                  type="file"
                  ref={el => fileInputRefs.current[index] = el}
                  onChange={(e) => handleStepImageUpload(index, e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                  id={`step-image-upload-${component.id}-${index}`}
                />
                <label
                  htmlFor={`step-image-upload-${component.id}-${index}`}
                  className={`cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-sm inline-block ${
                    uploadingSteps[index] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {uploadingSteps[index] ? 'Uploading...' : 'Upload Step Image'}
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Supports JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>

              {/* Image Preview and URL Input */}
              <div className="space-y-2">
                {step.image && (
                  <div className="relative border rounded p-2 bg-gray-50">
                    <p className="text-xs text-gray-600 mb-1">Step Image Preview:</p>
                    <div className="relative h-20 w-full border rounded overflow-hidden">
                      <img 
                        src={step.image} 
                        alt="Step preview" 
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => handleStepChange(index, 'image', '')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      Current: {step.image}
                    </p>
                  </div>
                )}
                
                {/* URL Input as fallback */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Or enter image URL:</label>
                  <input
                    type="text"
                    value={step.image}
                    onChange={(e) => handleStepImageUrlChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="https://example.com/step-image.jpg"
                  />
                </div>
              </div>
              
              {/* Image Tips */}
              <div className="mt-1 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <strong>Tip:</strong> Use small, clear icons or images that represent each step (recommended: 144x96px).
              </div>
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