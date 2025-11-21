// components/PageBuilder/editors/AboutHeroEditor.js
"use client";

import { useState, useRef } from 'react';

const AboutHeroEditor = ({ component, onUpdate }) => {
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
        onUpdate(component.id, { backgroundImage: result.imageUrl });
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
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title Tag</label>
          <select
            value={component.content?.titleTag || 'h1'}
            onChange={(e) => onUpdate(component.id, { titleTag: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={component.content?.title || ''}
            onChange={(e) => onUpdate(component.id, { title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter title (e.g., About)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Title</label>
          <input
            type="text"
            value={component.content?.highlightedTitle || ''}
            onChange={(e) => onUpdate(component.id, { highlightedTitle: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter highlighted text (e.g., Us)"
          />
        </div>

        {/* Title Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title Size</label>
          <select
            value={component.content?.titleSize || 'text-3xl md:text-5xl'}
            onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="text-2xl md:text-4xl">Small</option>
            <option value="text-3xl md:text-5xl">Medium</option>
            <option value="text-4xl md:text-6xl">Large</option>
            <option value="text-5xl md:text-7xl">Extra Large</option>
          </select>
        </div>
      </div>

      {/* Color Options */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.titleColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.titleColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.highlightedColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { highlightedColor: e.target.value })}
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
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

      {/* Subtitle Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <textarea
          value={component.content?.subtitle || ''}
          onChange={(e) => onUpdate(component.id, { subtitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Enter subtitle text"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Subtitle Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.subtitleColor || '#D6D9E0'}
                onChange={(e) => onUpdate(component.id, { subtitleColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.subtitleColor || '#D6D9E0'}
                onChange={(e) => onUpdate(component.id, { subtitleColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#D6D9E0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Subtitle Size</label>
            <select
              value={component.content?.subtitleSize || 'text-sm md:text-base'}
              onChange={(e) => onUpdate(component.id, { subtitleSize: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="text-xs md:text-sm">Extra Small</option>
              <option value="text-sm md:text-base">Small</option>
              <option value="text-base md:text-lg">Medium</option>
              <option value="text-lg md:text-xl">Large</option>
              <option value="text-xl md:text-2xl">Extra Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Background Overlay Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Overlay Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={component.content?.overlayColor || '#0B1633'}
            onChange={(e) => onUpdate(component.id, { overlayColor: e.target.value })}
            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={component.content?.overlayColor || '#0B1633'}
            onChange={(e) => onUpdate(component.id, { overlayColor: e.target.value })}
            className="flex-1 p-2 border border-gray-300 rounded text-sm"
            placeholder="#0B1633"
          />
          <select
            value={component.content?.overlayOpacity || '70'}
            onChange={(e) => onUpdate(component.id, { overlayOpacity: e.target.value })}
            className="p-2 border border-gray-300 rounded text-sm"
          >
            <option value="30">30%</option>
            <option value="50">50%</option>
            <option value="70">70%</option>
            <option value="90">90%</option>
          </select>
        </div>
      </div>

      {/* Image Upload Section - Only Upload Option */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
        
        {/* Upload Button */}
        <div className="mb-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            id={`aboutus-image-upload-${component.id}`}
          />
          <label
            htmlFor={`aboutus-image-upload-${component.id}`}
            className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-block ${
              uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Background Image'}
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Supports JPG, PNG, WEBP (Max 5MB)
          </p>
        </div>

        {/* Image Preview */}
        {component.content?.backgroundImage && (
          <div className="relative border rounded-lg p-2 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Image Preview:</p>
            <div className="relative h-40 w-full border rounded overflow-hidden">
              <img 
                src={component.content.backgroundImage} 
                alt="About us preview" 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onUpdate(component.id, { backgroundImage: '' })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">
              Current: {component.content.backgroundImage}
            </p>
          </div>
        )}
        
        {/* Image Tips */}
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
          <strong>Tip:</strong> For best results, use high-quality landscape-oriented images (recommended: 1920x1080px or similar ratio).
        </div>
      </div>
    </div>
  );
};

export default AboutHeroEditor;