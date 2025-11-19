// components/PageBuilder/editors/ImageEditor.js
"use client";

import { useState, useRef } from 'react';

const ImageEditor = ({ component, onUpdate }) => {
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
        onUpdate(component.id, { src: result.imageUrl });
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
    onUpdate(component.id, { src: e.target.value });
  };

  return (
    <div className="space-y-3">
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
            id={`image-editor-upload-${component.id}`}
          />
          <label
            htmlFor={`image-editor-upload-${component.id}`}
            className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-block ${
              uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Supports JPG, PNG, WEBP, GIF (Max 5MB)
          </p>
        </div>

        {/* Image Preview and URL Input */}
        <div className="space-y-2">
          {component.content?.src && (
            <div className="relative border rounded-lg p-2 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Image Preview:</p>
              <div className="relative w-full border rounded overflow-hidden">
                <img 
                  src={component.content.src} 
                  alt="Preview" 
                  className="w-full h-auto max-h-48 object-contain mx-auto"
                />
                <button
                  type="button"
                  onClick={() => onUpdate(component.id, { src: '' })}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">
                Current: {component.content.src}
              </p>
            </div>
          )}
          
          {/* URL Input as fallback */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Or enter image URL:</label>
            <input
              type="text"
              value={component.content?.src || ''}
              onChange={handleImageUrlChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        {/* Image Tips */}
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
          <strong>Tip:</strong> This is a standalone image component. Upload any image type and it will be displayed at full width with optional caption.
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
        <input
          type="text"
          value={component.content?.alt || ''}
          onChange={(e) => onUpdate(component.id, { alt: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Alt text"
        />
        <p className="text-xs text-gray-500 mt-1">
          Important for accessibility and SEO. Describe what the image shows.
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
        <input
          type="text"
          value={component.content?.caption || ''}
          onChange={(e) => onUpdate(component.id, { caption: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Caption (optional)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional caption that appears below the image.
        </p>
      </div>

      {/* Additional Options for Basic Image Component */}
      <div className="border-t pt-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Style</label>
        <select
          value={component.content?.style || 'default'}
          onChange={(e) => onUpdate(component.id, { style: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        >
          <option value="default">Default (Full Width)</option>
          <option value="rounded">Rounded Corners</option>
          <option value="circle">Circular</option>
          <option value="bordered">With Border</option>
          <option value="shadow">With Shadow</option>
        </select>
      </div>
    </div>
  );
};

export default ImageEditor;