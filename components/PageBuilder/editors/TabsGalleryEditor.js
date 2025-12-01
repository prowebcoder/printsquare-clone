// components/PageBuilder/editors/TabsGalleryEditor.js
"use client";

import React, { useState, useRef } from 'react';
import { Trash2, Upload, Image as ImageIcon, Plus } from 'lucide-react';

const TabsGalleryEditor = ({ component, onUpdate }) => {
  const [uploadingImages, setUploadingImages] = useState({});
  const fileInputRefs = useRef({});

  // Initialize content
  const content = component.content || {};

  // Handle image upload
  const handleImageUpload = async (tabId, index, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const uploadKey = `${tabId}-${index}`;
    setUploadingImages(prev => ({ ...prev, [uploadKey]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update the specific image
        const newGalleries = { ...(content.galleries || {}) };
        if (!newGalleries[tabId]) newGalleries[tabId] = [];
        
        newGalleries[tabId][index] = { 
          ...newGalleries[tabId][index], 
          url: result.imageUrl,
          alt: newGalleries[tabId][index]?.alt || file.name.replace(/\.[^/.]+$/, "")
        };
        
        onUpdate(component.id, { galleries: newGalleries });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingImages(prev => ({ ...prev, [uploadKey]: false }));
      if (fileInputRefs.current[uploadKey]) {
        fileInputRefs.current[uploadKey].value = '';
      }
    }
  };

  // Handle image change (alt text)
  const handleImageChange = (tabId, index, field, value) => {
    const newGalleries = { ...(content.galleries || {}) };
    if (!newGalleries[tabId]) newGalleries[tabId] = [];
    
    newGalleries[tabId][index] = { 
      ...newGalleries[tabId][index], 
      [field]: value 
    };
    
    onUpdate(component.id, { galleries: newGalleries });
  };

  // Add new image to a tab
  const addImage = (tabId) => {
    const newGalleries = { ...(content.galleries || {}) };
    if (!newGalleries[tabId]) newGalleries[tabId] = [];
    
    newGalleries[tabId].push({
      url: getDefaultImage(tabId, newGalleries[tabId].length),
      alt: `${getTabLabel(tabId)} image ${newGalleries[tabId].length + 1}`
    });
    
    onUpdate(component.id, { galleries: newGalleries });
  };

  // Remove image from a tab
  const removeImage = (tabId, index) => {
    const newGalleries = { ...(content.galleries || {}) };
    if (newGalleries[tabId]) {
      newGalleries[tabId] = newGalleries[tabId].filter((_, i) => i !== index);
      onUpdate(component.id, { galleries: newGalleries });
    }
  };

  // Update tab label
  const updateTabLabel = (index, newLabel) => {
    const newTabs = [...(content.tabs || [])];
    newTabs[index] = { ...newTabs[index], label: newLabel };
    onUpdate(component.id, { tabs: newTabs });
  };

  // Get default image based on tab
  const getDefaultImage = (tabId, index) => {
    const defaults = {
      sheetfed: [
        '/printing-service/sfp1.png',
        '/printing-service/sfp2.png',
        '/printing-service/sfp3.png',
        '/printing-service/sfp4.png',
        '/printing-service/sfp5.png',
        '/printing-service/sfp6.png'
      ],
      webfed: [
        '/printing-service/wfp1.png',
        '/printing-service/wfp2.png'
      ],
      binding: [
        '/printing-service/bm1.png',
        '/printing-service/bm2.png',
        '/printing-service/bm3.png',
        '/printing-service/bm4.png'
      ],
      smallprint: [
        '/printing-service/spr1.png',
        '/printing-service/spr2.png'
      ]
    };
    
    return defaults[tabId]?.[index] || `/printing-service/default${index + 1}.png`;
  };

  // Get tab label
  const getTabLabel = (tabId) => {
    const tab = content.tabs?.find(t => t.id === tabId);
    return tab?.label || tabId;
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      {/* Section Title */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Tabs Gallery Settings</h3>
        <p className="text-sm text-gray-600 mt-1">Configure your printing facilities gallery with tabs</p>
      </div>

      {/* Background Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Section Background</label>
        <div className="flex items-center gap-3 mb-3">
          <select
            value={content.backgroundType || 'solid'}
            onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="solid">Solid Color</option>
            <option value="gradient">Gradient</option>
            <option value="none">None (Transparent)</option>
          </select>
        </div>

        {content.backgroundType === 'solid' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.backgroundColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.backgroundColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        )}

        {content.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-12">From:</span>
              <input
                type="color"
                value={content.gradientFrom || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientFrom || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-12">To:</span>
              <input
                type="color"
                value={content.gradientTo || '#F8F9FB'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientTo || '#F8F9FB'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#F8F9FB"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="decorativeElements"
            checked={content.showDecorativeElements || true}
            onChange={(e) => onUpdate(component.id, { showDecorativeElements: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor="decorativeElements" className="text-sm text-gray-600">
            Show decorative elements
          </label>
        </div>
      </div>

      {/* Header Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Header Section</label>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => onUpdate(component.id, { title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Our Advanced Printing Facilities"
          />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-600">Color:</span>
            <input
              type="color"
              value={content.titleColor || '#1F2937'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
            />
            <select
              value={content.titleSize || 'text-4xl sm:text-5xl'}
              onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
              className="flex-1 p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-3xl sm:text-4xl">Medium</option>
              <option value="text-4xl sm:text-5xl">Large</option>
              <option value="text-5xl sm:text-6xl">Extra Large</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Description</label>
          <textarea
            value={content.description || ''}
            onChange={(e) => onUpdate(component.id, { description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            rows="2"
            placeholder="From small runs to large-scale printing, Printseoul delivers precision and quality at every stage."
          />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-600">Color:</span>
            <input
              type="color"
              value={content.descriptionColor || '#4B5563'}
              onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
              className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
            />
            <span className="text-xs text-gray-600">Highlight:</span>
            <input
              type="color"
              value={content.highlightColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { highlightColor: e.target.value })}
              className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
            />
            <select
              value={content.descriptionSize || 'text-base sm:text-lg'}
              onChange={(e) => onUpdate(component.id, { descriptionSize: e.target.value })}
              className="flex-1 p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-sm sm:text-base">Small</option>
              <option value="text-base sm:text-lg">Medium</option>
              <option value="text-lg sm:text-xl">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs Styling */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Tabs Styling</label>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Active Tab Style</label>
            <select
              value={content.activeTabBgType || 'gradient'}
              onChange={(e) => onUpdate(component.id, { activeTabBgType: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs mb-2"
            >
              <option value="solid">Solid Color</option>
              <option value="gradient">Gradient</option>
            </select>
            
            {content.activeTabBgType === 'solid' ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={content.activeTabSolidColor || '#E21B36'}
                  onChange={(e) => onUpdate(component.id, { activeTabSolidColor: e.target.value })}
                  className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.activeTabSolidColor || '#E21B36'}
                  onChange={(e) => onUpdate(component.id, { activeTabSolidColor: e.target.value })}
                  className="flex-1 p-1 border border-gray-300 rounded text-xs"
                  placeholder="#E21B36"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">From:</span>
                  <input
                    type="color"
                    value={content.activeTabGradientFrom || '#E21B36'}
                    onChange={(e) => onUpdate(component.id, { activeTabGradientFrom: e.target.value })}
                    className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">To:</span>
                  <input
                    type="color"
                    value={content.activeTabGradientTo || '#FF4B2B'}
                    onChange={(e) => onUpdate(component.id, { activeTabGradientTo: e.target.value })}
                    className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-600">Text:</span>
              <input
                type="color"
                value={content.activeTabTextColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { activeTabTextColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Inactive Tab Style</label>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-600">BG:</span>
              <input
                type="color"
                value={content.inactiveTabBgColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { inactiveTabBgColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.inactiveTabBgColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { inactiveTabBgColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFFFFF"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-600">Text:</span>
              <input
                type="color"
                value={content.inactiveTabTextColor || '#000000'}
                onChange={(e) => onUpdate(component.id, { inactiveTabTextColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Border:</span>
              <input
                type="color"
                value={content.inactiveTabBorderColor || '#E5E7EB'}
                onChange={(e) => onUpdate(component.id, { inactiveTabBorderColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Image Border Radius</label>
          <select
            value={content.imageBorderRadius || '1rem'}
            onChange={(e) => onUpdate(component.id, { imageBorderRadius: e.target.value })}
            className="w-full p-1 border border-gray-300 rounded text-xs"
          >
            <option value="0.5rem">Small (0.5rem)</option>
            <option value="1rem">Medium (1rem)</option>
            <option value="1.5rem">Large (1.5rem)</option>
            <option value="9999px">Full Rounded</option>
          </select>
        </div>
      </div>

      {/* Gallery Images by Tab */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Gallery Images by Category</label>
        
        {content.tabs?.map((tab, tabIndex) => (
          <div key={tab.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ImageIcon size={16} className="text-gray-500" />
                <h4 className="font-medium text-sm">
                  <input
                    type="text"
                    value={tab.label}
                    onChange={(e) => updateTabLabel(tabIndex, e.target.value)}
                    className="bg-transparent border-b border-gray-300 px-1 py-0.5 text-sm"
                  />
                </h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {(content.galleries?.[tab.id] || []).length} images
                </span>
              </div>
              <button
                type="button"
                onClick={() => addImage(tab.id)}
                className="flex items-center gap-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                <Plus size={12} /> Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {content.galleries?.[tab.id]?.map((image, imgIndex) => (
                <div key={imgIndex} className="border border-gray-200 rounded p-2">
                  <div className="relative aspect-square mb-2">
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(tab.id, imgIndex)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <input
                      type="file"
                      ref={el => fileInputRefs.current[`${tab.id}-${imgIndex}`] = el}
                      onChange={(e) => handleImageUpload(tab.id, imgIndex, e.target.files[0])}
                      accept="image/*"
                      className="hidden"
                      id={`upload-${component.id}-${tab.id}-${imgIndex}`}
                    />
                    <label
                      htmlFor={`upload-${component.id}-${tab.id}-${imgIndex}`}
                      className={`flex items-center justify-center gap-1 text-xs ${
                        uploadingImages[`${tab.id}-${imgIndex}`] 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                      } px-2 py-1 rounded`}
                    >
                      <Upload size={10} />
                      {uploadingImages[`${tab.id}-${imgIndex}`] ? 'Uploading...' : 'Replace'}
                    </label>
                    
                    <input
                      type="text"
                      value={image.alt || ''}
                      onChange={(e) => handleImageChange(tab.id, imgIndex, 'alt', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded text-xs"
                      placeholder="Alt text"
                    />
                  </div>
                </div>
              ))}
            </div>

            {(!content.galleries?.[tab.id] || content.galleries[tab.id].length === 0) && (
              <div className="text-center py-4 text-gray-400 text-sm">
  No images added yet. Click &quot;Add Image&quot; to add images.
</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsGalleryEditor;