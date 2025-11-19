// components/PageBuilder/editors/PricingEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';

const PricingEditor = ({ component, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
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

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update component with the new image URL
        onUpdate(component.id, { image: result.imageUrl });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageUrlChange = (e) => {
    onUpdate(component.id, { image: e.target.value });
  };

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
      
      {/* Optional Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Optional Image</label>
        
        {/* Upload Button */}
        <div className="mb-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            id={`pricing-image-upload-${component.id}`}
          />
          <label
            htmlFor={`pricing-image-upload-${component.id}`}
            className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-block ${
              uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Supports JPG, PNG, WEBP (Max 5MB)
          </p>
        </div>

        {/* Image Preview and URL Input */}
        <div className="space-y-2">
          {component.content?.image && (
            <div className="relative border rounded-lg p-2 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Image Preview:</p>
              <div className="relative h-32 w-full border rounded overflow-hidden">
                <img 
                  src={component.content.image} 
                  alt="Pricing preview" 
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => onUpdate(component.id, { image: '' })}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">
                Current: {component.content.image}
              </p>
            </div>
          )}
          
          {/* URL Input as fallback */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Or enter image URL:</label>
            <input
              type="text"
              value={component.content?.image || ''}
              onChange={handleImageUrlChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        {/* Image Tips */}
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
          <strong>Optional:</strong> Add an image to showcase your product or service. This will appear in the pricing section if provided.
        </div>
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