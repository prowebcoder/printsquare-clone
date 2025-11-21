// components/PageBuilder/editors/FreeSampleEditor.js
"use client";

import { useState, useRef } from 'react';

const FreeSampleEditor = ({ component, onUpdate }) => {
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
      {/* Title Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Title"
        />
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Title Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.titleColor || '#1F2937'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.titleColor || '#1F2937'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#1F2937"
            />
          </div>
        </div>
      </div>

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
              value={component.content?.backgroundColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.backgroundColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        )}

        {component.content?.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={component.content?.gradientFrom || '#2e6e97'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#2e6e97'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#2e6e97"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#e21b36'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#e21b36'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#e21b36"
              />
            </div>
          </div>
        )}
      </div>

      {/* Image Position Selector */}
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
            id={`file-upload-${component.id}`}
          />
          <label
            htmlFor={`file-upload-${component.id}`}
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
      </div>

      {/* Button Section */}
      <div className="grid grid-cols-2 gap-3">
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

      {/* Button Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Background Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.buttonBgColor || '#e21b36'}
              onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.buttonBgColor || '#e21b36'}
              onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#e21b36"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.buttonTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { buttonTextColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.buttonTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { buttonTextColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="text"
          value={component.content?.email || ''}
          onChange={(e) => onUpdate(component.id, { email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Email address"
        />
      </div>
      
      {[1, 2, 3].map((num) => (
        <div key={num}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description {num}</label>
          <textarea
            value={component.content?.[`description${num}`] || ''}
            onChange={(e) => onUpdate(component.id, { [`description${num}`]: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={2}
            placeholder={`Description ${num}`}
          />
        </div>
      ))}
    </div>
  );
};

export default FreeSampleEditor;