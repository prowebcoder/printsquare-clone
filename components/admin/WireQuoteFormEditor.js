// components/admin/PrintQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2 } from 'lucide-react';

// Default configuration matching your existing form
const DEFAULT_FORM_CONFIG = {
  general: {
    title: "Book Printing Quote",
    description: "Configure your perfect book with our professional printing services. Get instant pricing and add to cart in minutes.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  bindingTypes: [
    { value: 'PERFECT', label: 'Perfect Binding' },
    { value: 'SADDLE', label: 'Saddle Stitching' },
    { value: 'HARDCOVER', label: 'Hardcover Book' },
    { value: 'WIRE', label: 'Wire Binding' },
  ],
  sizes: ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', '8.5 x 5.5', '10 x 7.5', '11 x 8.5', 'Custom Size'],
  bindingEdges: [
    { value: 'LEFT', label: 'Left Side', desc: 'Binding on the left, most common' },
    { value: 'RIGHT', label: 'Right Side', desc: 'First inside page starts from the right' },
    { value: 'TOP', label: 'Top Side', desc: 'Binding on the top, a.k.a calendar binding' },
  ],
  paperOptions: {
    cover: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', price: 50 },
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 100 },
      { value: 'PREMIUM', label: 'Premium', price: 150 },
    ],
    inside: [
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', price: 25 },
      { value: 'UNCOATED', label: 'Uncoated', price: 0 },
      { value: 'TEXTBOOK', label: 'Textbook', price: 30 },
      { value: 'COLORED', label: 'Colored', price: 40 },
    ],
    subscription: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 25 },
      { value: 'UNCOATED_W', label: 'Uncoated', price: 0 },
      { value: 'MONTBLANC_EW', label: 'Premium', price: 50 },
    ]
  },
  printColors: [
    { value: 'CMYK', label: 'Full color', price: 0 },
    { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color', price: 75 },
    { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color', price: 150 },
    { value: 'BW', label: 'Black only', price: -100 },
    { value: 'BW_PMS1', label: 'Black + 1 Spot color', price: -25 },
    { value: 'BW_PMS2', label: 'Black + 2 Spot color', price: 50 },
  ],
  coverFinishes: [
    { value: 'MATTE', label: 'Matte lamination', price: 50 },
    { value: 'GLOSS', label: 'Gloss lamination', price: 50 },
    { value: 'NONE', label: 'None', price: 0 },
  ],
  coverFolds: [
    { value: 'NONE', label: 'No fold', price: 0 },
    { value: 'FRONT', label: 'Front cover fold', price: 25 },
    { value: 'BACK', label: 'Back cover fold', price: 25 },
    { value: 'BOTH', label: 'Both cover folds', price: 40 },
  ],
  additionalOptions: {
    proof: [
      { value: 'ONLINE', label: 'E-Proof (PDF proof, free)', price: 0 },
      { value: 'DIGITAL', label: 'Digital Proof', price: 50 },
    ],
    holePunch: [
      { value: '6', label: '0.236" (6mm) drill', price: 15 },
      { value: '8', label: '0.315" (8mm) drill', price: 20 },
      { value: '9.5', label: '0.374" (9.5mm) drill', price: 25 },
    ],
    slipcase: [
      { value: 'NONE', label: 'None', price: 0 },
      { value: 'CASE', label: 'Slipcase only', price: 80 },
      { value: 'CASEPRINT', label: 'Slipcase + printing', price: 150 },
    ],
    shrinkWrap: [
      { value: '1', label: '1 copy/wrapping', price: 0.15 },
      { value: '2', label: '2 copy/wrapping', price: 0.12 },
      { value: '3', label: '3 copy/wrapping', price: 0.10 },
    ],
    directMail: [
      { value: 'ALL', label: 'DM all quantity', price: 0.75 },
      { value: 'PORTION', label: 'DM a portion of the quantity', price: 0.50 },
    ]
  },
  positions: [
    { value: 'FRONT', label: 'Before page 1' },
    { value: 'BACK', label: 'After page 96' },
    { value: 'SELECT', label: 'Front of page no.' },
  ],
  pageCounts: Array.from({ length: (880 - 24) / 2 + 1 }, (_, i) => 24 + i * 2),
  weightOptions: ['100', '120', '150', '250', '300'],
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
  spineWidth: '0.178"',
  pricing: {
    baseSetupCost: 200,
    costPerPage: 0.05,
    customSizeMultiplier: 1.2,
    standardSizeMultiplier: 1.1
  }
};

export default function WireQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState({});
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  // Initialize with saved config or defaults
  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved config:', formConfig);
      setConfig(formConfig);
    } else {
      console.log('📥 Loading default config');
      setConfig(DEFAULT_FORM_CONFIG);
    }
  }, [formConfig]);

  const updateNestedConfig = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
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
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      const array = current[keys[keys.length - 1]];
      if (array && array[index]) {
        array[index] = { ...array[index], [field]: value };
      }
      return newConfig;
    });
  };

  const addArrayItem = (path, newItem) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (!current[arrayKey]) current[arrayKey] = [];
      current[arrayKey] = [...current[arrayKey], newItem];
      return newConfig;
    });
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return prev;
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (current[arrayKey] && Array.isArray(current[arrayKey])) {
        current[arrayKey] = current[arrayKey].filter((_, i) => i !== index);
      }
      return newConfig;
    });
  };

 const handleSave = async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      console.log('💾 Saving config:', config);
      await onSave(config);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving configuration');
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Print Quote Form Editor</h1>
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
              'general', 'binding', 'sizes', 'paper-cover', 'paper-inside', 
              'paper-subscription', 'colors', 'finishes', 'folds', 'additional',
              'positions', 'quantities', 'pricing'
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
              <p className="text-gray-500">Form preview would be rendered here</p>
              <p className="text-sm text-gray-400 mt-2">
                The actual form component would be rendered using the current configuration
              </p>
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
                    { id: 'binding', label: 'Binding Options' },
                    { id: 'sizes', label: 'Sizes & Dimensions' },
                    { id: 'paper-cover', label: 'Cover Paper' },
                    { id: 'paper-inside', label: 'Inside Paper' },
                    { id: 'paper-subscription', label: 'Subscription Paper' },
                    { id: 'colors', label: 'Color Options' },
                    { id: 'finishes', label: 'Cover Finishes' },
                    { id: 'folds', label: 'Cover Folds' },
                    { id: 'additional', label: 'Additional Services' },
                    { id: 'positions', label: 'Card Positions' },
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Form Description
                        </label>
                        <textarea
                          value={config.general?.description || ''}
                          onChange={(e) => updateNestedConfig('general.description', e.target.value)}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Submit Button Text
                          </label>
                          <input
                            type="text"
                            value={config.general?.submitButtonText || ''}
                            onChange={(e) => updateNestedConfig('general.submitButtonText', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shipping Button Text
                          </label>
                          <input
                            type="text"
                            value={config.general?.shippingButtonText || ''}
                            onChange={(e) => updateNestedConfig('general.shippingButtonText', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'binding' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Binding Options</h3>
                      {renderEditableArray('Binding Types', 'bindingTypes', ['value', 'label'])}
                      {renderEditableArray('Binding Edges', 'bindingEdges', ['value', 'label', 'desc'])}
                    </>
                  )}

                  {activeTab === 'sizes' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Sizes & Dimensions</h3>
                      {renderSimpleArray('Available Sizes', 'sizes', 'Enter size (e.g., 8.5 x 11)')}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Size Instructions
                        </label>
                        <input
                          type="text"
                          value={config.customSizeInstructions || ''}
                          onChange={(e) => updateNestedConfig('customSizeInstructions', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spine Width Display
                        </label>
                        <input
                          type="text"
                          value={config.spineWidth || ''}
                          onChange={(e) => updateNestedConfig('spineWidth', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'paper-cover' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Cover Paper Options</h3>
                      {renderEditableArray('Cover Paper Types', 'paperOptions.cover', ['value', 'label', 'price'])}
                    </>
                  )}

                  {activeTab === 'paper-inside' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Inside Paper Options</h3>
                      {renderEditableArray('Inside Paper Types', 'paperOptions.inside', ['value', 'label', 'price'])}
                    </>
                  )}

                  {activeTab === 'paper-subscription' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Subscription Paper Options</h3>
                      {renderEditableArray('Subscription Paper Types', 'paperOptions.subscription', ['value', 'label', 'price'])}
                    </>
                  )}

                  {activeTab === 'colors' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Print Color Options</h3>
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price'])}
                    </>
                  )}

                  {activeTab === 'finishes' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Cover Finish Options</h3>
                      {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price'])}
                    </>
                  )}

                  {activeTab === 'folds' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Cover Fold Options</h3>
                      {renderEditableArray('Cover Folds', 'coverFolds', ['value', 'label', 'price'])}
                    </>
                  )}

                  {activeTab === 'additional' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Additional Services</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Proof Options</h4>
                          {renderEditableArray('additionalOptions.proof', 'additionalOptions.proof', ['value', 'label', 'price'])}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Hole Punch Options</h4>
                          {renderEditableArray('additionalOptions.holePunch', 'additionalOptions.holePunch', ['value', 'label', 'price'])}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Slipcase Options</h4>
                          {renderEditableArray('additionalOptions.slipcase', 'additionalOptions.slipcase', ['value', 'label', 'price'])}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Shrink Wrap Options</h4>
                          {renderEditableArray('additionalOptions.shrinkWrap', 'additionalOptions.shrinkWrap', ['value', 'label', 'price'])}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Direct Mail Options</h4>
                          {renderEditableArray('additionalOptions.directMail', 'additionalOptions.directMail', ['value', 'label', 'price'])}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'positions' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Subscription Card Positions</h3>
                      {renderEditableArray('Card Positions', 'positions', ['value', 'label'])}
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-3">Page Count Options</h4>
                        {renderSimpleArray('Page Counts', 'pageCounts', 'Enter page count')}
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-3">Weight Options</h4>
                        {renderSimpleArray('Weight Options', 'weightOptions', 'Enter weight (gsm)')}
                      </div>
                    </>
                  )}

                  {activeTab === 'quantities' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Quantity Options</h3>
                      {renderSimpleArray('Available Quantities', 'quantities', 'Enter quantity')}
                    </>
                  )}

                  {activeTab === 'pricing' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Pricing Settings</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Base Setup Cost ($)
                          </label>
                          <input
                            type="number"
                            value={config.pricing?.baseSetupCost || 0}
                            onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cost Per Page ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={config.pricing?.costPerPage || 0}
                            onChange={(e) => updateNestedConfig('pricing.costPerPage', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Multiplier
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.pricing?.customSizeMultiplier || 1}
                            onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', parseFloat(e.target.value) || 1)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Standard Size Multiplier
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.pricing?.standardSizeMultiplier || 1}
                            onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', parseFloat(e.target.value) || 1)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}