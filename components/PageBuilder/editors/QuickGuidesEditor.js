// components/PageBuilder/editors/QuickGuidesEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';

const QuickGuidesEditor = ({ component, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

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
        onUpdate(component.id, { 
          image: result.imageUrl,
          imageAlt: component.content?.imageAlt || result.filename
        });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageUrlChange = (e) => {
    onUpdate(component.id, { image: e.target.value });
  };

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
    <div className="space-y-4 p-3">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Title"
        />
      </div>

      {/* Highlighted Title */}
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

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={component.content?.backgroundColor || '#0B1633'}
            onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={component.content?.backgroundColor || '#0B1633'}
            onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
            className="flex-1 p-2 border border-gray-300 rounded text-sm"
            placeholder="#0B1633"
          />
        </div>
      </div>

      {/* Image Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Position</label>
        <select
          value={component.content?.imagePosition || 'left'}
          onChange={(e) => onUpdate(component.id, { imagePosition: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="left">Image on Left</option>
          <option value="right">Image on Right</option>
        </select>
      </div>
      
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
        
        <div className="mb-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            id={`quick-guides-upload-${component.id}`}
          />
          <label
            htmlFor={`quick-guides-upload-${component.id}`}
            className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-block ${
              uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </label>
        </div>

        {/* Image Preview */}
        {component.content?.image && (
          <div className="relative border rounded-lg p-2 bg-gray-50">
            <div className="relative h-40 w-full border rounded overflow-hidden">
              <img 
                src={component.content.image} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onUpdate(component.id, { image: '' })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* URL Input */}
        <div className="mt-2">
          <input
            type="text"
            value={component.content?.image || ''}
            onChange={handleImageUrlChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Or enter image URL"
          />
        </div>
      </div>
      
      {/* Image Alt Text */}
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

      {/* Number Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={component.content?.numberColor || '#E21B36'}
            onChange={(e) => onUpdate(component.id, { numberColor: e.target.value })}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={component.content?.numberColor || '#E21B36'}
            onChange={(e) => onUpdate(component.id, { numberColor: e.target.value })}
            className="flex-1 p-2 border border-gray-300 rounded text-sm"
            placeholder="#E21B36"
          />
        </div>
      </div>
      
      {/* Description */}
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
      
      {/* Guides */}
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