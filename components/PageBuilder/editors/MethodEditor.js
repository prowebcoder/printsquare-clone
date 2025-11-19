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

        {/* Image Preview and URL Input */}
        <div className="space-y-2">
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