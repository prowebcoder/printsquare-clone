// components/PageBuilder/editors/VideoWithTextEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2, Plus } from 'lucide-react';

const VideoWithTextEditor = ({ component, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
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
          videoThumbnail: result.imageUrl,
          videoThumbnailAlt: component.content?.videoThumbnailAlt || result.filename
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

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    // Increase size limit for videos (50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('Video file size must be less than 50MB');
      return;
    }

    setVideoUploading(true);

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
          videoFile: result.imageUrl, // Using same response structure
          videoThumbnail: component.content?.videoThumbnail || '' // Clear thumbnail if video is uploaded
        });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setVideoUploading(false);
      if (videoFileInputRef.current) {
        videoFileInputRef.current.value = '';
      }
    }
  };

  const handleUpdate = (field, value) => {
    onUpdate(component.id, { 
      ...component.content,
      [field]: value 
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...(component.content?.features || [])];
    newFeatures[index] = value;
    handleUpdate('features', newFeatures);
  };

  const addFeature = () => {
    const newFeatures = [...(component.content?.features || []), 'New Feature'];
    handleUpdate('features', newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = (component.content?.features || []).filter((_, i) => i !== index);
    handleUpdate('features', newFeatures);
  };

  const titleSizes = {
    'text-3xl': 'Small (3xl)',
    'text-4xl': 'Medium (4xl)',
    'text-5xl': 'Large (5xl)',
    'text-6xl': 'Extra Large (6xl)'
  };

  const textSizes = {
    'text-base': 'Base',
    'text-lg': 'Large',
    'text-xl': 'Extra Large'
  };

  const fontWeights = {
    'font-bold': 'Bold',
    'font-extrabold': 'Extra Bold',
    'font-black': 'Black'
  };

  return (
    <div className="space-y-4 p-3">
      {/* Title Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => handleUpdate('title', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Main title"
        />
        
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Size</label>
            <select
              value={component.content?.titleSize || 'text-5xl'}
              onChange={(e) => handleUpdate('titleSize', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              {Object.entries(titleSizes).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Weight</label>
            <select
              value={component.content?.fontWeight || 'font-extrabold'}
              onChange={(e) => handleUpdate('fontWeight', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              {Object.entries(fontWeights).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.titleColor || '#1F2937'}
                onChange={(e) => handleUpdate('titleColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.titleColor || '#1F2937'}
                onChange={(e) => handleUpdate('titleColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#1F2937"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={component.content?.description || ''}
          onChange={(e) => handleUpdate('description', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={4}
          placeholder="Main description text"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Text Size</label>
            <select
              value={component.content?.textSize || 'text-lg'}
              onChange={(e) => handleUpdate('textSize', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              {Object.entries(textSizes).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.textColor || '#4B5563'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.textColor || '#4B5563'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#4B5563"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Features</h3>
        
        <div className="space-y-2 mb-3">
          {component.content?.features?.map((feature, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="Feature text"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFeature}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add Feature
        </button>

        {/* Feature Colors */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Feature Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.featureBgColor || '#2563EB'}
                onChange={(e) => handleUpdate('featureBgColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.featureBgColor || '#2563EB'}
                onChange={(e) => handleUpdate('featureBgColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#2563EB"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Feature Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.featureTextColor || '#FFFFFF'}
                onChange={(e) => handleUpdate('featureTextColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.featureTextColor || '#FFFFFF'}
                onChange={(e) => handleUpdate('featureTextColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Upload Section */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800 mb-3">Video Content</h3>
        
        {/* Video Settings */}
        <div className="mb-3 p-3 bg-white rounded border">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={component.content?.autoplay || false}
              onChange={(e) => handleUpdate('autoplay', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Autoplay Video
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Video will play automatically when page loads (muted for autoplay)
          </p>
        </div>

        {/* Video File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video File</label>
          <input
            type="file"
            ref={videoFileInputRef}
            onChange={handleVideoUpload}
            accept="video/*"
            className="hidden"
            id={`video-upload-${component.id}`}
          />
          <label
            htmlFor={`video-upload-${component.id}`}
            className={`cursor-pointer bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:from-green-700 hover:to-blue-700 hover:shadow-lg inline-flex items-center gap-2 ${
              videoUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {videoUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading Video...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Upload Video File
              </>
            )}
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Supports MP4, WebM, MOV (Max 50MB)
          </p>

          {/* Video Preview */}
          {component.content?.videoFile && (
            <div className="mt-3 relative border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
              <p className="text-xs text-green-700 mb-2 font-medium">Video Uploaded Successfully!</p>
              <div className="relative h-32 w-full border rounded-lg overflow-hidden shadow-sm bg-black">
                <video 
                  className="w-full h-full object-contain" 
                  controls
                  muted={component.content?.autoplay}
                >
                  <source src={component.content.videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={() => handleUpdate('videoFile', '')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-green-600 mt-1 truncate">
                Video ready to play {component.content?.autoplay && '(Autoplay enabled)'}
              </p>
            </div>
          )}
        </div>

        {/* Thumbnail Upload (Optional - for video placeholder) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Thumbnail (Optional)</label>
          <p className="text-xs text-gray-500 mb-2">Upload a custom thumbnail image for the video</p>
          
          <div className="mb-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              id={`video-thumbnail-upload-${component.id}`}
            />
            <label
              htmlFor={`video-thumbnail-upload-${component.id}`}
              className={`cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg inline-flex items-center gap-2 ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Thumbnail
                </>
              )}
            </label>
          </div>

          {/* Thumbnail Preview */}
          {component.content?.videoThumbnail && (
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Thumbnail Preview:</p>
              <div className="relative h-32 w-full border rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={component.content.videoThumbnail} 
                  alt="Video thumbnail preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleUpdate('videoThumbnail', '')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Layout Options */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Position</label>
          <select
            value={component.content?.videoPosition || 'left'}
            onChange={(e) => handleUpdate('videoPosition', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="left">Video on Left</option>
            <option value="right">Video on Right</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Alignment</label>
          <select
            value={component.content?.contentAlignment || 'left'}
            onChange={(e) => handleUpdate('contentAlignment', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={component.content?.backgroundColor || '#FFFFFF'}
            onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
            className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={component.content?.backgroundColor || '#FFFFFF'}
              onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
          <button
            type="button"
            onClick={() => handleUpdate('backgroundColor', '')}
            className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div 
          className="p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-40"
          style={{ 
            backgroundColor: component.content?.backgroundColor || 'transparent'
          }}
        >
          {component.content?.title || component.content?.description ? (
            <div className={`${component.content?.contentAlignment === 'center' ? 'text-center' : component.content?.contentAlignment === 'right' ? 'text-right' : 'text-left'}`}>
              {component.content?.title && (
                <div 
                  className={`mb-2 leading-tight ${component.content?.titleSize || 'text-5xl'} ${component.content?.fontWeight || 'font-extrabold'}`}
                  style={{ color: component.content?.titleColor || '#1F2937' }}
                >
                  {component.content.title}
                </div>
              )}
              {component.content?.description && (
                <div 
                  className={`mb-3 ${component.content?.textSize || 'text-lg'}`}
                  style={{ color: component.content?.textColor || '#4B5563' }}
                >
                  {component.content.description}
                </div>
              )}
              {component.content?.features?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {component.content.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                      style={{
                        backgroundColor: component.content?.featureBgColor || '#2563EB',
                        color: component.content?.featureTextColor || '#FFFFFF'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center">Preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoWithTextEditor;