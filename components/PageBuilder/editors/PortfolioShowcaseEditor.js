// components/PageBuilder/editors/PortfolioShowcaseEditor.js
"use client";

import React, { useState, useRef } from 'react';
import { Trash2, Upload, Image as ImageIcon, Plus, Filter } from 'lucide-react';

const PortfolioShowcaseEditor = ({ component, onUpdate }) => {
  const [uploadingImages, setUploadingImages] = useState({});
  const fileInputRefs = useRef({});

  // Initialize content
  const content = component.content || {};

  // Handle image upload
  const handleImageUpload = async (index, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

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
        // Update the specific portfolio item
        const newPortfolioItems = [...(content.portfolioItems || [])];
        newPortfolioItems[index] = { 
          ...newPortfolioItems[index], 
          image: result.imageUrl,
          id: newPortfolioItems[index]?.id || Date.now() + index
        };
        
        onUpdate(component.id, { portfolioItems: newPortfolioItems });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingImages(prev => ({ ...prev, [index]: false }));
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = '';
      }
    }
  };

  // Handle portfolio item change
  const handlePortfolioChange = (index, field, value) => {
    const newPortfolioItems = [...(content.portfolioItems || [])];
    newPortfolioItems[index] = { 
      ...newPortfolioItems[index], 
      [field]: value 
    };
    
    onUpdate(component.id, { portfolioItems: newPortfolioItems });
  };

  // Add new portfolio item
  const addPortfolioItem = () => {
    const newPortfolioItems = [...(content.portfolioItems || [])];
    const newId = (content.portfolioItems?.length || 0) + 1;
    
    newPortfolioItems.push({
      id: newId,
      image: `/portfolio/p${newId}.jpg`,
      category1: getRandomCategory('binding'),
      category2: getRandomCategory('cover'),
      category3: getRandomCategory('inside')
    });
    
    onUpdate(component.id, { portfolioItems: newPortfolioItems });
  };

  // Remove portfolio item
  const removePortfolioItem = (index) => {
    const newPortfolioItems = [...(content.portfolioItems || [])];
    newPortfolioItems.splice(index, 1);
    onUpdate(component.id, { portfolioItems: newPortfolioItems });
  };

  // Get random category for demo purposes
  const getRandomCategory = (type) => {
    const categories = {
      binding: ['Perfect Binding', 'Saddle Binding', 'Hardcover Binding', 'Wire Binding'],
      cover: ['Gloss', 'Matte', 'Hi Plus', 'Hi Qmatte', 'Uncoated'],
      inside: ['Gloss', 'Matte', 'Hi Plus', 'Hi Qmatte', 'Uncoated']
    };
    const arr = categories[type] || categories.binding;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Update filter options
  const updateFilterOptions = (filterType, options) => {
    onUpdate(component.id, { 
      [`${filterType}Options`]: options.split(',').map(opt => opt.trim()).filter(opt => opt)
    });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      {/* Section Title */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Portfolio Showcase Settings</h3>
        <p className="text-sm text-gray-600 mt-1">Configure your portfolio showcase with filters and pagination</p>
      </div>

      {/* Background Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Section Background</label>
        <div className="flex items-center gap-3 mb-3">
          <select
            value={content.backgroundType || 'gradient'}
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
              value={content.backgroundColor || '#F8F8F8'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.backgroundColor || '#F8F8F8'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#F8F8F8"
            />
          </div>
        )}

        {content.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-12">From:</span>
              <input
                type="color"
                value={content.gradientFrom || '#F8F8F8'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientFrom || '#F8F8F8'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#F8F8F8"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-12">To:</span>
              <input
                type="color"
                value={content.gradientTo || '#EAEAEA'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientTo || '#EAEAEA'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#EAEAEA"
              />
            </div>
          </div>
        )}

        {/* Items per page */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Items Per Page</label>
          <input
            type="number"
            min="1"
            max="50"
            value={content.itemsPerPage || 9}
            onChange={(e) => onUpdate(component.id, { itemsPerPage: parseInt(e.target.value) || 9 })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Header Section</label>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={content.title || 'Our Portfolio'}
            onChange={(e) => onUpdate(component.id, { title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Our Portfolio"
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
              value={content.titleSize || 'text-3xl sm:text-4xl'}
              onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
              className="flex-1 p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-2xl sm:text-3xl">Small</option>
              <option value="text-3xl sm:text-4xl">Medium</option>
              <option value="text-4xl sm:text-5xl">Large</option>
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
            placeholder="Filter and explore our collection of printed works"
          />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-600">Color:</span>
            <input
              type="color"
              value={content.descriptionColor || '#4B5563'}
              onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
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

      {/* Filter Settings */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <label className="block text-sm font-medium text-gray-700">Filter Settings</label>
        </div>
        
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Binding Options (comma separated)</label>
            <input
              type="text"
              value={content.bindingOptions?.join(', ') || 'All, Perfect Binding, Saddle Binding, Hardcover Binding, Wire Binding'}
              onChange={(e) => updateFilterOptions('binding', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="All, Perfect Binding, Saddle Binding, Hardcover Binding, Wire Binding"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Cover Paper Options (comma separated)</label>
            <input
              type="text"
              value={content.coverOptions?.join(', ') || 'All, Gloss, Matte, Hi Plus, Hi Qmatte, Uncoated'}
              onChange={(e) => updateFilterOptions('cover', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="All, Gloss, Matte, Hi Plus, Hi Qmatte, Uncoated"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Inside Paper Options (comma separated)</label>
            <input
              type="text"
              value={content.insideOptions?.join(', ') || 'All, Gloss, Matte, Hi Plus, Hi Qmatte, Uncoated'}
              onChange={(e) => updateFilterOptions('inside', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="All, Gloss, Matte, Hi Plus, Hi Qmatte, Uncoated"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showFilters"
            checked={content.showFilters !== false}
            onChange={(e) => onUpdate(component.id, { showFilters: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor="showFilters" className="text-sm text-gray-600">
            Show filter section
          </label>
        </div>
      </div>

      {/* Portfolio Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Portfolio Items</label>
          <button
            type="button"
            onClick={addPortfolioItem}
            className="flex items-center gap-1 text-sm bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
          >
            <Plus size={14} /> Add Item
          </button>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {content.portfolioItems?.map((item, index) => (
            <div key={item.id || index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img
                    src={item.image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removePortfolioItem(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Image Upload</label>
                    <input
                      type="file"
                      ref={el => fileInputRefs.current[index] = el}
                      onChange={(e) => handleImageUpload(index, e.target.files[0])}
                      accept="image/*"
                      className="hidden"
                      id={`upload-${component.id}-${index}`}
                    />
                    <label
                      htmlFor={`upload-${component.id}-${index}`}
                      className={`flex items-center justify-center gap-1 text-xs ${
                        uploadingImages[index] 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                      } px-3 py-1.5 rounded`}
                    >
                      <Upload size={12} />
                      {uploadingImages[index] ? 'Uploading...' : 'Change Image'}
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category 1 (Binding)</label>
                      <input
                        type="text"
                        value={item.category1 || ''}
                        onChange={(e) => handlePortfolioChange(index, 'category1', e.target.value)}
                        className="w-full p-1.5 border border-gray-300 rounded text-sm"
                        placeholder="Perfect Binding"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category 2 (Cover)</label>
                      <input
                        type="text"
                        value={item.category2 || ''}
                        onChange={(e) => handlePortfolioChange(index, 'category2', e.target.value)}
                        className="w-full p-1.5 border border-gray-300 rounded text-sm"
                        placeholder="Gloss"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category 3 (Inside)</label>
                      <input
                        type="text"
                        value={item.category3 || ''}
                        onChange={(e) => handlePortfolioChange(index, 'category3', e.target.value)}
                        className="w-full p-1.5 border border-gray-300 rounded text-sm"
                        placeholder="Hi Plus"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!content.portfolioItems || content.portfolioItems.length === 0) && (
          <div className="text-center py-6 text-gray-400 text-sm border border-gray-200 border-dashed rounded-lg">
            No portfolio items added yet. Click &quot;Add Item&quot; to add portfolio items.
          </div>
        )}
      </div>

      {/* Grid Settings */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Grid Layout</label>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Desktop Columns</label>
          <select
            value={content.desktopColumns || 3}
            onChange={(e) => onUpdate(component.id, { desktopColumns: parseInt(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Tablet Columns</label>
          <select
            value={content.tabletColumns || 2}
            onChange={(e) => onUpdate(component.id, { tabletColumns: parseInt(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            <option value="1">1 Column</option>
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Mobile Columns</label>
          <select
            value={content.mobileColumns || 1}
            onChange={(e) => onUpdate(component.id, { mobileColumns: parseInt(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            <option value="1">1 Column</option>
            <option value="2">2 Columns</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcaseEditor;