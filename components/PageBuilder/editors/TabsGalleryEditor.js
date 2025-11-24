// components/PageBuilder/editors/TabsGalleryEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2, Plus, Upload } from 'lucide-react';

const TabsGalleryEditor = ({ component, onUpdate }) => {
  const [uploadingStates, setUploadingStates] = useState({});
  const fileInputRefs = useRef({});

  const handleFileUpload = async (event, tabId, imageIndex = null) => {
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

    setUploadingStates(prev => ({ ...prev, [`${tabId}-${imageIndex}`]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const currentTabs = [...(component.content?.tabs || [])];
        const tabIndex = currentTabs.findIndex(tab => tab.id === tabId);
        
        if (tabIndex !== -1) {
          if (imageIndex !== null) {
            // Replace existing image
            currentTabs[tabIndex].images[imageIndex] = result.imageUrl;
          } else {
            // Add new image
            currentTabs[tabIndex].images = [...(currentTabs[tabIndex].images || []), result.imageUrl];
          }
          
          onUpdate(component.id, { tabs: currentTabs });
        }
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingStates(prev => ({ ...prev, [`${tabId}-${imageIndex}`]: false }));
      if (fileInputRefs.current[`${tabId}-${imageIndex}`]) {
        fileInputRefs.current[`${tabId}-${imageIndex}`].value = '';
      }
    }
  };

  const handleUpdate = (field, value) => {
    onUpdate(component.id, { 
      ...component.content,
      [field]: value 
    });
  };

  const handleTabChange = (index, field, value) => {
    const newTabs = [...(component.content?.tabs || [])];
    newTabs[index] = { ...newTabs[index], [field]: value };
    handleUpdate('tabs', newTabs);
  };

  const addTab = () => {
    const newTabs = [...(component.content?.tabs || []), {
      id: `tab-${Date.now()}`,
      label: 'New Tab',
      images: []
    }];
    handleUpdate('tabs', newTabs);
  };

  const removeTab = (index) => {
    const newTabs = (component.content?.tabs || []).filter((_, i) => i !== index);
    handleUpdate('tabs', newTabs);
  };

  const removeImage = (tabIndex, imageIndex) => {
    const newTabs = [...(component.content?.tabs || [])];
    newTabs[tabIndex].images = newTabs[tabIndex].images.filter((_, i) => i !== imageIndex);
    handleUpdate('tabs', newTabs);
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

  const defaultTabs = [
    {
      id: 'sheetfed',
      label: 'Sheet-Fed Press',
      images: [
        '/printing-service/sfp1.png',
        '/printing-service/sfp2.png',
        '/printing-service/sfp3.png',
        '/printing-service/sfp4.png',
        '/printing-service/sfp5.png',
        '/printing-service/sfp6.png'
      ]
    },
    {
      id: 'webfed',
      label: 'Web-Fed Press',
      images: [
        '/printing-service/wfp1.png',
        '/printing-service/wfp2.png'
      ]
    },
    {
      id: 'binding',
      label: 'Binding Machines',
      images: [
        '/printing-service/bm1.png',
        '/printing-service/bm2.png',
        '/printing-service/bm3.png',
        '/printing-service/bm4.png'
      ]
    },
    {
      id: 'smallprint',
      label: 'From Small Print Run To Bulk Printing',
      images: [
        '/printing-service/spr1.png',
        '/printing-service/spr2.png'
      ]
    }
  ];

  // Initialize with default tabs if no tabs exist
  if (!component.content?.tabs || component.content.tabs.length === 0) {
    handleUpdate('tabs', defaultTabs);
  }

  return (
    <div className="space-y-4 p-3">
      {/* Title Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || 'Our Advanced Printing Facilities'}
          onChange={(e) => handleUpdate('title', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Section title"
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
          value={component.content?.description || 'From small runs to large-scale printing, PrintSeoul delivers precision and quality at every stage.'}
          onChange={(e) => handleUpdate('description', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Section description"
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
                value={component.content?.textColor || '#6B7280'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.textColor || '#6B7280'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#6B7280"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Colors */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Tab Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Active Tab Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.activeTabBgColor || '#E21B36'}
                onChange={(e) => handleUpdate('activeTabBgColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.activeTabBgColor || '#E21B36'}
                onChange={(e) => handleUpdate('activeTabBgColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#E21B36"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Active Tab Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.activeTabTextColor || '#FFFFFF'}
                onChange={(e) => handleUpdate('activeTabTextColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.activeTabTextColor || '#FFFFFF'}
                onChange={(e) => handleUpdate('activeTabTextColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Inactive Tab Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.inactiveTabBgColor || '#FFFFFF'}
                onChange={(e) => handleUpdate('inactiveTabBgColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.inactiveTabBgColor || '#FFFFFF'}
                onChange={(e) => handleUpdate('inactiveTabBgColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Inactive Tab Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.inactiveTabTextColor || '#6B7280'}
                onChange={(e) => handleUpdate('inactiveTabTextColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.inactiveTabTextColor || '#6B7280'}
                onChange={(e) => handleUpdate('inactiveTabTextColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#6B7280"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Management */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800 mb-3">Tabs & Images</h3>
        
        {component.content?.tabs?.map((tab, tabIndex) => (
          <div key={tab.id} className="mb-6 p-4 bg-white rounded-lg border border-gray-200 last:mb-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Tab Label</label>
                <input
                  type="text"
                  value={tab.label}
                  onChange={(e) => handleTabChange(tabIndex, 'label', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Tab label"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTab(tabIndex)}
                className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded self-end"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Images for this tab */}
            <div className="mt-3">
              <label className="block text-xs text-gray-600 mb-2">Images ({tab.images?.length || 0})</label>
              
              {/* Add Image Button */}
              <div className="mb-3">
                <input
                  type="file"
                  ref={el => fileInputRefs.current[`${tab.id}-new`] = el}
                  onChange={(e) => handleFileUpload(e, tab.id)}
                  accept="image/*"
                  className="hidden"
                  id={`tab-upload-${tab.id}-new`}
                />
                <label
                  htmlFor={`tab-upload-${tab.id}-new`}
                  className={`cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 inline-flex items-center gap-2 text-sm ${
                    uploadingStates[`${tab.id}-new`] ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploadingStates[`${tab.id}-new`] ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      Add Image
                    </>
                  )}
                </label>
              </div>

              {/* Image Grid */}
              {tab.images?.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {tab.images.map((image, imageIndex) => (
                    <div key={imageIndex} className="relative group">
                      <div className="relative h-24 w-full border rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={image} 
                          alt={`${tab.label} ${imageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <input
                            type="file"
                            ref={el => fileInputRefs.current[`${tab.id}-${imageIndex}`] = el}
                            onChange={(e) => handleFileUpload(e, tab.id, imageIndex)}
                            accept="image/*"
                            className="hidden"
                            id={`tab-replace-${tab.id}-${imageIndex}`}
                          />
                          <label
                            htmlFor={`tab-replace-${tab.id}-${imageIndex}`}
                            className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-700 px-2 py-1 rounded text-xs cursor-pointer transition-all duration-300 mr-1"
                          >
                            Replace
                          </label>
                          <button
                            type="button"
                            onClick={() => removeImage(tabIndex, imageIndex)}
                            className="opacity-0 group-hover:opacity-100 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-all duration-300"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      {uploadingStates[`${tab.id}-${imageIndex}`] && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTab}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add New Tab
        </button>
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
            <div className="text-center">
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
                  style={{ color: component.content?.textColor || '#6B7280' }}
                >
                  {component.content.description}
                </div>
              )}
              {component.content?.tabs?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {component.content.tabs.slice(0, 2).map((tab, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm border"
                      style={{
                        backgroundColor: index === 0 ? (component.content?.activeTabBgColor || '#E21B36') : (component.content?.inactiveTabBgColor || '#FFFFFF'),
                        color: index === 0 ? (component.content?.activeTabTextColor || '#FFFFFF') : (component.content?.inactiveTabTextColor || '#6B7280'),
                        borderColor: index === 0 ? 'transparent' : '#E5E7EB'
                      }}
                    >
                      {tab.label}
                    </span>
                  ))}
                  {component.content.tabs.length > 2 && (
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-500">
                      +{component.content.tabs.length - 2} more
                    </span>
                  )}
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

export default TabsGalleryEditor;