// components/admin/SaddleQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2 } from 'lucide-react';

// Default configuration for saddle stitching
const DEFAULT_FORM_CONFIG = {
  general: {
    title: "Saddle Stitching Quote",
    description: "Configure your perfect booklet with our professional saddle stitching services. Get instant pricing and add to cart in minutes.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  sizes: ['5.5 x 8.5', '8.5 x 11', '11 x 17', 'Custom Size'],
  paperOptions: {
    cover: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', price: 25 },
    ],
    inside: [
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'UNCOATED', label: 'Uncoated', price: 0 },
    ]
  },
  printColors: [
    { value: 'CMYK', label: 'Full color', price: 0 },
    { value: 'BW', label: 'Black only', price: -50 },
  ],
  finishingOptions: [
    { value: 'NONE', label: 'None', price: 0 },
    { value: 'FOLDING', label: 'Folding', price: 25 },
    { value: 'PERFORATION', label: 'Perforation', price: 15 },
  ],
  pageCounts: Array.from({ length: (96 - 8) / 4 + 1 }, (_, i) => 8 + i * 4),
  quantities: [100, 250, 500, 1000, 2500, 5000],
  customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 17\" × 22\"",
  pricing: {
    baseSetupCost: 100,
    costPerPage: 0.03,
    customSizeMultiplier: 1.1,
    standardSizeMultiplier: 1.0
  }
};

// Reuse the same editor component structure as PrintQuoteFormEditor
// You can copy the entire PrintQuoteFormEditor component and just change the DEFAULT_FORM_CONFIG
// and component name to SaddleQuoteFormEditor

export default function SaddleQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(DEFAULT_FORM_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);

  // Initialize with saved config or defaults
  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      setConfig(formConfig);
    }
  }, [formConfig]);

  // ... Copy all the same helper functions from PrintQuoteFormEditor:
  // updateNestedConfig, updateArrayItem, addArrayItem, removeArrayItem,
  // renderEditableArray, renderSimpleArray, etc.

  const updateNestedConfig = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const updateArrayItem = (path, index, field, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = Array.isArray(current[keys[i]]) ? [...current[keys[i]]] : { ...current[keys[i]] };
        current = current[keys[i]];
      }
      const array = current[keys[keys.length - 1]];
      array[index] = { ...array[index], [field]: value };
      return newConfig;
    });
  };

  const addArrayItem = (path, newItem) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], newItem];
      return newConfig;
    });
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_, i) => i !== index);
      return newConfig;
    });
  };

  const handleSave = () => {
    onSave(config);
  };

  const renderEditableArray = (title, path, fields) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-700">{title}</h4>
        <button
          onClick={() => addArrayItem(path, fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}))}
          className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          <Plus size={14} className="mr-1" />
          Add New
        </button>
      </div>
      <div className="space-y-3">
        {config[path]?.map((item, index) => (
          <div key={index} className="flex space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              {fields.map(field => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === 'price' ? 'number' : 'text'}
                    value={item[field] || ''}
                    onChange={(e) => updateArrayItem(path, index, field, 
                      field === 'price' ? parseFloat(e.target.value) || 0 : e.target.value
                    )}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => removeArrayItem(path, index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded self-start"
              title="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSimpleArray = (title, path, placeholder = "Enter value") => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-700">{title}</h4>
        <button
          onClick={() => addArrayItem(path, '')}
          className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          <Plus size={14} className="mr-1" />
          Add New
        </button>
      </div>
      <div className="space-y-2">
        {config[path]?.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newArray = [...config[path]];
                newArray[index] = e.target.value;
                updateNestedConfig(path, newArray);
              }}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder={placeholder}
            />
            <button
              onClick={() => removeArrayItem(path, index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // ... Copy the same JSX structure from PrintQuoteFormEditor but adjust for saddle stitching
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Saddle Stitching Quote Form Editor</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Eye size={16} className="mr-2" />
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 overflow-x-auto">
            {[
              'general', 'sizes', 'paper-cover', 'paper-inside', 
              'colors', 'finishing', 'quantities', 'pricing'
            ].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {preview ? (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Saddle Stitching Form preview would be rendered here</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
                <h3 className="font-semibold text-gray-900 mb-3">Form Sections</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'general', label: 'General Settings' },
                    { id: 'sizes', label: 'Sizes & Dimensions' },
                    { id: 'paper-cover', label: 'Cover Paper' },
                    { id: 'paper-inside', label: 'Inside Paper' },
                    { id: 'colors', label: 'Color Options' },
                    { id: 'finishing', label: 'Finishing Options' },
                    { id: 'quantities', label: 'Quantity Options' },
                    { id: 'pricing', label: 'Pricing Settings' },
                  ].map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === section.id
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Editor Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 space-y-6">
                  {activeTab === 'general' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Form Title
                        </label>
                        <input
                          type="text"
                          value={config.general?.title || ''}
                          onChange={(e) => updateNestedConfig('general.title', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      {/* Add other general settings fields */}
                    </>
                  )}

                  {activeTab === 'sizes' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Sizes & Dimensions</h3>
                      {renderSimpleArray('Available Sizes', 'sizes', 'Enter size (e.g., 8.5 x 11)')}
                    </>
                  )}

                  {/* Add other tabs for saddle stitching */}
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}