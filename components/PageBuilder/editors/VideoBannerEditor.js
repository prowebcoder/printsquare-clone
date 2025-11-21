// components/PageBuilder/editors/VideoBannerEditor.js
"use client";

import { useState, useRef } from 'react';

const VideoBannerEditor = ({ component, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    // Check file size (max 20MB for videos)
    if (file.size > 20 * 1024 * 1024) {
      alert('File size must be less than 20MB');
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
        // Update component with the new video URL
        onUpdate(component.id, { videoUrl: result.imageUrl }); // Using imageUrl field from upload API
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
      {/* Title Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Text</label>
          <input
            type="text"
            value={component.content?.highlightedText || ''}
            onChange={(e) => onUpdate(component.id, { highlightedText: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Highlighted text (colored)"
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
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#E21B36"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Normal Text</label>
          <input
            type="text"
            value={component.content?.normalText || ''}
            onChange={(e) => onUpdate(component.id, { normalText: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Normal text"
          />
          
          <div className="mt-2">
            <label className="block text-xs text-gray-600 mb-1">Normal Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.normalTextColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { normalTextColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.normalTextColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { normalTextColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFFFFF"
              />
            </div>
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
          placeholder="Video banner description"
        />
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Description Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.descriptionColor || '#D1D5DB'}
              onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.descriptionColor || '#D1D5DB'}
              onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
              className="flex-1 p-1 border border-gray-300 rounded text-xs"
              placeholder="#D1D5DB"
            />
          </div>
        </div>
      </div>

      {/* Video Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
        
        {/* Upload Button */}
        <div className="mb-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="video/*"
            className="hidden"
            id={`video-banner-upload-${component.id}`}
          />
          <label
            htmlFor={`video-banner-upload-${component.id}`}
            className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-block ${
              uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Supports MP4, WebM, MOV (Max 20MB)
          </p>
        </div>

        {/* Video Preview */}
        {component.content?.videoUrl && (
          <div className="relative border rounded-lg p-2 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Video Preview:</p>
            <div className="relative h-32 w-full border rounded overflow-hidden">
              <video
                src={component.content.videoUrl}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
              <button
                type="button"
                onClick={() => onUpdate(component.id, { videoUrl: '' })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Video Tips */}
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
          <strong>Tip:</strong> For best performance, use compressed video files. Recommended: MP4 format, 1080p resolution, under 20MB.
        </div>
      </div>

      {/* Optional Button Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Button Text (Optional)</label>
        <input
          type="text"
          value={component.content?.buttonText || ''}
          onChange={(e) => onUpdate(component.id, { buttonText: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Button text"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Button BG Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.buttonBgColor || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.buttonBgColor || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#E21B36"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Button Text Color</label>
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
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Video Alt Text</label>
        <input
          type="text"
          value={component.content?.videoAlt || ''}
          onChange={(e) => onUpdate(component.id, { videoAlt: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Video alt text"
        />
      </div>
    </div>
  );
};

export default VideoBannerEditor;