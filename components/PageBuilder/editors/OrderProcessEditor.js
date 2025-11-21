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
    <div className="space-y-4 p-3">
      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <select
          value={component.content?.backgroundType || 'solid'}
          onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="none">None (Transparent)</option>
        </select>

        {component.content?.backgroundType === 'solid' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.backgroundColor || '#F8F9FB'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.backgroundColor || '#F8F9FB'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#F8F9FB"
            />
          </div>
        )}

        {component.content?.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={component.content?.gradientFrom || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#E21B36"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#FF4B2B'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#FF4B2B'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FF4B2B"
              />
            </div>
          </div>
        )}
      </div>

      {/* Title Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Main title"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.titleColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.titleColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#0B1633"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Size</label>
            <select
              value={component.content?.titleSize || 'text-4xl md:text-5xl'}
              onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-3xl md:text-4xl">Small</option>
              <option value="text-4xl md:text-5xl">Medium</option>
              <option value="text-5xl md:text-6xl">Large</option>
            </select>
          </div>
        </div>
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
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Highlighted Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.highlightedColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { highlightedColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.highlightedColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { highlightedColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#E21B36"
            />
          </div>
        </div>
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
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Description Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.descriptionColor || '#2E3850'}
                onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.descriptionColor || '#2E3850'}
                onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#2E3850"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Description Size</label>
            <select
              value={component.content?.descriptionSize || 'text-lg md:text-base'}
              onChange={(e) => onUpdate(component.id, { descriptionSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-base">Small</option>
              <option value="text-lg md:text-base">Medium</option>
              <option value="text-xl">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step Circle Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Step Circle Colors</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.stepGradientFrom || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { stepGradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.stepGradientFrom || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { stepGradientFrom: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#E21B36"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.stepGradientTo || '#FF4B2B'}
                onChange={(e) => onUpdate(component.id, { stepGradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.stepGradientTo || '#FF4B2B'}
                onChange={(e) => onUpdate(component.id, { stepGradientTo: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FF4B2B"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Step Number Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.stepNumberColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { stepNumberColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.stepNumberColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { stepNumberColor: e.target.value })}
              className="flex-1 p-1 border border-gray-300 rounded text-xs"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
      
      {/* Steps Section */}
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

              {/* Image Preview */}
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
                </div>
              )}
              
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