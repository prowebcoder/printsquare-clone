// components/PageBuilder/editors/HeroBannerEditor.js
"use client";

import { useState, useRef } from 'react';

const HeroBannerEditor = ({ component, onUpdate }) => {
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
        // Update component with the new background image URL
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
      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <select
          value={component.content?.backgroundType || 'image'}
          onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        >
          <option value="image">Background Image</option>
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
        </select>

        {component.content?.backgroundType === 'solid' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.backgroundColor || '#000000'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.backgroundColor || '#000000'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#000000"
            />
          </div>
        )}

        {component.content?.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={component.content?.gradientFrom || '#1E40AF'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#1E40AF'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#1E40AF"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#7E22CE'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#7E22CE'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#7E22CE"
              />
            </div>
          </div>
        )}
      </div>

      {/* Background Image Upload Section - Only show if background type is image */}
      {(!component.content?.backgroundType || component.content?.backgroundType === 'image') && (
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
              id={`hero-banner-upload-${component.id}`}
            />
            <label
              htmlFor={`hero-banner-upload-${component.id}`}
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
              <p className="text-xs text-gray-600 mb-2">Background Preview:</p>
              <div className="relative h-32 w-full border rounded overflow-hidden">
                <img 
                  src={component.content.backgroundImage} 
                  alt="Hero banner preview" 
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
            </div>
          )}
          
          {/* Background Overlay */}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Overlay</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Overlay Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={component.content?.overlayColor || '#000000'}
                    onChange={(e) => onUpdate(component.id, { overlayColor: e.target.value })}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={component.content?.overlayColor || '#000000'}
                    onChange={(e) => onUpdate(component.id, { overlayColor: e.target.value })}
                    className="flex-1 p-1 border border-gray-300 rounded text-xs"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">Overlay Opacity</label>
                <select
                  value={component.content?.overlayOpacity || '40'}
                  onChange={(e) => onUpdate(component.id, { overlayOpacity: e.target.value })}
                  className="w-full p-1 border border-gray-300 rounded text-xs"
                >
                  <option value="10">10%</option>
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                  <option value="40">40%</option>
                  <option value="50">50%</option>
                  <option value="60">60%</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Background Image Tips */}
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
            <strong>Tip:</strong> For hero banners, use high-quality landscape images (recommended: 1920x1080px or larger). Darker images work better with white text overlays.
          </div>
        </div>
      )}

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
                value={component.content?.titleColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.titleColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Size</label>
            <select
              value={component.content?.titleSize || 'text-4xl md:text-6xl'}
              onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-3xl md:text-5xl">Small</option>
              <option value="text-4xl md:text-6xl">Medium</option>
              <option value="text-5xl md:text-7xl">Large</option>
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={component.content?.subtitle || ''}
          onChange={(e) => onUpdate(component.id, { subtitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Subtitle"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Subtitle Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.subtitleColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { subtitleColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.subtitleColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { subtitleColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Subtitle Size</label>
            <select
              value={component.content?.subtitleSize || 'text-2xl md:text-3xl'}
              onChange={(e) => onUpdate(component.id, { subtitleSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-xl md:text-2xl">Small</option>
              <option value="text-2xl md:text-3xl">Medium</option>
              <option value="text-3xl md:text-4xl">Large</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerEditor;