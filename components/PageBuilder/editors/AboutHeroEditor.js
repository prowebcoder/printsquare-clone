// components/PageBuilder/editors/AboutUsEditor.js
"use client";

import { useState, useRef } from 'react';

const AboutUsEditor = ({ component, onUpdate }) => {
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

  return (
    <div className="space-y-3">
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
      
      <div className="grid grid-cols-2 gap-2">
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
            id={`aboutus-image-upload-${component.id}`}
          />
          <label
            htmlFor={`aboutus-image-upload-${component.id}`}
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
              <div className="relative h-40 w-full border rounded overflow-hidden">
                <img 
                  src={component.content.image} 
                  alt="About us preview" 
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
          <strong>Tip:</strong> For best results, use high-quality portrait-oriented images (recommended: 600x800px or similar ratio).
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
        <input
          type="text"
          value={component.content?.quote || ''}
          onChange={(e) => onUpdate(component.id, { quote: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Quote text"
        />
      </div>
      
      {[1, 2, 3, 4].map((num) => (
        <div key={num}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description {num}</label>
          <textarea
            value={component.content?.[`description${num}`] || ''}
            onChange={(e) => onUpdate(component.id, { [`description${num}`]: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={3}
            placeholder={`Description ${num}`}
          />
        </div>
      ))}
    </div>
  );
};

export default AboutUsEditor;