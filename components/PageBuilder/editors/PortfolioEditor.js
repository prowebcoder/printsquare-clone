// components/PageBuilder/editors/PortfolioEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';

const PortfolioEditor = ({ component, onUpdate }) => {
  const [uploadingImages, setUploadingImages] = useState({});
  const fileInputRefs = useRef({});

  const handleImageUpload = async (index, file) => {
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

    // Set uploading state for this specific image
    setUploadingImages(prev => ({ ...prev, [index]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update the specific image with the new URL
        const newImages = [...(component.content?.images || [])];
        newImages[index] = { 
          ...newImages[index], 
          url: result.imageUrl,
          alt: newImages[index].alt || file.name // Set alt text to filename if not set
        };
        onUpdate(component.id, { images: newImages });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingImages(prev => ({ ...prev, [index]: false }));
      // Reset file input
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = '';
      }
    }
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...(component.content?.images || [])];
    newImages[index] = { ...newImages[index], [field]: value };
    onUpdate(component.id, { images: newImages });
  };

  const addImage = () => {
    const newImages = [...(component.content?.images || []), {
      key: `portfolio-${(component.content?.images?.length || 0) + 1}`,
      url: '/homepage/p1.jpg',
      alt: 'Portfolio image'
    }];
    onUpdate(component.id, { images: newImages });
  };

  const removeImage = (index) => {
    const newImages = (component.content?.images || []).filter((_, i) => i !== index);
    onUpdate(component.id, { images: newImages });
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
              value={component.content?.titleSize || 'text-3xl md:text-5xl'}
              onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-2xl md:text-4xl">Small</option>
              <option value="text-3xl md:text-5xl">Medium</option>
              <option value="text-4xl md:text-6xl">Large</option>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={component.content?.subtitle || ''}
          onChange={(e) => onUpdate(component.id, { subtitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Subtitle"
        />
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Subtitle Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.subtitleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { subtitleColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.subtitleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { subtitleColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#0B1633"
            />
          </div>
        </div>
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
              value={component.content?.buttonBgColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.buttonBgColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#E21B36"
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
      
      {/* Portfolio Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Images</label>
        {component.content?.images?.map((image, index) => (
          <div key={index} className="border p-3 rounded-lg mb-3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Image {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            {/* Image Upload Section */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Upload Image</label>
              
              {/* Upload Button */}
              <div className="mb-2">
                <input
                  type="file"
                  ref={el => fileInputRefs.current[index] = el}
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                  id={`portfolio-image-upload-${component.id}-${index}`}
                />
                <label
                  htmlFor={`portfolio-image-upload-${component.id}-${index}`}
                  className={`cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-sm inline-block ${
                    uploadingImages[index] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {uploadingImages[index] ? 'Uploading...' : 'Upload Image'}
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Supports JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>

              {/* Image Preview */}
              {image.url && (
                <div className="relative border rounded p-2 bg-gray-50">
                  <p className="text-xs text-gray-600 mb-1">Image Preview:</p>
                  <div className="relative h-32 w-full border rounded overflow-hidden">
                    <img 
                      src={image.url} 
                      alt="Portfolio preview" 
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageChange(index, 'url', '')}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Image Key</label>
                <input
                  type="text"
                  value={image.key}
                  onChange={(e) => handleImageChange(index, 'key', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Image key"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Alt text"
                />
              </div>
            </div>
            
            {/* Image Tips */}
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
              <strong>Tip:</strong> Portfolio images work best when they have consistent dimensions (recommended: 400x400px or similar square ratio).
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Image
        </button>
      </div>
    </div>
  );
};

export default PortfolioEditor;