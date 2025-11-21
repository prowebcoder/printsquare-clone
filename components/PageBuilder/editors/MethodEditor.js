// components/PageBuilder/editors/MethodEditor.js
"use client";

import { useState, useRef } from 'react';

const MethodEditor = ({ component, onUpdate }) => {
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
              value={component.content?.descriptionSize || 'text-lg'}
              onChange={(e) => onUpdate(component.id, { descriptionSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-base">Small</option>
              <option value="text-lg">Medium</option>
              <option value="text-xl">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Badge Gradient Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Gradient Colors</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.badgeGradientFrom || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { badgeGradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.badgeGradientFrom || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { badgeGradientFrom: e.target.value })}
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
                value={component.content?.badgeGradientTo || '#FF4B2B'}
                onChange={(e) => onUpdate(component.id, { badgeGradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.badgeGradientTo || '#FF4B2B'}
                onChange={(e) => onUpdate(component.id, { badgeGradientTo: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FF4B2B"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Badge Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.badgeTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { badgeTextColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.badgeTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { badgeTextColor: e.target.value })}
              className="flex-1 p-1 border border-gray-300 rounded text-xs"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
      
      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
        
        {/* Upload Button */}
        <div className="mb-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            id={`method-editor-upload-${component.id}`}
          />
          <label
            htmlFor={`method-editor-upload-${component.id}`}
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

        {/* Image Preview */}
        {component.content?.image && (
          <div className="relative border rounded-lg p-2 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Image Preview:</p>
            <div className="relative h-32 w-full border rounded overflow-hidden">
              <img 
                src={component.content.image} 
                alt="Method preview" 
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
        
        {/* Image Tips */}
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
          <strong>Tip:</strong> This image appears at the bottom of the methods section. Use high-quality images that represent your proofing methods.
        </div>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <h4 className="font-medium mb-3">Method 1</h4>
          <div className="space-y-2">
            <input
              type="text"
              value={component.content?.method1?.title || ''}
              onChange={(e) => onUpdate(component.id, { 
                method1: { ...component.content?.method1, title: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Method 1 title"
            />
            <textarea
              value={component.content?.method1?.description || ''}
              onChange={(e) => onUpdate(component.id, { 
                method1: { ...component.content?.method1, description: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Method 1 description"
            />
          </div>
        </div>
        <div className="border p-4 rounded-lg">
          <h4 className="font-medium mb-3">Method 2</h4>
          <div className="space-y-2">
            <input
              type="text"
              value={component.content?.method2?.title || ''}
              onChange={(e) => onUpdate(component.id, { 
                method2: { ...component.content?.method2, title: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Method 2 title"
            />
            <textarea
              value={component.content?.method2?.description || ''}
              onChange={(e) => onUpdate(component.id, { 
                method2: { ...component.content?.method2, description: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Method 2 description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodEditor;