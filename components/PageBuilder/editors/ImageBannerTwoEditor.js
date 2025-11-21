// components/PageBuilder/editors/ImageBannerTwoEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';

const ImageBannerTwoEditor = ({ component, onUpdate }) => {
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
                value={component.content?.gradientFrom || '#F8F9FB'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#F8F9FB'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#F8F9FB"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        )}
      </div>

      {/* Image Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Position</label>
        <select
          value={component.content?.imagePosition || 'right'}
          onChange={(e) => onUpdate(component.id, { imagePosition: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="left">Image on Left</option>
          <option value="right">Image on Right</option>
        </select>
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
              value={component.content?.titleSize || 'text-3xl md:text-4xl'}
              onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-2xl md:text-3xl">Small</option>
              <option value="text-3xl md:text-4xl">Medium</option>
              <option value="text-4xl md:text-5xl">Large</option>
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

      {/* Button Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
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
            id={`image-banner-two-upload-${component.id}`}
          />
          <label
            htmlFor={`image-banner-two-upload-${component.id}`}
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
                alt="Banner preview" 
                className="w-full h-full object-contain"
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
          <strong>Tip:</strong> For this banner layout, use high-quality images that look good in a rounded container with shadow effects.
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
      
      {/* Paragraphs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Paragraphs</label>
        {component.content?.paragraphs?.map((paragraph, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <textarea
              value={paragraph}
              onChange={(e) => {
                const newParagraphs = [...(component.content?.paragraphs || [])];
                newParagraphs[index] = e.target.value;
                onUpdate(component.id, { paragraphs: newParagraphs });
              }}
              className="flex-1 p-2 border border-gray-300 rounded"
              rows={2}
              placeholder={`Paragraph ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => {
                const newParagraphs = (component.content?.paragraphs || []).filter((_, i) => i !== index);
                onUpdate(component.id, { paragraphs: newParagraphs });
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newParagraphs = [...(component.content?.paragraphs || []), 'New paragraph'];
            onUpdate(component.id, { paragraphs: newParagraphs });
          }}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Paragraph
        </button>
        
        {/* Paragraph Color */}
        <div className="mt-3">
          <label className="block text-xs text-gray-600 mb-1">Paragraph Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.paragraphColor || '#2E3850'}
              onChange={(e) => onUpdate(component.id, { paragraphColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.paragraphColor || '#2E3850'}
              onChange={(e) => onUpdate(component.id, { paragraphColor: e.target.value })}
              className="flex-1 p-1 border border-gray-300 rounded text-xs"
              placeholder="#2E3850"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBannerTwoEditor;