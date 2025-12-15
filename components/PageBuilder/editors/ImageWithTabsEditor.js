// components/PageBuilder/editors/ImageWithTabsEditor.js
"use client";

import { useState, useRef, useEffect } from 'react';

const ImageWithTabsEditor = ({ component, onUpdate }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Ensure tabs array exists
  const tabs = component.content?.tabs || [];
  const activeTab = tabs[activeTabIndex] || {};

  // Initialize with default tabs if empty
  useEffect(() => {
    if (!component.content?.tabs || component.content.tabs.length === 0) {
      onUpdate(component.id, {
        tabs: [
          {
            id: 'indesign',
            title: 'InDesign',
            image: '/images/placeholder.jpg',
            content: []
          }
        ]
      });
    }
  }, [component.id, component.content?.tabs, onUpdate]);

  const handleFileUpload = async (event, tabId) => {
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
        // Update the specific tab's image
        const updatedTabs = tabs.map(tab => 
          tab.id === tabId ? { ...tab, image: result.imageUrl } : tab
        );
        onUpdate(component.id, { tabs: updatedTabs });
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

  const addTab = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab = {
      id: newTabId,
      title: `New Tab ${tabs.length + 1}`,
      image: '/images/placeholder.jpg',
      content: []
    };
    const updatedTabs = [...tabs, newTab];
    onUpdate(component.id, { tabs: updatedTabs });
    setActiveTabIndex(updatedTabs.length - 1);
  };

  const removeTab = (index) => {
    if (tabs.length <= 1) {
      alert('At least one tab is required');
      return;
    }
    
    const updatedTabs = tabs.filter((_, i) => i !== index);
    onUpdate(component.id, { tabs: updatedTabs });
    
    if (activeTabIndex >= updatedTabs.length) {
      setActiveTabIndex(Math.max(0, updatedTabs.length - 1));
    }
  };

  const updateTab = (tabId, updates) => {
    const updatedTabs = tabs.map(tab => 
      tab.id === tabId ? { ...tab, ...updates } : tab
    );
    onUpdate(component.id, { tabs: updatedTabs });
  };

  const updateContentItem = (index, value) => {
    const updatedContent = [...(activeTab.content || [])];
    updatedContent[index] = value;
    updateTab(activeTab.id, { content: updatedContent });
  };

  const addContentItem = () => {
    const updatedContent = [...(activeTab.content || []), `New step ${(activeTab.content?.length || 0) + 1}`];
    updateTab(activeTab.id, { content: updatedContent });
  };

  const removeContentItem = (index) => {
    const updatedContent = (activeTab.content || []).filter((_, i) => i !== index);
    updateTab(activeTab.id, { content: updatedContent });
  };

  const moveContentItem = (fromIndex, toIndex) => {
    const content = [...(activeTab.content || [])];
    const [movedItem] = content.splice(fromIndex, 1);
    content.splice(toIndex, 0, movedItem);
    updateTab(activeTab.id, { content });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Title Section */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-3">Image with Tabs Settings</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={component.content?.title || ''}
            onChange={(e) => onUpdate(component.id, { title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Section Title"
          />
          
          <div className="mt-2">
            <label className="block text-xs text-gray-600 mb-1">Title Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.titleColor || '#000000'}
                onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.titleColor || '#000000'}
                onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Options */}
      <div className="border-b pb-4">
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
              value={component.content?.backgroundColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.backgroundColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        )}

        {component.content?.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={component.content?.gradientFrom || '#f8f9fa'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#f8f9fa'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#f8f9fa"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#e9ecef'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#e9ecef'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#e9ecef"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs Management */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">Tabs</label>
          <button
            type="button"
            onClick={addTab}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            + Add Tab
          </button>
        </div>

        {/* Tabs List */}
        <div className="space-y-2 mb-4">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`flex items-center justify-between p-2 rounded ${
                index === activeTabIndex ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveTabIndex(index)}
                className="flex-1 text-left"
              >
                <span className="font-medium">{tab.title || `Tab ${index + 1}`}</span>
              </button>
              <button
                type="button"
                onClick={() => removeTab(index)}
                className="ml-2 text-red-600 hover:text-red-800"
                disabled={tabs.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Active Tab Editor */}
        {activeTab && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tab Title</label>
              <input
                type="text"
                value={activeTab.title || ''}
                onChange={(e) => updateTab(activeTab.id, { title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Tab title"
              />
            </div>

            {/* Tab Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tab Image</label>
              
              {/* Upload Button */}
              <div className="mb-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e, activeTab.id)}
                  accept="image/*"
                  className="hidden"
                  id={`tab-image-upload-${activeTab.id}`}
                />
                <label
                  htmlFor={`tab-image-upload-${activeTab.id}`}
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
              {activeTab.image && (
                <div className="relative border rounded-lg p-2 bg-gray-50">
                  <p className="text-xs text-gray-600 mb-2">Image Preview:</p>
                  <div className="relative h-32 w-full border rounded overflow-hidden">
                    <img 
                      src={activeTab.image} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => updateTab(activeTab.id, { image: '/images/placeholder.jpg' })}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Content List Editor */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Numbered Content</label>
                <button
                  type="button"
                  onClick={addContentItem}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  + Add Step
                </button>
              </div>
              
              <div className="space-y-2">
                {(activeTab.content || []).map((item, index) => (
                  <div key={index} className="flex items-start gap-2 group">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveContentItem(index, index - 1)}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveContentItem(index, index + 1)}
                        disabled={index === (activeTab.content?.length || 0) - 1}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↓
                      </button>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm text-gray-500 font-medium min-w-6">
                        {index + 1}.
                      </span>
                      <textarea
                        value={item}
                        onChange={(e) => updateContentItem(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                        rows="2"
                        placeholder={`Step ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeContentItem(index)}
                      className="text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layout Settings */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image Position</label>
          <select
            value={component.content?.imagePosition || 'left'}
            onChange={(e) => onUpdate(component.id, { imagePosition: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="left">Image on Left</option>
            <option value="right">Image on Right</option>
          </select>
        </div>

        {/* Tab Styling */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Active Tab Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.activeTabBgColor || '#e21b36'}
                onChange={(e) => onUpdate(component.id, { activeTabBgColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.activeTabBgColor || '#e21b36'}
                onChange={(e) => onUpdate(component.id, { activeTabBgColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#e21b36"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Active Tab Text</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.activeTabTextColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { activeTabTextColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.activeTabTextColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { activeTabTextColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inactive Tab Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.inactiveTabBgColor || '#f8f9fa'}
                onChange={(e) => onUpdate(component.id, { inactiveTabBgColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.inactiveTabBgColor || '#f8f9fa'}
                onChange={(e) => onUpdate(component.id, { inactiveTabBgColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#f8f9fa"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inactive Tab Text</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.inactiveTabTextColor || '#6c757d'}
                onChange={(e) => onUpdate(component.id, { inactiveTabTextColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.inactiveTabTextColor || '#6c757d'}
                onChange={(e) => onUpdate(component.id, { inactiveTabTextColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#6c757d"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">List Number Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.listNumberColor || '#e21b36'}
              onChange={(e) => onUpdate(component.id, { listNumberColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.listNumberColor || '#e21b36'}
              onChange={(e) => onUpdate(component.id, { listNumberColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#e21b36"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithTabsEditor;